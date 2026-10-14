# Chat App Backend

Real-time chat backend built with Express, TypeScript, Prisma, PostgreSQL, JWT authentication, HttpOnly cookies, and Socket.IO.

## Status

Current backend progress:

- REST API is implemented for auth, users, health, channels, channel members, invitations, and messages.
- Socket.IO is wired into the HTTP server for channel, message, and typing events.
- Prisma schema and migrations are present for users, sessions, channels, members, invitations, messages, and channel messaging controls.
- Access-token auth supports HttpOnly cookies and bearer tokens for REST routes.
- Socket auth supports access-token cookies, bearer authorization headers, and `handshake.auth.token`.
- Security middleware applies request IDs, Helmet headers, CORS controls, and global rate limiting.
- Channel ownership, role updates, member removal, ownership transfer, invitation limits, and message permissions are enforced in service-level controls.
- Channels support `EVERYONE` and `MODERATORS_ONLY` messaging modes.
- TypeScript build passes.
- Existing auth integration tests pass.

Known gaps before production:

- Socket and message-flow integration tests are still missing.
- Public channel listing and member listing need stronger pagination coverage.
- Production observability, audit logging, and deployment documentation need more detail.

## Tech Stack

- Node.js
- TypeScript
- Express
- Socket.IO
- Prisma
- PostgreSQL
- JWT
- bcryptjs
- Zod
- Pino
- Nodemailer

## Project Structure

```text
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── common/
│   ├── config/
│   ├── infrastructure/
│   ├── lib/
│   ├── modules/
│   └── socket/
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## API Base URL

All API routes are mounted under:

```text
/api/v1
```

Protected routes accept a valid `accessToken` cookie or `Authorization: Bearer <token>` header. Routes marked `Verified` also require a verified email address.

## Security and System Controls

- `x-request-id` is accepted from clients or generated per request, returned in the response header, and included in logs and error responses.
- Helmet is enabled for baseline HTTP security headers.
- CORS allows configured `ALLOWED_ORIGINS`, supports credentials, accepts `Authorization` and `x-request-id`, and exposes `x-request-id`.
- Global rate limiting allows 100 requests per 15 minutes per IP, with Render health checks and health probe paths bypassed.
- JSON and URL-encoded request bodies are limited to `100kb`.
- Global error handling includes the request ID and clears invalid auth cookies on unauthorized or forbidden auth flows.

## Channel Roles and Controls

Channel members can have one of these roles: `OWNER`, `ADMIN`, `MODERATOR`, `MEMBER`, or `VIEWER`.

- Channel creators are added as `OWNER`.
- Only the `OWNER` can update channel settings or transfer ownership.
- `OWNER` can update or remove non-owner members.
- `ADMIN` can update `MEMBER` and `VIEWER` roles, and can remove `MODERATOR`, `MEMBER`, or `VIEWER` members.
- `OWNER`, `ADMIN`, `MODERATOR`, and `MEMBER` can create invitations.
- `OWNER` and `ADMIN` can revoke invitations.
- `VIEWER` members are read-only.
- In `MODERATORS_ONLY` messaging mode, only `OWNER`, `ADMIN`, and `MODERATOR` can send messages.
- Owners cannot leave a channel until ownership is transferred.

## REST Endpoints

### Auth

Base path: `/api/v1/auth`

| Method | Endpoint                    | Access | Description                                      |
| ------ | --------------------------- | ------ | ------------------------------------------------ |
| POST   | `/register`                 | Public | Register a new user                              |
| POST   | `/login`                    | Public | Log in and set auth cookies                      |
| GET    | `/refresh`                  | Public | Rotate refresh token and access token            |
| GET    | `/verify-email?token=...`   | Public | Verify email and start a session                 |
| POST   | `/resend-verification`      | Public | Resend verification email                        |
| POST   | `/forgot-password`          | Public | Request a password reset email                   |
| POST   | `/reset-password?token=...` | Public | Reset password using a reset token               |
| GET    | `/me`                       | Auth   | Get the current authenticated user               |
| POST   | `/logout`                   | Auth   | Revoke current refresh session and clear cookies |

### User

Base path: `/api/v1/user`

| Method | Endpoint   | Access          | Description                       |
| ------ | ---------- | --------------- | --------------------------------- |
| PATCH  | `/profile` | Auth + Verified | Update the current user's profile |

### Health

Base path: `/api/v1/health`

| Method | Endpoint | Access | Description                   |
| ------ | -------- | ------ | ----------------------------- |
| GET    | `/`      | Public | General health check          |
| GET    | `/live`  | Public | Liveness probe                |
| GET    | `/ready` | Public | Readiness probe with DB check |

### Root

Base path: `/`

| Method | Endpoint | Access | Description                         |
| ------ | -------- | ------ | ----------------------------------- |
| GET    | `/`      | Public | Root uptime response for host checks |

### Channels

Base path: `/api/v1/channels`

| Method | Endpoint                | Access          | Description                                                                 |
| ------ | ----------------------- | --------------- | --------------------------------------------------------------------------- |
| POST   | `/`                     | Auth + Verified | Create a new channel and make the creator the owner                         |
| GET    | `/me`                   | Auth + Verified | List channels joined by the user                                            |
| GET    | `/`                     | Public          | List public channels                                                        |
| GET    | `/:channelId`           | Public          | Get a public channel by ID                                                  |
| PATCH  | `/:channelId/settings`  | Auth + Verified | Update owner-only channel settings: name, description, avatar, visibility, or messaging mode |

### Channel Members

Base path: `/api/v1/channels/:channelId/members`

| Method | Endpoint            | Access          | Description                                        |
| ------ | ------------------- | --------------- | -------------------------------------------------- |
| GET    | `/`                 | Auth + Verified | List channel members                               |
| GET    | `/me`               | Auth + Verified | Get current user's membership                      |
| POST   | `/join`             | Auth + Verified | Join a public channel                              |
| DELETE | `/leave`            | Auth + Verified | Leave a channel; owners must transfer ownership first |
| PATCH  | `/:targetId/role`   | Auth + Verified | Update another member's role                       |
| DELETE | `/:targetId`        | Auth + Verified | Remove another member from the channel             |
| PATCH  | `/ownership`        | Auth + Verified | Transfer channel ownership to an existing member   |

### Channel Messages

Base path: `/api/v1/channels/:channelId/messages`

| Method | Endpoint | Access          | Description                                                              |
| ------ | -------- | --------------- | ------------------------------------------------------------------------ |
| GET    | `/`      | Auth + Verified | Get channel message history with `cursor` and `limit` query parameters   |
| POST   | `/`      | Auth + Verified | Send a message to a channel, with optional idempotency and reply support |

### Messages

Base path: `/api/v1/messages`

| Method | Endpoint      | Access          | Description                                |
| ------ | ------------- | --------------- | ------------------------------------------ |
| PATCH  | `/:messageId` | Auth + Verified | Edit your own message                      |
| DELETE | `/:messageId` | Auth + Verified | Soft-delete a message as owner/admin/moderator |

### Channel Invitations

Base path: `/api/v1/channels/:channelId/invitations`

| Method | Endpoint | Access          | Description                 |
| ------ | -------- | --------------- | --------------------------- |
| POST   | `/`      | Auth + Verified | Create a channel invitation with optional max uses and expiry |

### Invitations

Base path: `/api/v1/invitations`

| Method | Endpoint            | Access          | Description                         |
| ------ | ------------------- | --------------- | ----------------------------------- |
| POST   | `/join`             | Auth + Verified | Join a channel using an invite code |
| PATCH  | `/:inviteId/revoke` | Auth + Verified | Revoke an invitation                |

## Request Notes

- `PATCH /api/v1/channels/:channelId/settings` accepts any non-empty subset of `name`, `description`, `avatar`, `visibility`, and `messagingMode`.
- `PATCH /api/v1/channels/:channelId/members/:targetId/role` accepts `role` as `ADMIN`, `MODERATOR`, `MEMBER`, or `VIEWER`.
- `PATCH /api/v1/channels/:channelId/members/ownership` accepts `newOwnerId` in the request body.
- `POST /api/v1/channels/:channelId/messages` accepts `content`, optional `clientMessageId` for idempotent sends, and optional `parentMessageId` for replies.
- `GET /api/v1/channels/:channelId/messages` supports cursor pagination with `cursor` and `limit`.
- `POST /api/v1/channels/:channelId/invitations` accepts optional `maxUses` and `expiresAt` as an ISO date string.

## Socket.IO

Socket auth accepts one of:

- `accessToken` cookie
- `Authorization: Bearer <token>` handshake header
- `auth: { token: "<access-token>" }` in the Socket.IO client options

Registered client events:

| Event            | Description                                     |
| ---------------- | ----------------------------------------------- |
| `channel:join`   | Join a channel room after membership validation |
| `channel:leave`  | Leave a channel room                            |
| `message:send`   | Send a channel message                          |
| `message:edit`   | Edit an existing message                        |
| `message:delete` | Delete an existing message                      |
| `typing:start`   | Broadcast typing state                          |
| `typing:stop`    | Stop typing broadcast                           |

Common emitted events:

- `channel:joined`
- `channel:left`
- `user:joined_channel`
- `user:left_channel`
- `message:new`
- `message:updated`
- `message:deleted`
- `user:typing`
- `stopped:typing`
- `message:error`
- `channel:error`

## Setup

Install dependencies from the backend directory:

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
NODE_ENV=development
LOG_LEVEL=info

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

JWT_ACCESS_SECRET="replace-with-a-long-random-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_SECRET="replace-with-another-long-random-secret"
JWT_REFRESH_EXPIRES="7d"
COOKIE_EXPIRES_DAYS=7

EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-email-app-password"
EMAIL_FROM="Chat App <your-email@example.com>"

FRONTEND_URL="http://localhost:3000"
ALLOWED_ORIGINS="http://localhost:3000"
```

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Run the development server:

```bash
npm run dev
```

## Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the backend with `tsx watch`          |
| `npm run build`        | Compile TypeScript and rewrite path aliases |
| `npm start`            | Run the compiled server from `dist/`        |
| `npm test`             | Run Vitest tests                            |
| `npm run lint`         | Run ESLint                                  |
| `npm run format:check` | Check Prettier formatting                   |
| `npm run format:fix`   | Format files with Prettier                  |

## Verification

Validated in this workspace:

```bash
npm run build
npm test
```

Both commands pass. The normal sandbox blocks Supertest's local ephemeral port binding, so tests may need to run in an environment that allows local server binding.

## Next Improvements

Recommended next backend work:

1. Add integration tests for channel membership, invitations, messages, and Socket.IO events.
2. Define a shared typed socket event contract for backend and frontend.
3. Add pagination and filtering tests for public channels, members, and message history.
4. Add per-route rate limits for auth-sensitive endpoints.
5. Standardize error response payloads across REST and Socket.IO.
6. Add moderation workflows for channel roles, ownership transfer, and member removal.
7. Add API documentation from source, such as OpenAPI or generated route docs.
8. Add production deployment notes for environment variables, migrations, logging, and health checks.

## License

ISC

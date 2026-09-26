# Chat App Backend

A real-time chat backend built with Express, TypeScript, Prisma, PostgreSQL, JWT authentication, and Socket.IO. This project is focused on the chat application workflow: user auth, channel membership, message lifecycle, and live room-based communication.

## Overview

This backend powers the chat app with:

- REST API for authentication and user flows
- PostgreSQL + Prisma data layer
- Channel and member access rules
- Message send, edit, delete, and reply support
- Socket.IO real-time room communication for channels
- Typing indicators and live room membership events
- Secure JWT + cookie-based auth flow

## Current Status

The backend is in a good state for frontend integration, but it still needs a few hygiene fixes before calling it production-ready.

Validated status from this workspace:

- TypeScript build: passes
- Automated test suite: passes (auth integration tests)
- Socket logic: implemented and wired into the server
- Missing pieces: production hardening, missing socket tests, and documentation cleanup

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

## Core Features

### Authentication

- Register and login
- Email verification flow
- Forgot-password and reset-password flows
- Refresh-token rotation
- Session-based token tracking
- HttpOnly cookie auth
- Role-aware middleware support

### Chat Features

- Channel membership checks
- Join/leave room events
- Send/edit/delete message events
- Reply support via parent message IDs
- Typing start/stop broadcast events
- Room-scoped live updates

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

## API Endpoints

All REST endpoints are mounted under the `/api/v1` prefix. Endpoints marked **Auth** require a valid session (cookie or bearer token depending on middleware); **Verified** additionally requires a verified email.

### Auth — `/api/v1/auth`

| Method | Endpoint               | Access | Description                        |
| ------ | ---------------------- | ------ | ---------------------------------- |
| POST   | `/register`            | Public | Register a new user                |
| POST   | `/login`               | Public | Log in and receive session tokens  |
| GET    | `/refresh`             | Public | Rotate/refresh the access token    |
| GET    | `/verify-email`        | Public | Verify email via token link        |
| POST   | `/resend-verification` | Public | Resend the verification email      |
| POST   | `/forgot-password`     | Public | Request a password reset email     |
| POST   | `/reset-password`      | Public | Reset password using a reset token |
| GET    | `/me`                  | Auth   | Get the current authenticated user |
| POST   | `/logout`              | Auth   | Log out and invalidate the session |

### Users — `/api/v1/users`

| Method | Endpoint   | Access          | Description                       |
| ------ | ---------- | --------------- | --------------------------------- |
| PATCH  | `/profile` | Auth + Verified | Update the current user's profile |

### Health — `/api/v1/health`

| Method | Endpoint | Access | Description                     |
| ------ | -------- | ------ | ------------------------------- |
| GET    | `/`      | Public | General health check            |
| GET    | `/live`  | Public | Liveness probe                  |
| GET    | `/ready` | Public | Readiness probe (DB/deps check) |

### Channels — `/api/v1/channels`

| Method | Endpoint      | Access          | Description                       |
| ------ | ------------- | --------------- | --------------------------------- |
| POST   | `/`           | Auth + Verified | Create a new channel              |
| GET    | `/me`         | Auth + Verified | List channels the user has joined |
| GET    | `/`           | Public          | List public channels              |
| GET    | `/:channelId` | Public          | Get a single channel by ID        |

### Channel Members — `/api/v1/channels/:channelId/members`

| Method | Endpoint | Access          | Description                            |
| ------ | -------- | --------------- | -------------------------------------- |
| GET    | `/`      | Auth + Verified | List members of a channel              |
| GET    | `/me`    | Auth + Verified | Get the current user's membership info |
| POST   | `/join`  | Auth + Verified | Join a public channel                  |
| DELETE | `/leave` | Auth + Verified | Leave a channel                        |

### Channel Messages — `/api/v1/channels/:channelId/messages`

| Method | Endpoint | Access          | Description                        |
| ------ | -------- | --------------- | ---------------------------------- |
| GET    | `/`      | Auth + Verified | Get message history for a channel  |
| POST   | `/`      | Auth + Verified | Send a message to a channel (HTTP) |

### Messages — `/api/v1/messages`

| Method | Endpoint      | Access          | Description      |
| ------ | ------------- | --------------- | ---------------- |
| PATCH  | `/:messageId` | Auth + Verified | Edit a message   |
| DELETE | `/:messageId` | Auth + Verified | Delete a message |

### Channel Invitations — `/api/v1/channels/:channelId/invitations`

| Method | Endpoint | Access          | Description                        |
| ------ | -------- | --------------- | ---------------------------------- |
| POST   | `/`      | Auth + Verified | Create an invitation for a channel |

### Invitations — `/api/v1/invitations`

| Method | Endpoint            | Access          | Description                         |
| ------ | ------------------- | --------------- | ----------------------------------- |
| POST   | `/join`             | Auth + Verified | Join a channel using an invite code |
| PATCH  | `/:inviteId/revoke` | Auth + Verified | Revoke an existing invitation       |

## Socket Events

The server currently registers these socket events:

### Channel events

- `channel:join`
- `channel:leave`

### Message events

- `message:send`
- `message:edit`
- `message:delete`

### Typing events

- `typing:start`
- `typing:stop`

### Broadcast responses

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

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the backend root:

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

EMAIL_USER="your-gmail-address@gmail.com"
EMAIL_PASS="your-gmail-app-password"
EMAIL_FROM="Your App <your-gmail-address@gmail.com>"

FRONTEND_URL="http://localhost:3000"
```

### Prisma setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run dev server

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm test
npm run lint
```

## Important Review Findings

These are the main items I would fix before moving fully into frontend integration.

### 1. Socket auth should support more than cookie-only auth

The socket middleware reads only the `accessToken` cookie. That works if the frontend sends cookies, but it does not match the REST API pattern, which also supports `Authorization: Bearer ...`.

Recommendation:

- support both cookie auth and bearer-token auth for Socket.IO
- keep cookie support for browser-based apps
- add a fallback for token header auth if the frontend sends it in a custom socket auth flow

### 2. Add real socket and message flow tests

The current automated tests cover auth basics, but there are no tests for:

- `channel:join`
- `message:send`
- `message:edit`
- `message:delete`
- typing events
- permission enforcement for unauthorized channel access

Recommendation:

- write integration tests around socket event handlers
- test membership denial and invalid payload cases
- test idempotency protection for duplicate message sends

### 3. Keep validation realistic for frontend-generated IDs

The message socket schema previously required `clientMessageId` to be a UUID. In real frontend apps, this value is often a generated ID like a normal string or random key.

This has been updated to accept a realistic non-empty client ID string instead of forcing UUID format.

### 4. Add safer socket error handling and event contract docs

The socket handlers emit generic errors back to the client, but they do not yet standardize a full event contract or a shared TypeScript socket event map.

Recommendation:

- define a typed socket-event contract for the frontend
- document accepted payloads and emitted payloads
- standardize `error` payload shape across all socket handlers

### 5. Harden production behavior

Before production deployment, I would still do:

- rate limiting on sensitive auth endpoints
- robust CORS config for production domains
- log sanitization for user-generated content
- DB query optimization checks on message history endpoints
- more comprehensive error reporting for socket disconnections and reconnects

## Known Good State

This backend is already okay to start frontend work with these conditions:

- APIs compile cleanly
- auth tests pass
- database connection and Prisma setup are in place
- chat socket logic is integrated into the server
- channel/message events are implemented and ready for frontend consumption

## Next Step

Start building the frontend and integrate with the backend using:

1. auth endpoints
2. channel membership APIs
3. message APIs
4. Socket.IO connection with cookie or bearer auth
5. channel join and message event listeners

## License

ISC

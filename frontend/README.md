# Enterprise Next.js Feature-Driven Boilerplate

A highly scalable, production-ready frontend boilerplate built with Next.js (App Router), TypeScript, and Tailwind CSS. This architecture implements a strict **feature-driven (domain-driven) modular structure**, completely decoupling your visual layers from backend networking engines.

## 🚀 Tech Stack Matrix

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Compilation Mode)
- **Styling:** Tailwind CSS (with automated atomic class utility merging)
- **State Management:** Zustand (Isolated Client-Side UI States)
- **Data Fetching & Caching:** TanStack Query v5 (Server-State Single Source of Truth)
- **Form Architecture:** React Hook Form + Zod (Compile-time & Runtime Validation)
- **Networking Layer:** Axios (Unified Error Interception & HTTP-Only Cookie Lifecycle)
- **Notification Engine:** Sonner Toaster (Network Lifecycle Promise Tracking)

---

## 📂 Core Directory Architecture

```text
src/
├── app/                      # ROUTING LAYER ONLY (Thin Entry Shells)
│   ├── (auth)/               # Unprotected authentication route group
│   └── (dashboard)/          # Guarded dashboard route group wrapped in AuthGuard
│
├── config/                   # STATIC SETTINGS & ENVIRONMENT VALIDATIONS
│   ├── app.ts                # Application metadata configurations
│   ├── env.ts                # Zod runtime environmental gatekeeper (.env.local)
│   └── routes.ts             # Centralized route lookup dictionary
│
├── components/               # GLOBAL SHARED VISUAL REUSABLE ELEMENTS
│   ├── common/               # Form fields, form error tags, headers
│   ├── feedback/             # Standardized Loading, Error, and Empty layouts
│   └── layout/               # Canvas containers, structural rows
│
├── features/                 # THE SCALE ENGINE (Domain-Driven Modules)
│   ├── auth/                 # Authentication domain layer
│   └── users/                # Full CRUD User and Profile module blueprint
│       ├── types/            # Isolated Type interfaces
│       ├── api/              # Fetch contracts, query keys, custom hooks
│       ├── schemas/          # Zod validation sheets
│       ├── hooks/            # Component-facing filter/actions logic
│       ├── components/       # Interface sub-views
│       └── index.ts          # Encapsulated Public API entry point
│
├── lib/                      # THIRD-PARTY INTEGRATION HUB
│   ├── api/                  # Axios instances and custom response normalizers
│   ├── query/                # Core QueryClient configurations
│   └── store/                # Shared Zustand interface blueprints
│
├── providers/                # MASTER CONTEXT COMPOSITION WRAPPERS
│   ├── app-provider.tsx      # Consolidated global provider stack hub
│   ├── query-provider.tsx    # Lazy instantiated server cache boundary
│   └── theme-provider.tsx    # Anti-flicker light/dark color state matrix
│
└── utils/                    # PURE DETERMINISTIC ASSERTS & HELPERS
    └── cn.ts                 # Atomic Tailwind class resolver
```

---

## 🔑 Core Architecture Paradigms & Boundary Rules

### 1. The Encapsulation Boundary (`index.ts` / Barrel Files)

Every domain module folder inside `src/features/*` must utilize an `index.ts` file acting as its public gatekeeper. Code from outside a feature folder is **strictly forbidden** from deep-importing sub-paths.

- ❌ **Prohibited:** `import { LoginForm } from '@/features/auth/components/login-form'`
- **Architectural Standard:** `import { LoginForm } from '@/features/auth'`

### 2. Pure Session Isolation (HTTP-Only Cookie Strategy)

This boilerplate operates with an enterprise-grade backend cookie configuration (`withCredentials: true`).

- Sensitive data fields like `accessToken`, `refreshToken`, or `user` session trees **never touch JavaScript memory or `localStorage`**.
- **TanStack Query** serves as the single source of truth for your logged-in state. If the query client cache is empty, the client browser is unauthenticated. **Zustand is strictly restricted to transient UI flags** (e.g., tracking a sidebar toggle or modal window).

### 3. Decoupled Network Data Flows

Components never interact with networking logic directly. The boilerplate implements a strict dependency pipeline:

```text
Component ➔ React Hook Form ➔ Zod Schema ➔ Feature Custom Hook ➔ TanStack Query ➔ Axios Instance ➔ Express Backend
```

### 4. Normalized Error Architectures

Axios catch responses are caught and translated immediately inside a network interceptor layout into a native `AppApiError` class. This shields components and forms from having to understand or map internal Axios errors manually.

---

## 🛠️ Onboarding & Local Execution

### 1. Initialize Configuration Variables

Create a `.env.local` file at the root matching the pattern found in `.env.example`:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_ENV=development
```

### 2. Spin Up Development Pipeline

Execute these shell commands to build dependencies and launch your hot-reloading development canvas:

```bash
npm install
npm run dev
```

### 3. Verify Codebase Integrity

To perform validation audits across all directory aliases and ensure zero TypeScript compilation breaks, run:

```bash
npx tsc --noEmit
```

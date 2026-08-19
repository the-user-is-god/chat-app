# Architectural Specification Manual

## 🧭 Core Architectural Principles

### 1. Feature Encapsulation

Everything pertaining to a specific business domain (e.g., `auth`, `users`) must live contained within its own workspace inside `src/features/[feature-name]/`.

### 2. Public API Enforcement Gatekeeper (`index.ts`)

A feature module's internal subdirectories (`api`, `components`, `hooks`) are completely hidden from the rest of the application. External modules can **only** consume exports exposed via the feature's root `index.ts` file.

### 3. Server State vs. Client State Isolation

- **Server State (TanStack Query):** Handles all server data, profiles, and API entity tables. Because the backend tracks security via HTTP-only cookies, JavaScript never stores auth tokens.
- **Client State (Zustand):** Restricted _exclusively_ to transient UI flags (modals, active sidebar states, temporary redirect paths). It must never cache server models.

### 4. Normalized Error Architecture

Axios interceptors catch network drops and immediately normalize raw errors into an `AppApiError` class instance. Components and forms catch this clean, structured response, avoiding direct exposure to raw Axios error layouts.

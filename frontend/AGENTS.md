# AI Agent Workspace & Architecture Context

> **System Instruction for AI Assistants:** Read this file completely before editing, refactoring, or generating code within this Next.js workspace.

## 🤖 AI Execution Rules

### 1. Code Location Rules

- Never add heavy business logic, forms, or API queries inside `src/app/`. Keep files in `src/app/` thin, serving strictly as page entry shells.
- Never write relative paths going past 2 directories deep (e.g., `../../../../`). Always use the root alias convention `@/`.

### 2. State & Token Rules

- Do not generate local state tokens or attempt to wire up `localStorage` to manage users.
- Rely on the existing `useCurrentUser()` hooks. Assume that HTTP-only cookies manage session boundaries completely.

### 3. Component Restrictions

- Do not invent custom error panels or inline loaders. Reuse `<LoadingState />`, `<ErrorState />`, and `<EmptyState />` from `@/components`.
- Rely on `<FormField />` primitives to handle form spacing, error text rendering, and accessibility tags uniformly.

### 4. Eslint Rule Formats

- This workspace relies on modern ESLint Flat Config formats (`eslint.config.mjs`). Do not create or append a legacy `.eslintrc.json` file.

# Contributor Development Guidelines

## 🗺️ How to Add a New Feature Module

Follow these 8 strict sequential implementation steps to add a new domain feature (e.g., `products`, `billing`) into this boilerplate configuration:

### Step 1: Initialize the Feature Directory

Create a new feature folder inside the features module root:

```text
src/features/your-feature/
├── api/
├── components/
├── hooks/
├── schemas/
├── types/
└── index.ts
```

### Step 2: Establish Plain TypeScript Types

Define the contract types representing your feature's database models and payloads inside `types/index.ts`.

### Step 3: Implement Pure API Interaction

Write out raw asynchronous fetch methods inside `api/your-feature.api.ts` using the global `api` client wrapper instance.

### Step 4: Map Declarative Query Keys

Create unique cache array name definitions inside `api/your-feature.keys.ts` to prevent data cache collisions.

### Step 5: Compose Queries and Mutations

Build reusable TanStack query hooks inside `api/your-feature.queries.ts` to manage network mutations, loading parameters, and cache invalidation rules.

### Step 6: Define Form Validation Schemas

Write out Zod input validation schemas inside `schemas/your-feature.schema.ts`. Use `z.infer` to export the input types.

### Step 7: Create Component Views

Build your UI layout blocks inside `components/`. Consume data exclusively through custom hooks, and route inputs via `FormField` primitives.

### Step 8: Open the Public API Entry Point

Export the primary container views and necessary external reference modules inside `index.ts`. Connect this entry endpoint into your routing tree inside `src/app/`.

# Architecture Overview

Aletheia is a React single-page application. The source code is organized by bounded context and capability so the
business area is visible from the file tree.

This document is a living reference for contributors and agents. Update it when the architecture changes.

## Project Structure

Use this convention for application code:

```txt
src/<bounded-context>/<capability>/
```

Example structure:

```txt
src/
  auth/
    auth-state/       React auth state, provider, context, and useAuth
    login/            Login form behavior, login use case, and login request adapter
    protected-route/  Route protection behavior
    session/          Persisted session model and storage adapter
    index.ts          Public auth API
  components/         Shared design-system components
  config/             Cross-cutting configuration
  pages/              Route and page composition
```

## Architecture Rules

- Top-level source folders should be bounded contexts or intentional shared areas.
- Inside a bounded context, folders should be capabilities or responsibilities.
- Avoid technical root folders inside bounded contexts, such as `api`, `hooks`, `contexts`, `services`, and `types`.
- React hooks live beside the capability they serve.
- Backend adapters live beside the use case they implement.
- Framework-free behavior stays separate from React behavior.
- Each bounded context exposes its public API through `index.ts`.
- `index.ts` files should use explicit exports, not `export *`.
- Code outside a bounded context should import from that context public API, not from internal files.

## Functional Programming Direction

- Model expected outcomes as typed result unions.
- Inject side-effecting dependencies into framework-free use cases.
- Do not throw for expected backend outcomes such as validation or authentication failures.
- Keep browser and platform effects at adapter or composition boundaries.
- Use factories, such as `createLogin`, when dependencies must be supplied.

## React Direction

- React components and hooks own UI state and interaction behavior.
- Page components compose UI and feature hooks.
- Controlled inputs stay controlled by the closest sensible state owner.
- Context providers expose app state transitions, not backend workflows.
- Route guards own route access behavior.

## Incremental Adoption

- New code should follow this convention.
- Existing code should move only when touched by a focused slice.
- Do not migrate the whole repo only to satisfy this document.
- Prefer small, reviewable structural changes.

## Shared Architectural Areas

- `src/components/` contains shared design-system components.
- `src/config/` contains narrow cross-cutting configuration.
- `src/pages/` contains route and page composition until a page naturally moves into a bounded context.
- `docs/` contains project documentation and temporary direction notes.

# ADR 0001 — Next.js (App Router) + Material UI for the frontend

- Status: Accepted
- Date: 2026-11-06

## Context

Park & Revisit needs a web app that users can sign in to and use on phone or
laptop. As the builder I am a UX designer early in learning to code, so I need a
stack that is well documented, has a large community, and lets one person build
both the pages (frontend) and the small amount of server logic (saving data,
checking who is logged in) without wiring two separate projects together.

## Decision

Use **Next.js** with the App Router as the framework, written in TypeScript, and
**Material UI (MUI)** as the component library for the interface.

- Next.js gives pages, routing, and server-side code (Server Components and
  Server Actions) in one project, so the login check and database calls live
  next to the pages that use them.
- MUI gives ready-made, accessible components (buttons, forms, dialogs) with a
  single theme, so the app looks consistent and I don't rebuild basics by hand.

## Consequences

Good:
- One project, one language (TypeScript), one deploy.
- MUI components come with sensible accessibility and keyboard behaviour, which
  matters for this audience.
- Huge community and docs make problems easy to look up.

Trade-offs:
- Next.js App Router has a learning curve (Server vs Client Components, where
  code runs). We hit a few of these (passing the theme across the server/client
  boundary) and solved them with a client "providers" wrapper.
- MUI adds some bundle size versus hand-written CSS; acceptable for this app.

## Alternatives considered

- **Plain React (Vite) + a separate backend** — rejected: two projects to run
  and deploy; more moving parts for a solo beginner.
- **Tailwind CSS instead of MUI** — rejected for now: more design-from-scratch
  work and no ready accessible components; MUI got us to a usable UI faster.

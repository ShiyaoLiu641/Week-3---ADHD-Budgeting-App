# ADR 0002 — Supabase for the database and authentication

- Status: Accepted
- Date: 2026-11-06

## Context

The app must let people create an account, log in, and save their parked items
so the data is still there next time. Each person must see **only their own**
data. As a solo beginner I did not want to run my own server, write password
hashing myself, or manage a database by hand.

## Decision

Use **Supabase** for both the database (PostgreSQL) and authentication.

- Auth: Supabase handles sign up, log in, password hashing, and sessions. The
  app never stores or hashes passwords itself.
- Database: one `items` table in Postgres holds every parked item.
- **Row Level Security (RLS)** is turned on, with policies that only allow a row
  when `auth.uid() = user_id`. This enforces "each user sees only their own
  data" at the database level, not just in the UI.

## Consequences

Good:
- Password security and sessions are handled by a maintained service, not by me.
- RLS means even if a bug in the UI asked for all rows, the database would still
  return only the logged-in user's rows. Security is enforced server-side.
- Generous free tier, fits a student project.

Trade-offs:
- The app depends on an external service (vendor lock-in to Supabase's APIs).
- RLS policies must be written carefully; a wrong policy could expose or hide
  data. We tested that a logged-out user cannot reach `/items`.

## Alternatives considered

- **Build my own auth + database (e.g. raw Postgres + custom login)** —
  rejected: writing secure authentication by hand is risky for a beginner and
  out of scope.
- **Firebase** — a valid alternative, but it uses a NoSQL document model;
  Supabase's SQL + RLS mapped more clearly to "a table of items, locked per
  user", which was easier to reason about and explain.

# ADR 0003 — Vercel for hosting

- Status: Accepted
- Date: 2026-11-06

## Context

The app needs to be live on a public URL so it can be used and submitted, not
just run on my laptop. I wanted deploys to be automatic and free, without
setting up servers.

## Decision

Host the app on **Vercel**, connected to the GitHub repository.

- Every push to the `main` branch triggers an automatic build and deploy.
- The two Supabase values (`NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are set as Environment Variables in Vercel,
  so the live site reads them instead of the local `.env.local` file (which is
  never committed to Git).

## Consequences

Good:
- Vercel is made by the same team as Next.js, so Next.js apps deploy with almost
  no configuration.
- Push to GitHub → live in under a minute. No servers to manage.
- Free Hobby plan is enough for a student project.

Trade-offs:
- The default free URL is a `*.vercel.app` subdomain, and the obvious name was
  already taken, so the live URL has a suffix (`...-three.vercel.app`).
- Secrets must be kept out of Git and set in Vercel instead; forgetting this
  would break the live site. We set both variables before the first deploy.

## Alternatives considered

- **Netlify** — comparable; Vercel chosen for its tight Next.js integration.
- **A traditional VPS (e.g. a DigitalOcean server)** — rejected: manual setup,
  maintenance, and security patching, which is overkill for this app.

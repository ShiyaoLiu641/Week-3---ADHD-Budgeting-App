# Park & Revisit — Project Handoff

A context file to paste into a new Claude Code thread so it understands this
project without starting from zero. Last updated: 2026-11-09.

> How to use: open a new thread in this same folder, and either let Claude read
> this file, or paste it in and say "this is my project, here's the context."

---

## 1. What this is

**Park & Revisit** — an ADHD-friendly budgeting app. MVP #1 focuses on the first
stage: helping a person *pause and reflect* before buying, instead of tracking
numbers. The user signs up / logs in, "parks" a tempting item, then revisits it
later to decide: **Buy**, **Let go**, or **Still deciding**.

This was the Week 4 Tech Fleet residency homework (built on the Week 2/3 repo).

## 2. Current status — Week 4 is DONE and submitted

- Full MVP #1 built and **fully working** (not just visuals).
- **Live on the internet** (Vercel).
- Submitted via Pull Request #1, merged into `main`.
- Only manual step left when this was written: emailing the teacher
  (mdenner@techfleet.org) the submission links. Due 2026-11-16.

Features that work: sign up, log in, log out, protected routes, park an item
(name + optional link / note / revisit date), set a decision, remove one item,
delete all my data (with confirmation). Each user sees only their own data.

## 3. Links

| What | Where |
|---|---|
| Live app | https://week-3-adhd-budgeting-app-three.vercel.app/ |
| GitHub repo | https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App |
| Database diagram (ERD) | `docs/erd.md` (renders on GitHub) |
| ADRs | `docs/adr/` |
| Submission | `Week 4 Coding Challenge/SUBMISSION.md` |
| Local folder | /Users/shiyaoliu/Desktop/Week-3---ADHD-Budgeting-App |

> Note: the Vercel URL has a `-three` suffix because the plain name was already
> taken by someone else's project (Vercel subdomains are globally unique).

## 4. Tech stack & architecture (three tiers)

- **Tier 1 — Screens (frontend):** Next.js (App Router, TypeScript) + Material UI.
- **Tier 2 — Server code (backend):** Next.js Server Components + Server Actions.
- **Tier 3 — Database + auth:** Supabase (PostgreSQL + Supabase Auth).
- **Hosting:** Vercel (free Hobby plan). Push to `main` → Vercel auto-deploys.

## 5. Repo structure (key files)

```
src/
  app/
    layout.tsx            # root layout, wraps app in Providers
    providers.tsx         # "use client" — MUI theme + cache provider
    page.tsx              # landing page
    login/
      page.tsx            # login / signup form (toggles via ?mode=signup)
      actions.ts          # login() + signup() server actions
    items/
      page.tsx            # main app: list + add form + danger zone
      actions.ts          # createItem / setDecision / deleteItem / deleteAllItems
      AddItemForm.tsx     # "use client" — park an item form
      ItemCard.tsx        # one parked item + decision buttons
      DangerZone.tsx      # "use client" — delete-all-data confirm dialog
    auth/signout/route.ts # POST to log out
  lib/supabase/
    client.ts             # browser client
    server.ts             # server client (uses cookies)
    middleware.ts         # updateSession: refresh + protect routes
  proxy.ts                # Next.js 16 middleware (renamed "proxy")
  theme.ts                # MUI theme (calm palette, big tap targets)
supabase/migrations/
  0001_init.sql           # items table + trigger + RLS policies
docs/adr/                 # architecture decision records
docs/erd.md               # database diagram
```

## 6. Database (schema + security)

One table, `items`, in Supabase Postgres. Full definition in
`supabase/migrations/0001_init.sql`.

Columns: `id` (uuid PK), `user_id` (uuid FK → auth.users, on delete cascade),
`name` (required), `link`, `note`, `revisit_at`, `reflection`, `decision`
(buy | let_go | still_deciding), `created_at`, `updated_at` (auto-updated).

**Row Level Security (RLS) is ON.** Four policies (select/insert/update/delete)
all require `auth.uid() = user_id`, so each person can only touch their own rows.
This is enforced by the database, not just the UI.

## 7. Auth flow

Email + password via Supabase Auth. Passwords are hashed by Supabase (the app
never sees or stores raw passwords). Logged-out users hitting `/items` are
redirected to `/login` by the proxy middleware.

**Email confirmation is OFF** (see ADR 0004) so new accounts can log in instantly
— good for demos/testing, should be turned back ON for a real product.

## 8. Environment variables / secrets

Two values, both **public** (safe because RLS protects the data):

```
NEXT_PUBLIC_SUPABASE_URL=https://ugnjrsiohdpnscvhrxxv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=... (the publishable key)
```

- Locally: in `.env.local` (git-ignored, never committed).
- In production: set as Environment Variables in the Vercel project.
- Supabase project ref: `ugnjrsiohdpnscvhrxxv`.
- `.env.example` holds placeholders only.

## 9. Run locally

```bash
cd /Users/shiyaoliu/Desktop/Week-3---ADHD-Budgeting-App
npm install
npm run dev
```

Then open http://localhost:3000. (`.env.local` must exist with the two values.)

## 10. Deploy

Automatic: commit → push to `main` → Vercel builds and publishes to the live URL.
No manual deploy step.

## 11. Architecture decisions (ADR summary)

- **0001** Next.js + Material UI — one project for screens + server code; MUI gives
  ready, accessible components.
- **0002** Supabase — managed auth (no hand-rolled password security) + Postgres
  with RLS for per-user data.
- **0003** Vercel — push-to-deploy, free, tight Next.js integration.
- **0004** Email confirmation off — faster demo/testing; note to re-enable for
  production.

## 12. Known constraints / gotchas

- **Supabase free projects pause after ~7 days of inactivity.** If the live app
  breaks, open the Supabase dashboard and click **Resume project**.
- Next.js 16 renamed `middleware` → `proxy` (file is `src/proxy.ts`).
- MUI theme has functions, so it must live in a `"use client"` providers wrapper;
  don't pass it across the server→client boundary directly.
- Use plain `href` on MUI Button/Link, not `component={Link}` (caused errors).
- `AGENTS.md` note is auto-written by `next dev`; commit it with your work to keep
  the tree clean.

## 13. What's next (ideas / advanced homework)

- **Advanced homework:** usability test with 1–2 people (think-aloud), write a
  research report, turn findings into requirements, build a v2.
- Reflection field after the wait (US-2.2) — column already exists in the DB.
- Onboarding / first-run explanation (US-4.1).
- Turn email confirmation back on + set Supabase Site URL / redirect URLs to the
  live domain.
- Visual polish (the owner mentioned wanting a "小红书 / Xiaohongshu" style look).

## 14. Git / GitHub setup notes

- Git pushes use the **GitHub CLI** credential helper. It was set up with
  `gh auth login` (token has `repo` scope) + `gh auth setup-git`. If pushing ever
  gets a 403, re-run `gh auth login` and finish the browser identity verification.
- Submission flow used: new branch → PR → merge into `main` (the teacher's
  required method).

## 15. How the owner likes to work (for the new thread)

Shiyao is a UX designer who started coding in Oct 2026. She learns best when you:
teach one step at a time, say what she should see after each step, explain every
command in plain English, keep answers short, and use UX / Figma analogies.
Chinese is welcome; tag key technical terms in English. Don't let her skip
understanding a step. Her written reflections ("What I Did / What I Learned") must
be written by her, not AI.

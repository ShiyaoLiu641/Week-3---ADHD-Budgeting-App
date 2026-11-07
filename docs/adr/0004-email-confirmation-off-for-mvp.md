# ADR 0004 — Email confirmation off for the MVP

- Status: Accepted
- Date: 2026-11-06

## Context

Supabase can require users to click a link in a confirmation email before they
can log in. For this MVP, the goal is to demonstrate the full flow (sign up →
log in → save data) quickly, including during review and usability testing,
without waiting for emails or setting up a custom email sender.

## Decision

Turn **off** "Confirm email" in Supabase for now, so a new account can log in
immediately after signing up. Keep the Email provider itself enabled, so sign up
and log in with email + password still work.

## Consequences

Good:
- New users (and testers) can get into the app in one step, no email round-trip.
- Nothing extra to configure for the demo.

Trade-offs:
- There is no proof that a sign-up email address is real or belongs to the user.
  This is acceptable for a student MVP with no sensitive data beyond the user's
  own notes, but **not** acceptable for a real production product.

## Follow-up (for a future version)

- Turn email confirmation back on and configure a proper email sender.
- Add the live Vercel URL to Supabase's Site URL / Redirect URLs so confirmation
  and password-reset links point to the deployed app.

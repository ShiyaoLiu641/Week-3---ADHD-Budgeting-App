# Week 5 Coding Challenge — Submission

## Links

1. GitHub repository: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App
2. Live Vercel app: https://week-3-adhd-budgeting-app-three.vercel.app/
3. Database diagram: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App/blob/main/docs/erd.md

## Documents

1. Notion document links: <!-- paste your Week 2 specs / BDD if you have them -->
2. Other document links:
   - CI/CD workflow: `.github/workflows/ci.yml`
   - Manual test cases: `Week 5 Coding Challenge/test-cases.md`
   - Pull request: https://github.com/ShiyaoLiu641/Week-3---ADHD-Budgeting-App/pull/2

## What the pipeline does (for reference — not the reflection)

A GitHub Actions workflow runs on every push and pull request, with 5 checks:

| Check | What it verifies |
|---|---|
| `lint` | Code style / common mistakes (ESLint) |
| `typecheck` | TypeScript types are correct (`tsc --noEmit`) |
| `test` | Business rules from the Week 2 BDD scenarios (Vitest) |
| `skills` | The Week 1 Claude Skills in `.claude/skills/` are present and valid |
| `build` | The app still builds for production (`next build`) |

Proof a failing check fails: a commit that broke the `isValidItemName` rule
turned the `test` check red; reverting it turned all 5 checks green again.

## What I Did

<!--
WRITE THIS YOURSELF — no AI (Morgan checks!). At least 2 paragraphs, full
technical detail. Ideas to cover in your own words:
- You added a CI/CD pipeline on GitHub Actions that runs on every push.
- You turned your Week 2 BDD rules into automatic tests (name required,
  decision must be buy/let_go/still_deciding, link must be a valid URL).
- You gate-checked your Week 1 Claude Skills.
- You intentionally broke a rule and watched the pipeline catch it, then fixed it.
- You ran 2 manual test scenarios on the live app.
-->

## What I Learned

<!--
WRITE THIS YOURSELF — no AI. At least 2 paragraphs. Ideas:
- What CI/CD is and why it protects you as you keep changing the app.
- What BDD (Given/When/Then) means to you now.
- What you'd do differently next time, and how this helps in team work.
-->

## Before You Submit — Checklist

- [x] CI/CD pipeline runs automatically on every push (GitHub Actions)
- [x] At least 3 new CI checks (we have 5: lint, typecheck, test, skills, build)
- [x] Week 1 Claude Skills are gate-checked on every push
- [x] Broke something on purpose, pushed it, confirmed the pipeline caught it
- [x] Ran both manual test scenarios on the live app and wrote down the results (both Pass — see `test-cases.md`)
- [x] Live app still works after the changes
- [ ] Filled in "What I Did" and "What I Learned" (by me, not AI)
- [ ] Merged the pull request into main
- [ ] Emailed mdenner@techfleet.org with the repo link

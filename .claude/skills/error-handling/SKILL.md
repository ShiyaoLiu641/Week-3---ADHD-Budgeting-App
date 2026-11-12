---
name: error-handling
description: Apply good error handling when writing or changing code that can fail, and when designing the messages users see when something goes wrong. Use when the task involves try/catch, failed network or database calls, invalid input, timeouts, missing data, API error responses, or error and empty states in the UI. Based on Nielsen heuristic #9 (help users recognize, diagnose, and recover from errors). Does NOT trigger for pure styling or static copy with no failure path.

---

# Error handling

Based on Nielsen's heuristic #9: help users recognize, diagnose, and recover from errors.

## Outcome

When something fails, the app stays stable, the user sees a clear message in plain language that says what happened and how to fix it, and the technical details are logged privately for developers.

## Core rules

1. Expect failure. Anything that talks to a network, file, database, or user input can fail. Handle it, don't assume success.
2. Catch errors where you can act on them. Don't swallow errors silently (no empty catch blocks) and don't let the whole app crash.
3. Fail safely: leave data in a valid state, don't lose the user's work, and never continue as if nothing happened.
4. User messages are plain language: say what happened, why if useful, and the next step. No codes, stack traces, or jargon. (Nielsen #9)
5. Be specific and kind: "Enter a valid email like name@site.com", not "Invalid input". Never blame the user.
6. Always offer a way to recover: retry, go back, fix the field, or contact support. Never a dead end.
7. Log the real details privately (message, stack, context) so developers can diagnose, but never show them to the user or expose secrets.
8. Match the UI state to your UX skill: a failed load shows the error state; no data shows the empty state; in-progress shows loading.
9. Validate input early and show errors inline, next to the field, as soon as possible.
10. Handle timeouts and slow responses: show progress, and give up gracefully with a clear message instead of hanging forever.

## Checklist before finishing

- [ ] Every risky call (network, file, database, input) is wrapped and handled
- [ ] No silent failures or empty catch blocks
- [ ] On failure, data stays valid and the user's work is not lost
- [ ] Error messages are plain language: what happened + how to fix it
- [ ] The user always has a way to recover (retry, back, fix, support)
- [ ] Technical details are logged privately, never shown to the user
- [ ] Error, empty, and loading states are all handled in the UI
- [ ] Input is validated with inline, specific messages

## Example

Bad: A failed save shows "Error 500" (or nothing), and the user loses everything they typed.
Good: It shows "Couldn't save your changes. Check your connection and try again." with a "Retry" button, the typed text is kept, and the full error is logged for developers.

## Edge cases

- Unknown or unexpected error: show a safe generic message ("Something went wrong, please try again") and log the full details.
- The error can't be fixed by the user (e.g. server down): say so honestly and offer support or a retry-later option.
- Partial failure (some steps worked): tell the user exactly what succeeded and what didn't.
- Pure styling or static copy with no failure path: this skill does not apply; skip it.
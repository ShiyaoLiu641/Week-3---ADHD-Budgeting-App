---
name: testing
description: Apply software testing practices when writing or changing code, adding features, fixing bugs, or reviewing a pull request. Use when the task involves writing tests, deciding what to test, checking edge cases, or verifying that automated checks (CI) pass. Covers unit tests, edge cases, test states, and not merging with failing checks. Does NOT trigger for pure visual styling or copy changes with no logic.

---

# Testing

Write tests that catch real problems and never ship code with failing checks.

## Outcome

Code backed by tests that cover the normal case, the edge cases, and the failure cases, where all automated checks pass before anything is merged.

## Core rules

1. Test behavior, not wording. Check what the code should DO, so tests don't break when you rename things internally.
2. Cover every state: success, loading/in-progress, empty (no data), and error. These mirror the UI states a user can hit.
3. Test the edges: empty input, very long input, zero, negative numbers, special characters, and the first and last item.
4. Test failure on purpose: what happens when the network fails, a file is missing, or input is invalid? The code should fail safely.
5. Each test checks one thing and has a clear name that says what it verifies (e.g. "returns error when email is empty").
6. Tests must be repeatable: same result every run, no dependence on time, random values, or test order. Don't rely on real external services.
7. When fixing a bug, first write a test that fails because of the bug, then fix it so the test passes. This stops the bug coming back.
8. Never merge a pull request with failing or pending checks. Wait for CI to finish and be green.
9. Keep tests fast and readable; a test is also documentation of how the code should behave.

## Checklist before finishing

- [ ] Success, loading, empty, and error cases are all tested
- [ ] Edge cases covered (empty, very long, zero, negative, special characters)
- [ ] Failure paths are tested and fail safely
- [ ] Each test checks one thing and is clearly named
- [ ] Tests are repeatable (no reliance on time, randomness, or order)
- [ ] Any bug fix includes a test that would have caught it
- [ ] All CI checks pass (green) before merging

## Example

Bad: A "divide" function is tested only with 10 / 2, and the PR is merged while a check is still running.
Good: It is also tested with divide by zero, negative numbers, and decimals, and the PR is merged only after all checks pass.

## Edge cases

- No test framework set up yet: ask which one the project uses (or should use) before writing tests.
- Code is hard to test (does too much): suggest splitting it into smaller pieces that can each be tested.
- A check is pending or flaky: do not merge; re-run or investigate until it is reliably green.
- Pure styling or copy change with no logic: automated tests may not apply; verify visually instead.
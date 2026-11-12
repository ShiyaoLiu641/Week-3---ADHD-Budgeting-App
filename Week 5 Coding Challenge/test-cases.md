# Week 5 — Manual Test Case Scenarios

Two test cases, run **by hand** on the live app:
https://week-3-adhd-budgeting-app-three.vercel.app/

> How to use: do the steps yourself in the live app, then write what actually
> happened in the **Actual Result** row, and mark Pass / Fail.
> (If the app looks asleep, open the Supabase dashboard and click **Resume project** first.)

---

## TC-1 — Park an item (happy path)

Maps to BDD: *Given a logged-in user, When they submit an item with a name, Then it is saved and shown in the list.*

| Field | Detail |
|---|---|
| **Pre-conditions** | You are logged in. You are on the `/items` page. |
| **Steps** | 1. In the "park an item" form, type a name, e.g. `Standing desk`.<br>2. (Optional) paste a real link, e.g. `https://www.amazon.com`.<br>3. Click the button to park it. |
| **Expected Result** | The item appears in your list with the name you typed. No error message. |
| **Actual Result** | _(write what happened after you ran it)_ |
| **Status** | ☐ Pass  ☐ Fail |

---

## TC-2 — Empty name is rejected

Maps to BDD: *Given a logged-in user, When they submit an item with a blank name, Then it is NOT saved and a clear message is shown.*

| Field | Detail |
|---|---|
| **Pre-conditions** | You are logged in. You are on the `/items` page. |
| **Steps** | 1. Leave the name field empty (or type only spaces).<br>2. Click the button to park it. |
| **Expected Result** | Nothing is added to the list. A plain message appears asking you to type what you want to park. |
| **Actual Result** | _(write what happened after you ran it)_ |
| **Status** | ☐ Pass  ☐ Fail |

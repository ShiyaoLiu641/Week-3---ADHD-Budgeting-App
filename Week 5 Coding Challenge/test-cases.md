# Week 5 — Manual Test Case Scenarios

Two scenarios, run **by hand** on the live app:
https://week-3-adhd-budgeting-app-three.vercel.app/

Each has its **BDD scenario** (Given / When / Then) and a **test case**
(pre-conditions, steps, expected result, actual result).

> If the app looks asleep, open the Supabase dashboard and click **Resume project** first.

---

## TC-1 — Park an item (Happy Path)

### BDD scenario

```
GIVEN I am a logged-in user of Park & Revisit
  AND I am on the items page
  AND the "Park an item" form is visible
WHEN I type a name in "What are you tempted to buy?" (e.g. "a new water bottle")
  AND I optionally paste a product link
  AND I click "Park it"
THEN the item is saved
  AND it appears in my list with the name I typed
  AND no error message is shown
```

### Test case

| Field | Detail |
|---|---|
| **Pre-conditions** | Logged in; on the `/items` page. |
| **Steps** | 1. Type a name, e.g. `a new water bottle`.<br>2. (Optional) paste a link.<br>3. Click **Park it**. |
| **Expected Result** | The item appears in the list with the name typed; no error. |
| **Actual Result** | The item was saved and appeared in the list (e.g. "a new water bottle", "Zara Jacket"), with working decision buttons (Buy / Let go / Still deciding). No error shown. |
| **Status** | ☑ **Pass**  ☐ Fail |

---

## TC-2 — Empty name is rejected (Negative Path)

### BDD scenario

```
GIVEN I am a logged-in user of Park & Revisit
  AND I am on the items page
  AND the name field ("What are you tempted to buy?") is empty
WHEN I click "Park it"
THEN the item is NOT saved
  AND a message "Please type what you want to park." is shown
  AND nothing is added to my list
```

### Test case

| Field | Detail |
|---|---|
| **Pre-conditions** | Logged in; on the `/items` page; name field left empty. |
| **Steps** | 1. Leave the name field empty (or type only spaces).<br>2. Click **Park it**. |
| **Expected Result** | Nothing is added; a clear message asks you to type what you want to park. |
| **Actual Result** | The message "Please type what you want to park." appeared and no item was added to the list. |
| **Status** | ☑ **Pass**  ☐ Fail |

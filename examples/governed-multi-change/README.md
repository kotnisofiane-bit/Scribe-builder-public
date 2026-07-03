# Governed Multi-Change Demo

This example is fictional.

It does not contain the private SCRIBE engine.

Its purpose is to illustrate a core SCRIBE principle:

A request containing multiple changes should not become one uncontrolled approval.

N changes require N governed loops.

There is no “approve all” shortcut.

---

## Scenario

A human asks an AI-assisted system to improve a small software project.

The request contains three separate changes:

1. Fix a bug.
2. Add a test.
3. Update documentation.

A normal AI workflow may treat this as one task.

SCRIBE treats it as one intent containing three distinct changes.

Each change must be governed separately.

---

## Normal agent workflow

A normal agent workflow may look like this:

```text
Human request
  → Agent modifies several things
  → Agent summarizes the result
  → Human approves the whole batch
```

This can be fast.

But it creates risk.

The human may approve several changes at once without seeing which decision belongs to which change.

Evidence may become grouped.

Audit may become vague.

Replay becomes harder.

---

## SCRIBE mediated workflow

SCRIBE separates the global intent from the individual changes.

```text
Human Intent
  → Change 1
  → Change 2
  → Change 3
```

Each change receives its own governed loop:

```text
Change
  → Execution Contract
  → Proposal
  → Audit
  → Evidence
  → Human Decision
  → Controlled Execution
  → Replay
```

The system may present the work as one project.

But governance remains separated.

---

## Change 1 — Bug fix

```text
Objective:
Fix the incorrect return value in the selected function.

Scope:
One function.
No refactor.
No documentation change.

Required evidence:
- proposed patch;
- audit result;
- human approval;
- test result;
- replay summary.
```

The coder role may propose a patch.

The auditor role may review it.

SCRIBE checks whether the proposal stays inside the contract.

The human approves or rejects this change alone.

---

## Change 2 — Test addition

```text
Objective:
Add a regression test for the fixed behavior.

Scope:
Test file only.
No production code change.

Required evidence:
- proposed test;
- audit result;
- human approval;
- test run result;
- replay summary.
```

This change is related to the bug fix.

But it remains a separate decision.

The human may approve the bug fix and reject the test change, or the opposite.

SCRIBE does not collapse them into one approval.

---

## Change 3 — Documentation update

```text
Objective:
Update documentation to mention the corrected behavior.

Scope:
Documentation only.
No code change.
No test change.

Required evidence:
- proposed documentation change;
- audit result;
- human approval;
- replay summary.
```

Documentation is not treated as invisible.

It has its own scope, contract, evidence and decision.

---

## Why separation matters

When several changes are approved together, responsibility becomes blurry.

A human may later ask:

- Which change introduced this behavior?
- Was this specific change approved?
- What evidence supported it?
- Was the audit about the whole batch or this exact change?
- Can this decision be replayed?

SCRIBE makes each decision traceable.

The goal is not to slow the project down.

The goal is to avoid hiding multiple decisions inside one approval.

---

## No approve-all

SCRIBE does not treat a batch as a single decision when the batch contains separate changes.

```text
Bad:
Approve all changes.

Better:
Approve change 1.
Reject change 2.
Request revision on change 3.
```

This allows human judgment to remain precise.

It also allows proof and replay to remain meaningful.

---

## Proof summary

At the end, SCRIBE can produce a proof summary.

```text
Global intent:
Improve a small software project.

Change 1:
Bug fix — approved — executed — evidence recorded.

Change 2:
Regression test — rejected — not executed — reason recorded.

Change 3:
Documentation update — revision requested — not executed — reason recorded.
```

The result is not only a final state.

It is a decision path.

---

## Summary

The key difference is not that SCRIBE uses more agents.

The key difference is that SCRIBE separates decisions.

A normal workflow may optimize for speed.

SCRIBE optimizes for governed coordination.

N changes require N loops.

No agent validates itself.

No batch hides human responsibility.

No “approve all” bypasses decision memory.

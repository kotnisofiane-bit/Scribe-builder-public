# Governed Multi-Change Example

This fictional example illustrates how DUBSAR can govern a coherent lot containing several related file changes without collapsing distinct protected decisions into an ambiguous approval.

It does not contain or describe the private Core implementation.

---

## Scenario

A user asks Claude Code to fix a bug, add the regression test and update the related documentation.

These changes form one coherent product outcome. DUBSAR does not need to create three artificial macro-lots merely because three files or change types are involved.

The governed unit can be:

```text
Mission
  → Lot: Correct behavior and document it
      → code scope
      → test scope
      → documentation scope
      → expected evidence
      → Human Gate conditions
```

---

## Why a contract is still needed

A coherent lot can still drift.

The execution contract should make clear:

- the exact behavior to correct;
- the production files allowed to change;
- the test expected;
- the documentation allowed to change;
- forbidden refactors;
- required evidence;
- whether merge or another protected action requires a Human Gate.

---

## Claude Code's role

Claude Code may plan and implement the lot using its native tools.

It may report:

- changed paths;
- tests it claims to have run;
- outputs it produced;
- reserves or failures.

That report remains a declaration until the relevant evidence is independently checked.

---

## DUBSAR's role

DUBSAR relates the work to the active Mission and contract.

It should help answer:

- Did the change remain inside the allowed scope?
- Was the expected regression test supplied?
- Which results are declared and which are verified?
- Did an unrelated refactor appear?
- Is required evidence missing or invalid?
- Is a Human Gate required before merge?

DUBSAR does not rewrite the code itself and does not create a Human GO.

---

## Example evidence view

```text
Lot: Correct return value and document behavior

Production change:
  status: declared
  scope: within contract

Regression test:
  status: verified
  verifier: bounded test runner

Documentation update:
  status: declared

Unrelated refactor:
  status: absent

Human Gate:
  required before merge
```

A real result may differ. The important point is that the evidence status is explicit.

---

## When decisions should remain separate

Related file changes may belong to one lot, but separate human decisions are still appropriate when the actions have independent risk or authority.

Examples:

- approve the code change but reject a new external dependency;
- accept a local migration but refuse production deployment;
- approve the implementation but request revision before merge;
- accept one risk exception while rejecting another.

DUBSAR should preserve those distinctions without forcing every small edit into its own bureaucratic loop.

---

## Review packet

Before protected movement, the human-facing dossier can summarize:

```text
Mission and lot
Applicable decisions and constraints
Contracted scope
Changed paths
Declared results
Verified evidence
Missing or invalid evidence
Audit findings
Residual risks
Decision requested
```

The human can then approve, reject or request revision for the specific protected movement presented.

---

## Summary

The goal is neither “approve everything” nor “create one process per file”.

The goal is a coherent governed lot with explicit scope, evidence and human authority where it matters.

Claude Code builds. DUBSAR preserves the governed project state. Humans decide protected movement.

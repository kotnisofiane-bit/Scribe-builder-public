# RFC-0005 — Human Validation

## Purpose

Human validation is the point where responsibility remains visible.

SCRIBE Builder does not assume that AI roles should become final authorities.

AI roles can propose, frame, summarize or audit.

The human remains responsible for critical decisions.

## Problem

In AI-assisted work, approval can become vague.

A human may be asked to approve a large batch, an unclear proposal or a change detached from evidence.

That weakens responsibility.

Human validation should be supported by structure.

## Public validation shape

A human validation point may include:

- decision request;
- contract summary;
- proposal summary;
- audit summary;
- evidence summary;
- known limitations;
- approval options;
- result expectation.

This is a public concept, not the private human-gate implementation.

## Example

```text
Decision request:
Approve publication of conceptual RFC documentation.

Boundary:
Public documentation only.

Evidence:
Changed-file summary and sensitivity boundary check.

Options:
Approve.
Reject.
Request revision.

Result if approved:
Documentation branch can be merged.
```

## Approval precision

Human validation should be precise.

A request containing several distinct changes should not become a single vague approval.

N changes require N decision paths.

No approve-all shortcut should hide responsibility.

## Invariants

Human validation should preserve:

- clarity of the decision;
- visibility of evidence;
- ability to reject or revise;
- separation of independent changes;
- replayability of the approval path.

## Non-goals

This RFC does not publish:

- private gate code;
- internal policy rules;
- authentication material;
- operational approval mechanism;
- real approval logs;
- sensitive decision records.

## Summary

Human validation is not a button.

It is a structured responsibility point.

SCRIBE attempts to make that responsibility easier to exercise and easier to replay.

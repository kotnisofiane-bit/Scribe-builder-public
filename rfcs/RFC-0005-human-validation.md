# RFC-0005 — Human Validation

## Abstract

Human validation is the visible responsibility point in the governance loop.

AI roles may propose, frame, summarize or audit.

They do not become the final authority for critical decisions.

This RFC defines the public concept of human validation without publishing the private gate implementation.

## Design goal

The goal is to avoid vague approval.

A human decision should be attached to a bounded contract, a clear proposal and reviewable evidence.

The person approving should know what is being approved and what is excluded.

## Public validation request

A public validation request MAY include:

- `decision_request`: what the human is asked to decide;
- `contract_summary`: boundary of the work;
- `proposal_summary`: proposed action;
- `audit_summary`: review outcome;
- `evidence_summary`: evidence available;
- `known_limitations`: what remains uncertain;
- `decision_options`: approve, reject or request revision;
- `expected_result`: what happens if approved.

This is an abstract public shape.

It is not the private human-gate schema.

## Required invariants

A validation request MUST identify the decision being requested.

It MUST show the scope boundary.

It MUST show available evidence or explicitly state that evidence is missing.

It MUST preserve the option to reject or request revision.

It MUST NOT ask for approval of hidden changes.

It MUST NOT allow an agent to approve its own work.

## Multi-change rule

If a request contains independent changes, the changes SHOULD be separated.

N independent changes SHOULD produce N decision paths.

A vague approve-all pattern is considered a governance failure.

## Example

```text
Decision request:
Approve the publication of public RFC documentation.

Contract:
Documentation only.
No code.
No private engine.

Evidence:
Changed files listed.
Boundary reviewed.
No sensitive material included.

Options:
Approve.
Reject.
Request revision.

Expected result:
The documentation PR may be merged if approved.
```

## Human validation is not decoration

Human validation is not a ceremonial button.

It is the point where responsibility remains explicit.

A system can help present information.

It should not hide the decision behind automation.

## Failure modes

Common failure modes include:

- asking for approval before evidence exists;
- merging several unrelated decisions into one approval;
- hiding limitations;
- treating an audit summary as final authority;
- using confusing or high-pressure language;
- asking a human to approve private material they cannot inspect;
- letting an agent self-approve.

## Technical review criteria

A reviewer should be able to answer:

- What exactly is being approved?
- What is excluded?
- What evidence exists?
- What are the known limitations?
- What happens after approval?
- Can the human reject or request revision?
- Is the approval replayable?

## Non-goals

This RFC does not publish:

- private gate code;
- internal policy rules;
- authentication material;
- operational approval mechanism;
- real approval logs;
- sensitive decision records.

## Summary

Human validation keeps responsibility visible.

It turns approval into a reviewable decision rather than a vague permission signal.

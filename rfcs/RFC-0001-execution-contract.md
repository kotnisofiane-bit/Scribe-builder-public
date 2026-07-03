# RFC-0001 — Execution Contract

## Purpose

An execution contract is a public conceptual boundary for a proposed change.

It defines what the work is allowed to do before any implementation, audit or approval happens.

In SCRIBE Builder, a contract is not proof that a change is correct.

It makes the change governable.

## Problem

AI-assisted work can move quickly from intent to action.

That speed is useful, but it creates risk when scope, evidence and approval are implicit.

Without a contract, a proposal may expand silently, merge unrelated work or ask for human approval without a clear boundary.

## Public contract shape

A public execution contract may contain:

- objective;
- scope;
- non-scope;
- allowed actions;
- forbidden actions;
- required evidence;
- audit expectation;
- human decision point;
- stop conditions.

This is a conceptual shape, not the private engine schema.

## Example

```text
Objective:
Update one public documentation page.

Scope:
Documentation only.

Non-scope:
No engine code.
No private logs.
No implementation details.

Required evidence:
Summary of changed files.
Human-readable rationale.
Boundary confirmation.

Human decision:
Required before publication.

Stop condition:
Stop if sensitive material appears.
```

## Invariants

An execution contract should preserve several public invariants:

- no action without a defined objective;
- no approval without a bounded scope;
- no batch approval when separate decisions are present;
- no silent expansion of the task;
- no bypass of required human decision;
- no publication of sensitive internals.

## Non-goals

This RFC does not define:

- private validation code;
- private gate logic;
- provider integration;
- signing implementation;
- operational write mechanism;
- internal policy representation.

## Summary

The execution contract is the public boundary around work.

It turns intent into a governable unit.

It does not replace audit, evidence or human judgment.

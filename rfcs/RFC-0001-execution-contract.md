# RFC-0001 — Execution Contract

## Abstract

An execution contract is a bounded unit of intended work.

It describes what a proposed action is allowed to change, what it must not change and what evidence is required before a human decision.

It is a governance object, not an implementation object.

## Design goal

The contract exists to prevent silent task expansion.

It also separates the intent of the work from the agent that proposes or performs it.

An agent may help draft a contract.

The contract itself remains reviewable by a human.

## Public contract fields

A public execution contract MAY include:

- `objective`: the intended outcome;
- `scope`: what may change;
- `non_scope`: what must not change;
- `allowed_actions`: permitted classes of action;
- `forbidden_actions`: prohibited classes of action;
- `evidence_required`: evidence expected before approval;
- `risk_notes`: known uncertainty or sensitivity;
- `human_decision_required`: whether approval is required;
- `stop_conditions`: conditions that halt the work.

This is an abstract public shape.

It is not a private schema and not an API contract.

## Lifecycle

A contract can be described through public lifecycle states:

```text
DRAFT -> BOUNDED -> PROPOSED -> REVIEWED -> DECIDED -> CLOSED
```

The lifecycle is conceptual.

The private engine may use different structures.

## Required invariants

A valid public contract MUST make the objective explicit.

It MUST distinguish scope from non-scope.

It MUST identify the evidence expected before approval.

It MUST define at least one stop condition.

It MUST NOT authorize unrelated changes under one vague approval.

It MUST NOT imply that an agent can approve its own work.

## Stop conditions

A contract SHOULD stop the work when:

- sensitive material appears;
- the scope expands;
- evidence is missing;
- a second independent change is introduced;
- a required human decision is absent;
- the public/private boundary becomes unclear.

## Example

```text
Objective:
Add public technical documentation.

Scope:
Public Markdown documentation only.

Non-scope:
No private engine code.
No prompts.
No internal gates.
No sealed journals.
No proof artifacts.

Evidence required:
Changed-file list.
Boundary confirmation.
Non-goals confirmed.

Human decision:
Required before merge.

Stop conditions:
Any private material appears.
The change starts describing implementation mechanisms.
The change introduces code.
```

## Failure modes

Common failure modes include:

- scope drift;
- implicit approval;
- unrelated changes batched together;
- evidence described too vaguely;
- public documentation that implies private implementation details;
- contract language that sounds commercial-ready.

## Technical review criteria

A reviewer should be able to answer:

- What is the unit of work?
- What is outside the unit of work?
- What evidence is required?
- What stops the work?
- Who decides?
- What should not be inferred?

## Non-goals

This RFC does not publish:

- private validation code;
- gate logic;
- policy representation;
- provider integration;
- signing implementation;
- operational write mechanism.

## Summary

An execution contract makes AI-assisted work governable.

It is the public boundary around a proposed action.

It does not replace audit, evidence or human decision.

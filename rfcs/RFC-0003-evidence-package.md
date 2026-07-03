# RFC-0003 — Evidence Package

## Abstract

An evidence package is a bounded set of references that supports a decision.

It explains what was checked, what changed, what did not change and what remains unproven.

It is not a proof of correctness.

It is not a replacement for human review.

## Design goal

The evidence package makes a decision reviewable.

It should reduce ambiguity without publishing private proof artifacts.

A technical reader should understand the type of evidence expected by the protocol.

They should not receive internal trust material or private logs.

## Public evidence record

A public evidence package MAY include:

- `evidence_id`: public identifier;
- `contract_ref`: contract being evaluated;
- `change_summary`: files or areas changed;
- `scope_check`: whether the change stayed in scope;
- `audit_summary`: review outcome;
- `test_summary`: checks performed, if any;
- `boundary_check`: public/private boundary confirmation;
- `decision_ref`: linked human decision;
- `limitations`: what the evidence does not prove.

This is an abstract public shape.

It is not a proof pack schema.

## Evidence classes

Public evidence MAY be classified as:

- scope evidence;
- change evidence;
- audit evidence;
- test evidence;
- boundary evidence;
- decision evidence;
- replay evidence;
- limitation evidence.

The classification is for documentation and review.

It does not reveal the private evidence engine.

## Required invariants

An evidence package MUST state what it supports.

It MUST state what it does not support.

It MUST identify whether the change stayed within scope.

It MUST distinguish evidence from assertion.

It SHOULD link evidence to a decision.

It MUST NOT publish private proof artifacts.

## Example

```text
Evidence package:
Public RFC documentation update.

Change evidence:
Markdown files added under rfcs/.
README updated with public RFC link.

Scope evidence:
Documentation only.
No code added.
No private engine references.

Boundary evidence:
No prompts.
No sealed journals.
No signing material.
No operational write path.

Limitations:
The evidence does not validate a product.
The evidence does not expose implementation behavior.
```

## Evidence is not authority

Evidence can support a decision.

It cannot make the decision on behalf of the human.

A model-generated explanation SHOULD NOT be treated as evidence unless it is tied to reviewable material.

## Failure modes

Common failure modes include:

- relying on fluent summaries without reviewable material;
- omitting limitations;
- claiming test coverage where none exists;
- treating private artifacts as public evidence;
- publishing too much detail in the name of transparency;
- failing to link evidence to the decision it supports.

## Technical review criteria

A reviewer should be able to answer:

- What claim does this evidence support?
- What material was checked?
- What remained unchecked?
- Is the evidence public-safe?
- Is the evidence linked to a decision?
- Are limitations explicit?

## Non-goals

This RFC does not publish:

- private proof pack contents;
- trust ledgers;
- hashes of sensitive artifacts;
- signing keys;
- provider outputs;
- hidden policy logic.

## Summary

Evidence packages make governance reviewable.

They should be bounded, honest and safe to publish.

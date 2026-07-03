# RFC-0004 — Replay Format

## Abstract

Replay is the ability to reconstruct the meaningful path of a decision.

It is not full conversation capture.

It is not surveillance.

It is not a private event log.

Replay preserves enough structure for future review while keeping private material private.

## Design goal

A long-running AI-assisted project should be able to answer a simple question:

How did this decision happen?

The answer should be reconstructable without relying on model memory or hidden conversation state.

## Public replay path

A public replay path MAY use this sequence:

```text
Intent
  -> Contract
  -> Proposal
  -> Audit
  -> Evidence
  -> Human Decision
  -> Result
```

This sequence is conceptual.

It is not the private replay implementation.

## Public replay record

A public replay record MAY include:

- `replay_id`: public identifier;
- `intent_ref`: original intent summary;
- `contract_ref`: execution contract;
- `proposal_ref`: proposal summary;
- `audit_ref`: audit summary;
- `evidence_ref`: evidence package;
- `decision_ref`: human decision;
- `result_ref`: final state;
- `limitations`: missing or private material.

This is an abstract shape.

It is not a storage schema.

## Required invariants

A replay record MUST preserve the order of meaningful steps.

It MUST distinguish proposal from approval.

It MUST link evidence to the decision it supports.

It MUST make missing evidence visible.

It MUST NOT require publishing private prompts, sealed journals or internal logs.

It SHOULD be readable without executing any code.

## Example

```text
Intent:
Make the public repository more technically credible.

Contract:
Documentation only.
No code.
No private engine.

Proposal:
Add public RFCs for governance concepts.

Audit:
Check whether the RFCs are technical, bounded and non-sensitive.

Evidence:
Changed-file list and boundary check.

Human decision:
Approve or request revision.

Result:
Public documentation branch remains reviewable.
```

## Replay boundaries

Replay should preserve decision structure.

It should not preserve irrelevant conversation content.

It should not expose private project memory.

It should not reveal operational mechanisms.

The public replay layer should make the process understandable, not reproducible.

## Failure modes

Common failure modes include:

- replay missing the original intent;
- proposal and approval collapsed into one step;
- evidence disconnected from the decision;
- private material included for convenience;
- replay described as deterministic proof;
- result recorded without limitations.

## Technical review criteria

A reviewer should be able to answer:

- What was the original intent?
- What contract bounded the work?
- What was proposed?
- What was checked?
- What evidence supported the decision?
- Who decided?
- What happened afterward?
- What is intentionally not public?

## Non-goals

This RFC does not publish:

- private replay code;
- internal event model;
- sealed journals;
- raw conversation capture;
- proof pack contents;
- operational execution traces.

## Summary

Replay is the memory path of a decision.

It makes governance durable without exposing the private engine.

# RFC-0002 — Decision Memory

## Abstract

Decision memory is the structured memory of project decisions.

It records the reasoning path that a future reviewer needs in order to understand why a project moved in a certain direction.

It is not a chat transcript.

It is not a complete event log.

It is not the private journal.

## Design goal

Decision memory exists to preserve continuity in long-running AI-assisted work.

A project should not depend only on scattered conversations or model context.

It should preserve the decisions that future work depends on.

## Public decision record

A public decision record MAY include:

- `decision_id`: public identifier;
- `title`: short decision label;
- `intent`: original reason for the decision;
- `contract_ref`: reference to the governing contract;
- `proposal_summary`: what was proposed;
- `audit_summary`: what was reviewed;
- `evidence_ref`: evidence package reference;
- `human_decision`: approve, reject or revise;
- `result`: what happened after the decision;
- `replay_ref`: replay path reference;
- `limitations`: what the record does not prove.

This is an abstract public shape, not the private storage format.

## Memory boundary

Decision memory SHOULD preserve meaning, not raw conversation volume.

It SHOULD avoid unnecessary personal data.

It SHOULD avoid private prompts.

It SHOULD avoid provider outputs unless they are intentionally summarized and safe.

It MUST NOT publish sealed private journals.

## Decision classes

Public decision memory may distinguish several classes:

- architectural decision;
- scope decision;
- audit decision;
- release decision;
- rollback decision;
- publication decision;
- non-decision.

A non-decision is useful when a path was explicitly rejected.

## Required invariants

A decision memory entry MUST make the decision identifiable.

It MUST record the reason, not only the outcome.

It MUST link to evidence or state that evidence is absent.

It MUST make human responsibility visible when approval is required.

It SHOULD state limitations.

It MUST NOT be written as marketing material.

## Example

```text
Decision:
Publish public RFC documentation.

Reason:
Make the public repository technically legible without publishing the engine.

Contract:
Documentation only.
No private engine material.
No operational write details.

Evidence:
Changed files reviewed.
Boundary confirmed.
No code introduced.

Human decision:
Approved for public repository review.

Limitations:
Conceptual RFCs only.
No implementation guarantee.
```

## Failure modes

Common failure modes include:

- storing too much raw conversation;
- storing only conclusions without reasons;
- losing the link between evidence and approval;
- treating generated text as evidence;
- hiding rejected alternatives;
- confusing public memory with private journals.

## Technical review criteria

A reviewer should be able to answer:

- What decision was made?
- Why was it made?
- What evidence existed?
- What was rejected or excluded?
- Who or what authorized the result?
- Can the path be replayed without private material?

## Non-goals

This RFC does not publish:

- private journal format;
- internal decision engine;
- prompts;
- confidential logs;
- proof pack content;
- private storage model.

## Summary

Decision memory is the continuity layer of the project.

It gives future work access to prior reasoning without exposing private internals.

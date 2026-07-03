# RFC-0002 — Decision Memory

## Purpose

Decision memory is the structured record of what a project depends on.

It is not a transcript.

It is not a chat archive.

It preserves the decisions, reasons, evidence and outcomes that help a project remain coherent over time.

## Problem

Long-running AI-assisted projects can lose continuity.

A model may produce useful answers, but the project can still forget:

- why a constraint exists;
- why an option was rejected;
- which evidence supported approval;
- which human decision authorized a change;
- whether a decision can be replayed later.

Conversation history alone is not enough.

## Public memory shape

A public decision memory entry may contain:

- decision id;
- decision title;
- intent summary;
- contract reference;
- proposal summary;
- audit summary;
- evidence summary;
- human decision;
- result summary;
- replay reference.

This is a public conceptual shape, not the private storage model.

## Example

```text
Decision:
Approve a documentation-only update.

Reason:
The change clarifies the public protocol without exposing the private engine.

Evidence:
Changed-file summary and boundary check.

Outcome:
Published to the public documentation branch.

Replay:
Intent -> Contract -> Proposal -> Audit -> Evidence -> Human Decision -> Result
```

## Invariants

Decision memory should preserve:

- what was decided;
- why it was decided;
- what evidence existed;
- who or what approved it;
- what changed afterward;
- whether the decision can be revisited.

## Memory is not authority

Decision memory does not decide what is true.

It does not replace human judgment.

It gives future work a clearer basis for review.

A decision can be revised, but the revision should also become visible.

## Non-goals

This RFC does not publish:

- sealed journals;
- private audit traces;
- prompts;
- internal proof pack structure;
- private storage format;
- confidential project history.

## Summary

Decision memory gives a project continuity.

It helps future work inherit prior reasoning without exposing private internals.

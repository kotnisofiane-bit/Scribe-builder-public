# RFC-0004 — Replay Format

## Purpose

Replay is the ability to reconstruct the meaningful path of a decision.

It does not require storing every word of every conversation.

It requires preserving the sequence that made the decision governable.

## Problem

A project can reach a final state without remembering how it got there.

That is risky in long-running AI-assisted work.

Future reviewers need to know:

- what the original intent was;
- what contract bounded the task;
- what proposal was made;
- what audit occurred;
- what evidence supported the decision;
- what the human approved;
- what result followed.

## Public replay sequence

A public replay path may be represented as:

```text
Intent
  -> Contract
  -> Proposal
  -> Audit
  -> Evidence
  -> Human Decision
  -> Result
```

This is a conceptual sequence, not the private replay implementation.

## Example

```text
Intent:
Publish public technical notes.

Contract:
Documentation only, no private engine, no sensitive internals.

Proposal:
Add public RFCs describing protocol concepts.

Audit:
Check for boundary violations and overclaiming.

Evidence:
Changed-file list and public-scope confirmation.

Human Decision:
Approve publication.

Result:
Public documentation updated.
```

## Replay requirements

A replayable decision should provide enough context to answer:

- what was decided;
- what was not decided;
- what evidence existed;
- what limitations remained;
- what should not be inferred.

## Replay boundaries

Replay should not become full surveillance.

It should not preserve irrelevant conversation material.

It should not expose sensitive prompts, private logs or confidential proof artifacts.

## Non-goals

This RFC does not publish:

- private replay code;
- internal event model;
- storage format;
- real proof pack contents;
- sealed project journals.

## Summary

Replay makes governance durable.

It lets the project remember the path of a decision without exposing the private engine.

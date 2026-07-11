# Architecture

SCRIBE is not designed as a single autonomous agent.

It is a decision-memory, audit and human-validation layer around AI-assisted software projects.

The architecture is organized around one idea:

> Intelligence may produce proposals, but project movement must remain bounded by memory, evidence and Human GO.

---

## Current public architecture

The current product direction is hybrid.

SCRIBE is not published as a full local brain and the private core is not distributed. Public surfaces are intended to remain thin, explainable and bounded.

```text
Existing AI coding workflow
        ↓
SCRIBE Launcher / connector surface
        ↓
Private service boundary
        ↓
Private SCRIBE decision core
        ↓
Evidence, memory and Human GO shown for review
```

This public repository documents the concept, not the implementation.

It does not publish the backend, the private core, prompts, internal policies, sealed journals, operational write mechanisms, trust material or provider-specific details.

---

## Design principle

The number of agents is not the architecture.

A project may use one agent or several. The same problem remains:

```text
Intent
  -> Agent proposal
  -> SCRIBE checks memory, constraints and evidence
  -> Human GO when protected project movement is required
  -> Evidence and replay remain available
```

SCRIBE does not depend on claiming that AI agents can govern themselves.

It exists because AI-assisted projects need a structure around proposals before those proposals become decisions.

---

## Main public layers

### 1. Existing AI coding workflow

SCRIBE is designed to sit around AI coding workflows that developers already use.

Examples of host environments may include AI coding tools, code assistants, IDE agents or agentic development workflows.

This repository does not claim that a public integration is available today.

### 2. SCRIBE Launcher / connector surface

SCRIBE Launcher is the first product surface being explored.

Its public role is to frame work, expose boundaries, surface checks and keep Human GO explicit around agent-assisted changes.

Depending on the host environment, future delivery forms may include a connector, plugin or MCP-compatible integration.

Launcher should be understood as a thin surface around existing tools, not as the proprietary SCRIBE brain.

### 3. Private service boundary

The service boundary mediates what can be exposed publicly and what must remain private.

In the public framing, this layer is responsible for preserving the separation between:

- public documentation and product surfaces;
- private decision logic;
- internal audit state;
- operational proof material;
- implementation details that are still evolving.

No private routes, schemas, payloads or trust mechanisms are documented here.

### 4. Private SCRIBE decision core

The private core is where the proprietary decision-memory, audit, proof and validation logic evolves.

It is not published in this repository.

The public documentation may describe abstract concepts such as decision memory, contracts, evidence, replay and Human GO, but it must not expose the private mechanisms that enforce them.

### 5. Human-facing review surfaces

SCRIBE needs a surface where the human can see what matters before movement.

This direction is currently represented by the idea of Eyes of SCRIBE: a cockpit / observation layer that shows what SCRIBE has seen, checked, excluded, evidenced and left awaiting Human GO.

Eyes of SCRIBE is not an autonomous execution engine. It is a review and decision context.

---

## Decision memory

Decision memory is the persistent structure behind SCRIBE.

It records meaningful project decisions rather than preserving every word of every conversation.

Decision memory helps answer questions such as:

- What was decided?
- Why was it decided?
- What evidence supported it?
- What constraints existed?
- What changed afterward?
- Can the decision path be replayed?

Without decision memory, long-running AI-assisted projects become fragile.

---

## Constraints and contracts

A contract or constraint set defines the boundaries of a proposed task.

It may describe:

- what is allowed;
- what is forbidden;
- what evidence is required;
- what requires Human GO;
- what should fail closed.

A contract does not make a proposal correct.

It makes the proposal auditable and governable.

---

## Evidence

Evidence is the material that makes the process reviewable.

Depending on the context, evidence may include:

- summaries;
- diffs;
- hashes;
- test results;
- audit verdicts;
- approval records;
- proof pack metadata;
- replay information.

Evidence is not decoration.

It is what allows a future reviewer to understand what happened.

Public examples must remain sanitized and must not expose sensitive project history or private proof artifacts.

---

## Human GO

Human GO is the explicit human decision point before protected project movement.

It does not mean the human must approve every trivial action.

It means that when a change crosses a meaningful boundary — scope, merge, release, locked constraints, sensitive areas or irreversible movement — the system must keep the human decision visible and explicit.

No agent validates itself.

---

## Replay

Replay is the ability to reconstruct the decision path later.

Replay does not require preserving every token of every interaction.

It requires preserving the meaningful sequence:

```text
Intent -> Constraint -> Proposal -> Audit -> Evidence -> Human GO -> Result
```

Replay makes project memory durable.

---

## Role separation

Earlier SCRIBE documentation used Architect, Coder and Auditor roles to explain why no AI role should validate itself.

That doctrine remains useful.

However, those roles should not be read as the current product architecture. SCRIBE does not need to host a full internal team of agents to be useful.

Whether one agent or several agents are involved, SCRIBE focuses on the project layer:

- memory;
- boundaries;
- audit;
- evidence;
- Human GO;
- replay.

---

## Design boundary

This public repository documents the architecture at a conceptual level.

It does not expose:

- the private engine;
- backend implementation details;
- internal audit logs;
- sealed journals;
- private prompts;
- private policies;
- confidential proof artifacts;
- operational write mechanisms;
- trust or signing material;
- evolving implementation details.

The goal of this document is to explain the public architecture of SCRIBE without publishing sensitive internals.

---

## Summary

SCRIBE is a decision-memory and audit layer for AI-driven software projects.

It keeps proposed project movement bounded by memory, constraints, evidence and Human GO.

It can work around one agent or several agents.

It does not try to make AI agents autonomous authorities.

It tries to make AI-assisted development more reliable over time.

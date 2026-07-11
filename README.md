# SCRIBE Builder

**Decision memory and audit for AI-driven software projects.**

Your AI agent moves fast.
SCRIBE keeps it from forgetting, breaking things, or merging too early.

Agents propose. SCRIBE checks. Humans decide.

---

## What is SCRIBE Builder?

SCRIBE Builder is an engineering exploration for long-running software projects built with AI coding agents.

AI agents can write code, refactor files, draft plans and audit pull requests quickly. The harder problem is not speed. The harder problem is continuity.

A project needs to remember:

- what was decided;
- which constraints were locked;
- what evidence was available;
- what changed;
- what still requires human approval;
- what can be replayed later.

SCRIBE explores that layer.

It is not an AI agent that codes instead of the developer. It is a decision-memory, audit and validation layer around AI-assisted development workflows.

---

## The core idea

SCRIBE is not another coding agent.

It is a guardrail around AI coding work: it keeps project memory visible, checks proposals against prior decisions, preserves evidence and keeps the human decision explicit before movement.

```text
Agent proposes
  -> SCRIBE checks memory, constraints and evidence
  -> Human GO is required when the project moves
  -> The decision path remains replayable
```

SCRIBE does not let an AI system validate itself.

---

## Why this matters

In short conversations, AI can be extremely useful.

In long-running projects, the failure mode changes.

The risk is no longer only that a model gives a bad answer. The risk is that a project slowly drifts while every individual answer still looks reasonable:

- a locked rule disappears from the next prompt;
- a previous decision is forgotten;
- a refactor touches a forbidden area;
- a pull request looks technically plausible but moves the project in the wrong direction;
- a merge happens before the human decision is clear.

SCRIBE exists for that gap between fast AI output and reliable project movement.

---

## Decision Trace / Checkpoint Grammar

SCRIBE is built around a simple project grammar:

```text
Memory -> Constraint -> Proposal -> Audit -> Evidence -> Human GO -> Replay
```

The public product direction uses this grammar consistently:

- **memory** for decisions that should not disappear;
- **constraints** for rules that must remain visible;
- **audit** for checking before movement;
- **evidence** for reviewable proof;
- **Human GO** for explicit human approval;
- **replay** for understanding how a decision path evolved.

This repository documents the public side of that grammar.

The private engine, internal audit logs, sealed journals, prompts, signing material, provider details, proof artifacts and operational write mechanisms are not published here.

---

## Visual overview

![The Governed Collaboration Loop](diagrams/governed-loop.svg)

More public diagrams are available in the [diagrams folder](diagrams/):

- [Conceptual Architecture](diagrams/architecture.svg)
- [Decision Memory](diagrams/decision-memory.svg)
- [Execution Contract](diagrams/execution-contract.svg)
- [Project Evolution](diagrams/project-evolution.svg)

Direct links to `.svg` files may open as source text in some mobile GitHub views. For visual previews, open this README or the [diagrams README](diagrams/README.md).

---

## Public RFCs

The [public RFCs](rfcs/README.md) are the public technical specification layer of SCRIBE Builder.

They define concepts, invariants, abstract record shapes, failure modes and review criteria.

They are written for technical readers.

They do not publish the private engine.

They do not expose internal gates, prompts, sealed journals, signing material, provider details, proof artifacts or operational write mechanisms.

---

## What this public repository is

This repository is a public boundary for SCRIBE Builder.

It contains:

- public positioning;
- public principles;
- conceptual architecture;
- decision-memory documentation;
- public diagrams;
- public RFCs;
- non-sensitive examples.

It is meant to explain the project without exposing the proprietary core.

---

## What SCRIBE is not

SCRIBE Builder is not:

- a replacement for developers;
- an autonomous coding platform;
- a marketplace of AI agents;
- a claim that AI can self-govern;
- a commercial-ready product;
- a public release of the private engine.

The private implementation remains under active development.

---

## Public documentation

Recommended reading order:

1. [Why SCRIBE?](WHY_SCRIBE.md)
2. [Manifesto](MANIFESTO.md)
3. [Principles](PRINCIPLES.md)
4. [Architecture](ARCHITECTURE.md)
5. [Decision Memory](DECISION_MEMORY.md)
6. [Why not just agents?](WHY_NOT_JUST_AGENTS.md)
7. [Design Philosophy](DESIGN_PHILOSOPHY.md)
8. [FAQ](FAQ.md)
9. [Roadmap](ROADMAP.md)
10. [Status](STATUS.md)
11. [Governed Multi-Change Demo](examples/governed-multi-change/README.md)
12. [Diagrams](diagrams/README.md)
13. [Public RFCs](rfcs/README.md)

---

## Current status

SCRIBE Builder is experimental.

It is not commercial-ready.

The public repository is intentionally limited to non-sensitive material. It does not contain the private engine, internal audit logs, sealed project journals, private prompts, confidential proof artifacts or implementation details that are still evolving.

---

## Long-term direction

SCRIBE Builder begins with AI-assisted software development.

The broader question is larger:

How should humans and AI build together when projects last longer than a single chat, a single pull request or a single agent session?

The hypothesis explored here is that reliable AI collaboration requires more than better models. It requires memory, constraints, evidence, replay and human decision.

Intelligence produces proposals.

SCRIBE keeps the project from moving without memory, proof and human approval.

---

## Created by

Created by Sofiane Kotni.

# FAQ

## Is SCRIBE another coding agent?

No.

SCRIBE is not another autonomous coding agent and it is not a replacement for developers.

It is a decision-memory, audit and human-validation layer around AI-assisted development workflows.

Agents propose. SCRIBE checks. Humans decide.

---

## What problem does SCRIBE address?

AI agents can move quickly, but long-running projects need continuity.

SCRIBE is designed for the moments where a project needs to remember:

- previous decisions;
- locked constraints;
- sensitive boundaries;
- required evidence;
- what still needs Human GO;
- what should be replayable later.

Without that structure, a project can drift even when each individual AI answer looks reasonable.

---

## Does SCRIBE replace Claude Code, Codex, Cursor or other AI coding tools?

No.

SCRIBE is meant to sit around AI-assisted workflows, not replace them.

The current product direction explores thin surfaces around existing tools: a launcher, connector, plugin or MCP-compatible integration may become a delivery form depending on the host environment.

No stable public connector API or public installation package is available today.

---

## What is SCRIBE Launcher?

SCRIBE Launcher is the first product surface being explored.

Its role is to help frame work, surface project memory, expose constraints, preserve evidence and keep Human GO explicit around AI-assisted changes.

Launcher should be understood as a thin guardrail / connector surface.

It is not the private SCRIBE core and it is not an autonomous brain running locally inside the public repository.

---

## What is Eyes of SCRIBE?

Eyes of SCRIBE is the cockpit / observation direction.

Its purpose is to show what SCRIBE has seen, checked, excluded, evidenced and left awaiting human decision.

It is a review and decision context, not an autonomous execution engine.

This direction is still under active development.

---

## Why not just let agents collaborate directly?

Agents can collaborate directly.

The problem is that agent-to-agent interaction does not automatically create durable project memory, evidence, approval boundaries or replay.

Whether one agent or several agents are involved, the project still needs:

- memory;
- constraints;
- audit;
- evidence;
- Human GO;
- replay.

SCRIBE focuses on that project layer.

---

## Does SCRIBE make AI models more intelligent?

No.

SCRIBE is model-agnostic.

It does not try to improve the intelligence of a model.

It tries to improve the structure around AI-assisted work.

Intelligence produces proposals.

SCRIBE keeps project movement bounded by memory, evidence and human decision.

---

## What does “decision memory” mean?

Decision memory is the structured memory of what was decided, why it was decided and what evidence supported that decision.

It is different from conversation history.

Conversation history records what was said.

Decision memory preserves what became meaningful for the project.

---

## What does SCRIBE govern?

SCRIBE does not govern AI agents as personalities.

It governs how proposed project changes move through checkpoints:

```text
Memory -> Constraint -> Proposal -> Audit -> Evidence -> Human GO -> Replay
```

The goal is not to make agents less capable.

The goal is to make project movement more reliable.

---

## Is SCRIBE open source?

No.

This is a publicly viewable documentation repository.

It is not an open-source release of the SCRIBE core and it does not contain an installable product package.

The private implementation, backend, internal audit history, prompts, sealed project journals, proof artifacts, operational write mechanisms and trust material are not part of this repository.

---

## Is SCRIBE production-ready?

No.

SCRIBE is not commercial-ready.

There is currently no public installation package, no stable public API, no production deployment and no commercial availability.

The current focus is clarity, correctness, proof, Human GO and protecting the public/private boundary.

---

## Why publish this repository now?

Because ideas also need durable references.

This repository makes the reasoning behind SCRIBE visible without exposing the private engine.

It is not a product launch.

It is a public marker for an engineering exploration.

---

## What is the long-term vision?

The long-term vision is to explore whether humans and AI systems can build together through durable memory, evidence, constraints, replay and explicit human decision.

SCRIBE applies that idea first to AI-assisted software development.

The broader question is:

How should humans and AI build together when projects last longer than a single chat, a single pull request or a single agent session?

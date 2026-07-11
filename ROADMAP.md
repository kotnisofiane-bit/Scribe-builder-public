# Roadmap

SCRIBE is an ongoing engineering exploration.

This roadmap describes the current direction of the project.

It is not a delivery promise.

It is not a public launch plan.

It is a map of capabilities being explored while the private core remains protected.

---

## Current direction

SCRIBE begins with AI-assisted software development.

The current product direction is a hybrid model:

```text
Existing AI coding workflow
        ↓
SCRIBE Launcher / connector surface
        ↓
Private service boundary
        ↓
Private SCRIBE decision core
        ↓
Evidence, memory and Human GO surfaced for review
```

Public surfaces should remain thin and explainable.

Private logic remains private.

---

## Capability 1 — Decision memory

SCRIBE treats decision memory as a first-class component of AI-assisted development.

The project should remember:

- what was decided;
- why it was decided;
- what constraints existed;
- what evidence supported the decision;
- what changed afterward;
- what can be replayed later.

Conversation history is not enough.

---

## Capability 2 — Locked constraints and contracts

A proposed change needs boundaries.

SCRIBE explores ways to make constraints visible before an agent proposes, modifies or moves work forward.

This includes:

- allowed scope;
- forbidden areas;
- expected evidence;
- required checks;
- Human GO points;
- fail-closed conditions.

---

## Capability 3 — Evidence and replay

A serious project needs reviewable proof.

SCRIBE explores proof structures such as:

- summaries;
- diffs;
- hashes;
- verdicts;
- replay data;
- content-free evidence;
- sanitized exports.

The objective is not to expose sensitive implementation details.

The objective is to make reasoning and proof durable.

---

## Capability 4 — SCRIBE Launcher

SCRIBE Launcher is the first product surface being explored.

Its direction is to act as a thin guardrail / connector around existing AI coding workflows.

Depending on the host environment, future delivery forms may include a connector, plugin or MCP-compatible integration.

Current status:

- no public installation package;
- no stable public connector API;
- no public MCP server package;
- no commercial availability;
- private development only.

Launcher must not bypass memory, evidence or Human GO.

---

## Capability 5 — Eyes of SCRIBE

A governed system needs to be visible.

Eyes of SCRIBE is the cockpit / observation direction.

It should help users understand:

- what SCRIBE saw;
- what was checked;
- what was excluded;
- what evidence exists;
- what decision is required;
- what can be replayed.

The cockpit should reduce cognitive load.

It should not hide responsibility or pretend to be an autonomous authority.

---

## Capability 6 — Public scan and safe visibility

SCRIBE may explore public or read-only scan surfaces.

The goal is to inspect project context without exposing private logic or granting uncontrolled write access.

Any future public scan direction must remain clear about:

- what was inspected;
- what was not inspected;
- what evidence supports a claim;
- what remains uncertain;
- when Human GO is still required.

No sensitive project history, secrets, private rules or operational proof artifacts should be exposed.

---

## Capability 7 — Controlled integrations

Future integrations may connect SCRIBE to existing development workflows.

Possible forms may include:

- GitHub-facing review surfaces;
- AI coding assistant connectors;
- IDE-adjacent surfaces;
- plugin or MCP-compatible delivery forms;
- proof export workflows.

These are possible directions, not public availability claims.

Connectivity should not bypass memory, evidence or human decision.

---

## What is not planned now

The following are intentionally not current public commitments:

- commercial launch;
- public release of the private core;
- public install package;
- stable public API;
- autonomous agent marketplace;
- replacing developers;
- removing human decision points;
- publishing internal prompts, logs, journals, proofs or write mechanisms.

SCRIBE is still an exploration.

The current focus is correctness, clarity, proof, Human GO and protecting the public/private boundary.

---

## Summary

Technology can move quickly.

SCRIBE should evolve deliberately.

The project will continue to grow only where the public surface can remain honest, the private core can remain protected, and the decision path can remain bounded, evidenced and replayable.

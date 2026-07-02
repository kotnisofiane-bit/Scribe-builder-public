# Roadmap

SCRIBE Builder is an ongoing engineering exploration.

This roadmap describes the current direction of the project.

It is not a delivery promise.

It is a map of the problems being explored.

---

## Phase 1 — Clarify the protocol

The first objective is to clarify the governed collaboration protocol itself.

This includes:

- decision memory;
- execution contracts;
- role separation;
- evidence;
- replay;
- human decision points;
- fail-closed behavior.

The goal is to make the structure of the system understandable before exposing it as a product.

---

## Phase 2 — Build the private engine

The private engine implements the protocol.

Its focus is to test whether the governed loop can work in practice:

- AI roles produce bounded proposals;
- SCRIBE routes those proposals through governance;
- evidence is preserved;
- important decisions remain replayable;
- humans remain responsible for critical actions.

This work remains private while the system is still evolving.

---

## Phase 3 — Produce durable proof

A governed system must preserve what happened.

This phase focuses on proof structures such as:

- summaries;
- hashes;
- verdicts;
- replay data;
- content-free evidence;
- verifiable exports.

The objective is not to expose sensitive implementation details.

The objective is to make reasoning and proof durable.

---

## Phase 4 — Explore real-project boundaries

AI systems become more useful when they can work near real projects.

They also become riskier.

SCRIBE explores boundaries that allow a project to be analyzed, staged and governed without giving AI roles uncontrolled access to the original project.

The objective is controlled proximity.

Not uncontrolled autonomy.

---

## Phase 5 — Add advisory roles

Additional AI roles may help the process.

For example:

- an architect role;
- a coder role;
- an auditor role.

These roles remain bounded.

They do not become independent authorities.

No agent validates itself.

---

## Phase 6 — Build a human-facing cockpit

A governed system needs to be visible.

A future cockpit may help users understand:

- what is being proposed;
- what has changed;
- what evidence exists;
- what decision is required;
- what can be replayed.

The cockpit should reduce cognitive load.

It should not hide responsibility.

---

## Phase 7 — Connect with external tools

Future work may explore integration with external development tools.

This may include:

- GitHub;
- coding agents;
- local development environments;
- proof export workflows;
- controlled execution environments.

External integration must remain governed.

Connectivity should not bypass memory, evidence or human decision.

---

## What is not planned now

The following are intentionally not current priorities:

- commercial launch;
- hosted service;
- autonomous agent marketplace;
- public release of the private engine;
- replacing developers;
- removing human decision points.

SCRIBE is still an exploration.

The current focus is correctness, clarity and governance.

---

## Summary

Technology can move quickly.

Governance should evolve deliberately.

SCRIBE Builder will continue to grow only where the protocol becomes clearer, safer and more replayable.

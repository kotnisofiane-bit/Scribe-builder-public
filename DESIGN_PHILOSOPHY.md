# Design Philosophy

DUBSAR is designed around a practical question:

> How can AI-assisted work remain understandable and governable as a project grows across sessions, agents and tools?

The answer is not to rebuild the coding agent. It is to preserve the project layer around it.

---

## Start from the real host

Coding-agent hosts already provide intelligence, editing, tools, tests and execution environments.

DUBSAR should use those native capabilities rather than duplicate them. A host adapter stays thin, the local runtime handles bounded integration and the private Core owns governed project state.

Claude Code is the first supported host. Future adapters may connect Codex, Cursor and other environments to the same Core.

---

## Build around Missions and decisions

A conversation can produce useful ideas. A project evolves through decisions made within a continuing Mission.

DUBSAR therefore focuses on:

```text
Mission → Decision → Contract → Session → Proposal → Audit → Evidence → Human Gate → Result
```

The decision path is more durable than the current conversation window or host session.

---

## Keep responsibilities separate

- The coding-agent host interprets, proposes and acts through its native capabilities.
- The DUBSAR adapter exposes governed state inside that host.
- The local runtime connects the host to the private service.
- The Backend protects canonical writes.
- The Core owns Mission and governance state.
- Deterministic verifiers produce bounded verification.
- Humans decide protected movement.

No layer should quietly absorb another layer's authority.

---

## Prefer explicit boundaries

A lot or execution contract should make clear:

- the objective;
- allowed and forbidden scope;
- the applicable base or workspace;
- required evidence;
- relevant roles;
- session and runtime expectations;
- Human Gate conditions.

Boundaries do not make work correct. They make divergence reviewable.

---

## Evidence over confidence

Fluent explanations are useful but not sufficient.

DUBSAR distinguishes declarations from deterministic verification and keeps missing or invalid evidence visible. A tool or agent cannot promote its own statement to verified truth by adding a field or stronger wording.

---

## Reduce cognitive load

Governance should show the human what matters now:

- the active Mission;
- the current lot and next action;
- active sessions and their state;
- applicable decisions and constraints;
- evidence and its status;
- the decision required.

The product should not expose every internal event merely because it exists.

---

## Fail closed selectively

Protected movement should stop when required identity, scope, evidence or human approval is missing.

Harmless reads should not become unusable through indiscriminate blocking. Fail-closed behavior must protect meaningful boundaries rather than perform security theatre.

---

## Preserve local continuity, keep canonical authority private

Local state helps reconnect sessions, workspaces, processes and the cockpit.

Canonical Mission, decision, contract, session, evidence and Human Gate authority remains in the private Core. The adapter, Bridge and Desktop are not allowed to become accidental second business brains.

---

## Public first, internal rename later

The public product is DUBSAR.

Internal `scribe` identifiers may remain while compatibility depends on them. A controlled migration is preferable to a global rename that breaks commands, routes or stored state.

---

## Visible product progress

Internal tests, hashes and guardrails are necessary. They are not the whole product.

Each major iteration should produce a real user-visible capability in a supported host or the cockpit: start, resume, understand, review or decide.

---

## Summary

DUBSAR favors:

- Missions over isolated sessions;
- decisions over raw transcripts;
- contracts over implicit assumptions;
- evidence over confidence;
- replay over opacity;
- host adapters over provider lock-in;
- compatibility over cosmetic purity;
- human authority over autonomous approval;
- visible product value over endless internal validation.

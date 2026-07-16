# Design Philosophy

DUBSAR is designed around a practical question:

> How can AI-assisted work remain understandable and governable as a project grows across sessions?

The answer is not to rebuild the coding agent. It is to preserve the project layer around it.

---

## Start from the real host

Claude Code already provides intelligence, editing, tools, tests, sub-agents and worktrees.

DUBSAR should use those capabilities rather than duplicating them. The plugin stays thin, the local runtime handles bounded integration and the private Core owns governed project state.

---

## Build around Missions and decisions

A conversation can produce useful ideas. A project evolves through decisions made within a continuing Mission.

DUBSAR therefore focuses on:

```text
Mission → Decision → Contract → Proposal → Audit → Evidence → Human Gate → Result
```

The decision path is more durable than the current conversation window.

---

## Keep responsibilities separate

- Claude Code interprets, proposes and acts through its native tools.
- The plugin exposes DUBSAR inside Claude Code.
- The local runtime connects the host to the private service.
- The Core owns canonical Mission and governance state.
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

Local state helps reconnect sessions, workspaces and the cockpit.

Canonical Mission, decision, contract, evidence and Human Gate authority remains in the private Core. The bridge is not allowed to become an accidental second business brain.

---

## Public first, internal rename later

The public product is DUBSAR.

Internal `scribe` identifiers may remain while the beta depends on them. A controlled compatibility migration is preferable to a global rename that breaks commands, routes or stored state.

---

## Visible product progress

Internal tests, hashes and guardrails are necessary. They are not the whole product.

Each major iteration should produce a real user-visible capability in Claude Code or the cockpit: start, resume, understand, review or decide.

---

## Summary

DUBSAR favors:

- Missions over isolated sessions;
- decisions over raw transcripts;
- contracts over implicit assumptions;
- evidence over confidence;
- replay over opacity;
- compatibility over cosmetic purity;
- human authority over autonomous approval;
- visible product value over endless internal validation.

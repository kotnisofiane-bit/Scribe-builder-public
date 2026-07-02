# Architecture

SCRIBE Builder is not designed as a single autonomous agent.

It is designed as a governed coordination layer between human decisions and AI-assisted work.

The architecture is organized around one idea:

> Intelligence may produce proposals, but governance must structure how proposals become decisions.

---

## High-level loop

The core loop can be represented as:

```text
Human Intent
     ↓
Architect Role
     ↓
Execution Contract
     ↓
SCRIBE
     ↓
Coder Role
     ↓
Proposal
     ↓
SCRIBE
     ↓
Auditor Role
     ↓
Audit
     ↓
SCRIBE
     ↓
Human Decision
     ↓
Controlled Execution
     ↓
Evidence
     ↓
Replay
```

The exact implementation may evolve.

The principle remains stable:

No AI role validates itself.

---

## Main components

### Human

The human defines intent and remains responsible for critical decisions.

SCRIBE does not remove human responsibility.

It attempts to make that responsibility easier to exercise by making proposals, constraints and evidence visible.

### Architect role

The architect role frames the work.

It may help transform human intent into an execution contract.

Its purpose is not to execute.

Its purpose is to clarify objective, scope, constraints, risks, required evidence and approval point.

### Execution contract

An execution contract defines the boundaries of a task.

It describes what is allowed, what is forbidden, what evidence is required and when human approval is needed.

A contract does not make a proposal correct.

It makes the proposal governable.

### Coder role

The coder role proposes an implementation.

It may write, modify or suggest code depending on the controlled environment.

The coder does not approve its own work.

Its output must pass through the governed loop.

### Auditor role

The auditor role reviews a proposal.

It may identify risks, missing evidence, boundary violations or inconsistencies with the contract.

The auditor is advisory.

It does not become the final authority.

### SCRIBE

SCRIBE coordinates the interaction between roles.

It is responsible for the governed process:

- preserving decision memory;
- routing proposals through contracts;
- collecting evidence;
- enforcing approval points;
- supporting audit;
- enabling replay;
- failing closed when boundaries are unclear.

SCRIBE does not govern AI agents as personalities.

It governs the interactions between them.

---

## Decision memory

Decision memory is the persistent structure behind the loop.

It records meaningful project decisions rather than preserving every word of every conversation.

Decision memory helps the system answer questions such as:

- What was decided?
- Why was it decided?
- What evidence supported it?
- What constraints existed?
- What changed afterward?
- Can the decision path be replayed?

Without decision memory, long-running AI-assisted projects become fragile.

---

## Evidence

Evidence is the material that makes the process verifiable.

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

---

## Controlled execution

Controlled execution means that changes should not be applied blindly.

Before execution, the system should know:

- what is being executed;
- under which contract;
- with what approval;
- with what expected evidence;
- with what rollback or stop condition.

When conditions are not met, the system should fail closed.

---

## Replay

Replay is the ability to reconstruct the decision path later.

Replay does not require preserving every token of every interaction.

It requires preserving the meaningful sequence:

```text
Intent → Contract → Proposal → Audit → Evidence → Human Decision → Execution Result
```

Replay makes governance durable.

---

## Design boundary

This public repository documents the architecture at a conceptual level.

It does not expose:

- the private engine;
- internal audit logs;
- sealed journals;
- private prompts;
- confidential proof artifacts;
- evolving implementation details.

The goal of this document is to explain the structure of SCRIBE without publishing sensitive internals.

---

## Summary

SCRIBE Builder is a protocol of governed interactions.

It separates roles.

It preserves decision memory.

It routes proposals through contracts, audit, evidence and human decision.

It does not try to make AI agents autonomous authorities.

It tries to make AI-assisted development more reliable over time.

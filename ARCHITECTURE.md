# Architecture

DUBSAR is not a coding agent and not a replacement for coding agents.

It is a governance layer for long-running, multi-session AI coding projects.

> Coding agents may plan and act. Project movement remains bounded by Mission state, decisions, evidence and human authority.

---

## Host-independent product architecture

DUBSAR is designed around host adapters rather than a Core tied to one provider.

```text
Coding agent
    ↓
DUBSAR host adapter
    ↓
Local Bridge and runtime
    ↓
Private Backend
    ↓
Private DUBSAR Core
    ↓
Governed state returned to product surfaces
    ↓
Human decision when required
```

Claude Code is the first supported host. Codex, Cursor and other coding-agent integrations are future adapter directions, not currently available product claims.

---

## Current Claude Code architecture

```text
Claude Code
    ↓
DUBSAR plugin
    ↓
Local Bridge
    ↓
Private Backend
    ↓
Private DUBSAR Core
    ↓
Mission / sessions / contracts / decisions / evidence / Human Gates
    ↓
DUBSAR Desktop and cockpit
    ↓
Human decision
```

DUBSAR Desktop supplies the local runtime and human-facing product surface. It is not a separate product and it is not the canonical source of business state.

---

## Responsibility boundaries

### Coding agent host

The host remains responsible for its native capabilities, including where available:

- planning and reasoning;
- editing;
- tools;
- tests;
- sub-agents;
- worktrees;
- checkpoints and context management.

DUBSAR should configure, observe or govern these capabilities where necessary. It should not rebuild them without a clear governance reason.

### DUBSAR host adapter

The adapter is the entry point inside the coding-agent environment.

For Claude Code, this is the DUBSAR plugin.

Its responsibilities include:

- propagating the native session identity;
- exposing bounded DUBSAR commands and tools;
- projecting canonical state to the host;
- connecting the host to the local Bridge;
- surfacing the next governed action and Human Gate status.

The adapter remains thin:

- no proprietary Core logic;
- no independent canonical state;
- no secret handling through chat or command arguments;
- no independent Human GO generation.

### Local Bridge

The Bridge is a bounded local transport and orchestration layer.

It may:

- connect the host adapter to the local product runtime;
- maintain bounded local continuity references;
- transport closed requests and responses;
- support local lifecycle coordination.

It must not become the owner of Mission, contract, decision, evidence or Human Gate truth.

### Private Backend

The Backend is the protected product boundary and the only supported product writer to canonical Core state.

It is responsible for:

- authentication and authorization boundaries;
- schema and request validation;
- controlled access to private Core functions;
- runtime binding verification;
- projecting only the state required by product surfaces;
- rejecting stale or inconsistent mutations.

### Private DUBSAR Core

The Core is the canonical authority for governed project state:

- Projects and Missions;
- decision memory;
- lots and execution contracts;
- canonical DUBSAR sessions;
- runtime allocations and bindings;
- evidence relationships and verification tiers;
- audit state;
- Human Gates and single-use authorizations;
- deterministic resume, replay and reconciliation decisions.

The Core is private and is not distributed through this public repository.

### Runner

The Runner is the mechanical evidence authority for bounded execution artifacts such as:

- snapshots;
- diffs;
- test results;
- hashes;
- execution artefact references.

It does not own Mission state and does not create Human GO.

### DUBSAR Desktop and cockpit

Desktop provides the local runtime and operator-facing controls.

The cockpit displays governed state and evidence available to the human. It may trigger bounded product actions through the Backend, but it does not fabricate canonical state or approve itself.

---

## Canonical session model

A governed session links distinct identities rather than collapsing them into one ambiguous "session" value.

A canonical relationship may include:

```text
dubsar_session_id
  ↔ native host session id
  ↔ Mission
  ↔ lot and contract
  ↔ runtime allocation
  ↔ worktree binding
  ↔ base SHA
  ↔ process identity
  ↔ session revision and Mission head
```

The Core mints the canonical DUBSAR session identity. Native host identities, local transport references and operating-system process identities remain distinct but linked.

No product path should use a generic `default` identity for real multi-session work.

---

## Multi-session governance

Two sessions on one Mission must share governed project state without sharing execution identity.

```text
Canonical Mission
  ├── Session A
  │     ├── lot / contract A
  │     ├── worktree A
  │     ├── process A
  │     └── evidence A
  │
  └── Session B
        ├── lot / contract B
        ├── worktree B
        ├── process B
        └── evidence B
```

Required properties include:

- distinct native and DUBSAR session identities;
- distinct runtime allocations and worktrees;
- shared canonical Mission and decisions;
- revision and head checks before mutation;
- explicit conflict detection;
- no silent last-writer-wins behavior;
- separated journals and evidence;
- shared Human Gate when a protected conflict or movement requires it;
- honest restart reconciliation.

Internal Windows technical proofs have validated governed one-session and two-session execution. Public product reproducibility remains under validation.

---

## Governed project path

```text
Mission
  → applicable decisions and constraints
  → bounded lot and contract
  → canonical session and runtime binding
  → agent proposal or execution
  → mechanical evidence and audit
  → Human Gate when required
  → result and replay
```

An agent report is an assertion. It does not become verified evidence because the report says that work passed.

A Human Gate is a separate authenticated human decision. It cannot be inferred from agent wording, a green check or a client-provided flag.

---

## Evidence model

DUBSAR distinguishes at least:

- **DECLARED** — asserted by an agent, tool or user;
- **VERIFIED** — checked by an identified deterministic verifier;
- **MISSING** — expected evidence was not supplied;
- **INVALID** — malformed, inconsistent or tampered evidence.

Public documentation describes these guarantees without publishing the private enforcement mechanisms.

---

## Concurrency and integrity

Protected mutations should be bound to the canonical state they were prepared from.

Relevant mechanisms include:

- expected revision checks;
- Mission and lot heads;
- base SHA commitments;
- content hashes;
- idempotency keys;
- single-use authorization nonces;
- stale-write rejection;
- explicit divergence states;
- fail-closed reconciliation.

A stale session must not silently overwrite newer canonical state.

---

## Distribution architecture

This public repository is intended to host:

- product documentation;
- Marketplace metadata;
- thin public host-adapter packages;
- security, privacy, licence and changelog material.

It must not host:

- the private Core;
- private Backend source;
- internal audit histories or sealed journals;
- private prompts or policies;
- confidential proof artifacts;
- secrets, tokens or trust material;
- private tester data.

The Marketplace is not activated or announced.

---

## Compatibility boundary

The public product is DUBSAR.

Internal technical identifiers may remain temporarily in:

- private repository names;
- routes and schema identifiers;
- component and token names;
- MCP server and command identifiers;
- environment variables;
- local storage paths.

They must be migrated only through deliberate compatibility plans, not global search-and-replace changes.

---

## Summary

Coding agents act. DUBSAR remembers the Mission, governs canonical sessions, links evidence and keeps Human Gates explicit. The private Core remains the source of truth. Humans remain the final authority.

# Architecture

DUBSAR is not a coding agent and not a replacement for Claude Code.

It is a governance layer around long-running AI-assisted software projects.

> Intelligence may produce proposals. Project movement remains bounded by memory, evidence and human decision.

---

## Public architecture

```text
Claude Code
    ↓
DUBSAR plugin
    ↓
DUBSAR Desktop / local bridge
    ↓
Private service boundary
    ↓
Private DUBSAR Core
    ↓
Governed state returned to the plugin and cockpit
    ↓
Human decision when required
```

This is the product architecture for the first private beta.

It replaces the older public framing built around a speculative “Scribe Launcher”. Launcher code may still exist internally, but Launcher is no longer a separate public product.

---

## Responsibility boundaries

### Claude Code

Claude Code remains responsible for its native intelligence and execution environment, including planning, editing, tools, tests, sub-agents and worktrees.

DUBSAR should not rebuild those capabilities.

### DUBSAR plugin

The plugin is the Claude Code entry point.

It exposes bounded commands and tools, projects canonical state to the user and connects to the local runtime. It remains thin:

- no proprietary Core logic;
- no direct authority over canonical decisions;
- no secret handling through chat or command arguments;
- no independent Human GO generation.

### DUBSAR Desktop / local bridge

The local runtime supports process startup, workspace continuity, secure local state, bounded transport and access to the cockpit.

It may retain internal `scribe` executable, MCP, route or token names while compatibility migration is pending.

It is not the canonical source of Mission, decision, contract, evidence or Human Gate truth.

### Private service boundary

The service boundary mediates access to the private Core.

It validates and limits requests, protects private implementation details and projects only the state required by the supported public surfaces.

### Private DUBSAR Core

The Core is the canonical authority for governed project state:

- Projects and Missions;
- decision memory;
- lots and execution contracts;
- evidence relationships and verification tiers;
- audit state;
- Human Gates;
- deterministic resume and replay.

The Core is private and is not distributed through the Marketplace repository.

### Cockpit

The cockpit displays the governed state and the evidence available to the human.

It does not become an approval authority. Its purpose is to make responsibility easier to exercise.

---

## Governed project path

```text
Mission
  → applicable decisions and constraints
  → bounded lot and contract
  → agent proposal or execution report
  → evidence and audit
  → Human Gate when required
  → result and replay
```

A report produced by an agent is an assertion. It does not become verified evidence simply because the report says that work passed.

A Human Gate is a separate authenticated human decision. It cannot be inferred from agent wording or a green status.

---

## Decision memory

Decision memory preserves what the project depends on:

- what was decided;
- why it was decided;
- which constraints are active;
- what replaced an earlier decision;
- which evidence supported the change;
- which human decision authorized protected movement;
- how the path can be replayed.

It is not a raw transcript archive.

---

## Evidence model

DUBSAR distinguishes at least:

- **DECLARED** — asserted by an agent, tool or user;
- **VERIFIED** — checked by an identified deterministic verifier;
- **MISSING** — expected evidence was not supplied;
- **INVALID** — malformed, inconsistent or tampered evidence.

Public documentation describes the distinction without publishing the private enforcement mechanisms.

---

## Human control

DUBSAR does not require human approval for every harmless read.

A Human Gate is used when movement crosses a protected boundary such as merge, release, deployment, sensitive scope, locked constraints or other irreversible action.

The system may prepare a review packet and show the relevant evidence. The decision remains human.

---

## Distribution architecture

This public repository is intended to host:

- product documentation;
- Marketplace metadata;
- the thin public Claude Code plugin package;
- security, privacy, licence and changelog material.

It must not host:

- the private Core;
- private backend source;
- internal audit histories or sealed journals;
- private prompts or policies;
- confidential proof artifacts;
- secrets, tokens or trust material;
- private tester data.

The Marketplace package is not published yet.

---

## Compatibility boundary

The transition from SCRIBE to DUBSAR begins at public surfaces.

Internal names may remain temporarily in:

- repository URLs;
- routes and schema identifiers;
- component and token names;
- MCP server and command identifiers;
- local storage paths.

They should be migrated only through deliberate compatibility plans, not global search-and-replace changes.

---

## Summary

Claude Code acts. DUBSAR remembers the Mission, checks the governed state, links evidence and keeps Human Gates explicit. The private Core remains the source of truth. Humans remain the final authority.

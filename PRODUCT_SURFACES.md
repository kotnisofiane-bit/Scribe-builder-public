# Product and Surfaces

DUBSAR is one product with several technical surfaces.

The user should not have to understand a collection of brands, launchers or private repositories. The public product is **DUBSAR**.

---

## Product definition

DUBSAR is a governance layer for long-running, multi-session AI coding projects.

It adds a persistent project layer around coding agents without rebuilding their native capabilities.

```text
Coding agents build
DUBSAR preserves Mission, decisions, boundaries and evidence
Humans decide protected movement
```

Claude Code is the first supported host. Codex, Cursor and other adapters are future product direction, not currently available integrations.

---

## 1. Host adapter

A host adapter connects a coding-agent environment to DUBSAR.

For Claude Code, the adapter is the DUBSAR plugin.

Its role is to:

- propagate the native host session identity;
- expose bounded DUBSAR commands and tools;
- recognize or resume governed workspace context;
- display bounded canonical project state;
- connect the host to the local DUBSAR runtime;
- surface the next action and Human Gate status.

The adapter remains thin. It does not contain the proprietary decision engine and does not make canonical business decisions locally.

Some command, MCP and environment identifiers may temporarily retain an internal `scribe` prefix for compatibility. Public labels and documentation use DUBSAR.

---

## 2. Local Bridge

The Bridge provides bounded local transport between the host adapter and the local product runtime.

It may support:

- local continuity references;
- closed request and response transport;
- start and status orchestration;
- session-to-runtime connectivity.

The Bridge is not the source of truth for Mission, decisions, contracts, evidence or Human Gates.

---

## 3. DUBSAR Desktop and local runtime

DUBSAR Desktop supplies the local runtime required by the current Claude Code integration.

Its responsibilities include:

- bounded local process startup;
- process identity and lifecycle control;
- worktree provisioning through governed references;
- restart observations and reconciliation requests;
- secure local configuration and access state;
- navigation to the cockpit and Human Gate surfaces.

Desktop is not marketed as a separate product and is not the proprietary Core.

The legacy term “Launcher” no longer describes a public product. Internal launcher components may remain where changing them would break compatibility.

---

## 4. Private Backend

The Backend is the protected service boundary and the only supported product writer to canonical Core state.

It validates and limits requests, verifies runtime bindings, rejects stale mutations and protects private implementation details.

The Backend is not distributed through this repository.

---

## 5. Private DUBSAR Core

The Core is the source of truth for governed project state, including:

- Mission;
- decisions and constraints;
- lots and execution contracts;
- canonical DUBSAR sessions;
- runtime allocations and process state;
- evidence relationships and verification tiers;
- audit state;
- Human Gates and authorizations;
- replay and reconciliation decisions.

The Core remains private.

---

## 6. Runner

The Runner produces bounded mechanical evidence such as:

- snapshots;
- diffs;
- test results;
- hashes;
- execution artefact references.

It does not own Mission state and cannot create a Human GO.

---

## 7. DUBSAR cockpit

The cockpit makes governed state readable to the human.

It is intended to show:

- the recognized project and active Mission;
- active sessions and their state;
- lots, contracts and worktrees;
- relevant decisions and constraints;
- declared and verified evidence without conflating them;
- conflicts and stale state;
- pending Human Gates;
- bounded diagnostics and availability state.

The cockpit displays and controls through governed boundaries. It does not become the authority that approves its own state.

The former public label “Eyes of SCRIBE” is historical and should not remain a separate product brand.

---

## 8. Multi-session surface

DUBSAR relates several active sessions to one Mission while preserving isolation.

```text
Mission
  ├── Session A → Worktree A → Process A → Evidence A
  └── Session B → Worktree B → Process B → Evidence B
                 ↓
          Conflict / Human Gate when required
```

Internal technical proofs have validated this model on Windows. The public product journey remains under validation.

---

## Public distribution

This repository is intended to become both:

- the public product and doctrine repository;
- the Claude Code Marketplace repository for the thin first host adapter.

The Marketplace is not activated or announced. No installation command should be treated as active until the package, supported platform, licence, security contacts and beta access flow are validated.

---

## Platform boundary

- **Windows:** first controlled private-beta target, still in preparation.
- **Linux:** planned for later validation; not announced.
- **macOS:** not announced; feasibility and packaging remain to be evaluated.

---

## Current beta boundary

The current private-beta preparation covers:

- Claude Code as the first host;
- the DUBSAR plugin;
- local Bridge and DUBSAR Desktop;
- a private Backend and Core;
- Mission continuity;
- canonical one- and multi-session governance;
- explicit Human Gates.

Not currently claimed as available:

- operational Codex or Cursor adapters;
- public Linux or macOS packages;
- enterprise on-premise deployment;
- certified compliance or security guarantees;
- autonomous approval or release authority;
- a commercial-ready public service.

---

## Summary

DUBSAR is one product.

The host adapter connects the coding agent. The Bridge transports locally. Desktop supplies the runtime. The Backend protects canonical writes. The Core owns governed state. The Runner produces mechanical evidence. The cockpit makes the state understandable. Humans remain the final authority.

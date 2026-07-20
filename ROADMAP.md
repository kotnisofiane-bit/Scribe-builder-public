# Roadmap

This roadmap describes the current direction of DUBSAR. It is not a delivery guarantee.

The immediate goal is a reproducible controlled private beta, beginning with Windows and Claude Code.

DUBSAR is not defined by one host. Claude Code is the first integration of a broader host-adapter architecture.

---

## Product path

```text
Coding agent
  → DUBSAR host adapter
  → local DUBSAR runtime
  → private Backend
  → private Core
  → Mission, decisions, evidence and Human Gates
```

The public repository will contain documentation and thin distributable adapters. The proprietary Core remains private.

---

## 1. Public DUBSAR realignment

Current work:

- remove SCRIBE / Scribe Builder / Launcher as public product brands;
- align the repository, website, plugin copy and Desktop around DUBSAR;
- preserve internal `scribe` identifiers only where immediate renaming would break compatibility;
- maintain one public repository for doctrine and Marketplace distribution;
- keep Marketplace publication behind a separate Human GO.

---

## 2. Internally proven technical substrate

The following capabilities have completed internal technical validation on Windows:

- one real governed Claude Code session;
- two real sessions linked to the same canonical Mission;
- distinct session identities, processes and worktrees;
- shared governed state with separated evidence;
- explicit conflict handling without silent overwrite;
- authenticated Human Gates and single-use authorization behavior;
- individual process control;
- restart and reconciliation without phantom running state.

This substrate is not the same as an externally usable beta. It is the technical basis for the next product-validation stage.

---

## 3. Reproducible Windows private beta

The next outcome is a tester journey that does not depend on historical local checkouts or an expert operator.

Required outcomes:

- deterministic Windows package assembly;
- clean installation, update and removal;
- automatic location of the correct local components;
- one supported start path;
- workspace recognition;
- Mission creation or resumption;
- clear state, evidence and Human Gate presentation;
- bounded diagnostics and recoverable errors;
- preserved user data across update or reinstall;
- no hidden manual repair step.

The Windows private beta remains in preparation until this path is repeatable.

---

## 4. Controlled tester validation

After the Windows journey is reproducible, a small controlled tester group should validate whether users can:

- install DUBSAR;
- start it from the supported Claude Code flow;
- recognize or attach a workspace;
- create or resume a Mission;
- understand the current governed state;
- complete a bounded governed task;
- understand failures and next actions;
- provide actionable feedback without exposing secrets.

Success is not the absence of all bugs. It is a repeatable, understandable and governable product journey.

---

## 5. Linux validation

Linux is the next likely platform after Windows stabilizes.

Validation must cover:

- packaging and installation;
- process identity and lifecycle;
- local paths and permissions;
- Claude Code compatibility;
- Desktop/runtime behavior;
- clean update and removal;
- the same governed Mission journey.

No Linux beta is announced until a real package and user journey are proven.

---

## 6. macOS evaluation

macOS is not currently announced.

Before any support claim, the project must evaluate:

- packaging;
- signing and notarization requirements;
- permissions and secure storage;
- process and worktree behavior;
- Claude Code integration;
- update and removal;
- tester experience.

macOS should not block a validated Windows beta merely for nominal platform parity if the implementation cost is materially different.

---

## 7. Host-adapter contract

The Core governance model should remain independent of any single coding agent.

A reusable host-adapter contract should define how an integration supplies or receives:

- native session identity;
- workspace identity;
- process and worktree bindings;
- Mission and contract context;
- evidence references;
- Human Gate state;
- restart and reconciliation events.

The adapter must remain thin and must not duplicate Core authority.

---

## 8. Additional coding-agent integrations

After the Claude Code beta is coherent, DUBSAR may evaluate adapters for:

- Codex;
- Cursor;
- other compatible coding-agent environments.

These integrations should reuse the same Mission, decisions, contracts, evidence and Human Gates. They should not create separate product brains.

No operational support is currently claimed.

---

## 9. Broader product direction

Possible later work includes:

- richer team and organization controls;
- broader cross-host project continuity;
- expanded evidence and audit workflows;
- enterprise deployment models;
- additional controlled integrations.

These are future directions, not current beta promises.

---

## Explicitly out of scope for the current public claim

- autonomous approval, merge or deployment;
- public release of the proprietary Core;
- certified legal, security or compliance guarantees;
- production-ready enterprise service;
- operational Codex or Cursor support;
- commercial availability.

---

## Current status

```text
Windows private beta: in preparation
Linux: planned for later validation
macOS: not announced
Claude Code: first integration
other host adapters: future direction
marketplace: not published
not commercial-ready
not beta-ready
not marketplace-ready
```

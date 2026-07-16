# Roadmap

This roadmap describes the current direction of DUBSAR. It is not a delivery guarantee.

The immediate goal is a testable private beta for Claude Code, not a general platform and not a collection of speculative product surfaces.

---

## Current product path

```text
Claude Code
  → DUBSAR plugin
  → DUBSAR Desktop / local runtime
  → private service boundary
  → private Core
  → governed project state and human decisions
```

The public repository will contain the documentation and thin Marketplace package. The proprietary Core remains private.

---

## 1. Public product realignment

- replace the legacy SCRIBE / Builder / Launcher story with DUBSAR;
- align the website, plugin documentation and public repository;
- preserve internal `scribe` identifiers where immediate renaming would break compatibility;
- maintain one public repository for both doctrine and Marketplace distribution;
- keep the Marketplace unpublished until the package and licence are approved.

---

## 2. Private beta packaging

A tester should be able to install the supported Desktop/runtime and Claude Code plugin without understanding the internal repository architecture.

Required outcomes:

- deterministic package assembly;
- clean installation and removal;
- bounded diagnostics;
- runtime version compatibility;
- no secrets in plugin files or logs;
- honest failure when Desktop or the private service is unavailable.

---

## 3. Unified start and Mission continuity

From Claude Code, the user should enter DUBSAR through one clear start flow.

The product should:

- recognize the workspace;
- resume an existing Mission or propose creating one;
- recover after restart and context compaction;
- show the active lot and next action;
- open or link to the local cockpit;
- expose access and component status without leaking secrets.

---

## 4. Decision memory and governed lots

DUBSAR should preserve:

- decisions and their reasons;
- active and replaced constraints;
- Mission and lot identity;
- execution contracts;
- relevant evidence;
- audit and Human Gate state;
- replayable transitions.

Conversation history remains useful but is not the canonical project memory.

---

## 5. Evidence, audit and Human Gates

The beta must distinguish:

- agent declarations;
- deterministic verification;
- missing or invalid evidence;
- audit findings;
- human decisions.

No agent report becomes proof by wording alone. No AI role creates a Human GO.

The cockpit and plugin should make these distinctions visible without overwhelming the user.

---

## 6. Controlled tester beta

The first external beta should begin with a small number of testers and real projects of bounded risk.

Success is not measured by the absence of all bugs. It is measured by whether testers can:

- install the product;
- start it from Claude Code;
- resume a Mission;
- understand the current governed state;
- see failures and next actions clearly;
- provide actionable feedback.

---

## 7. Broader adapters

Only after the Claude Code beta is coherent should DUBSAR evaluate adapters for Codex, Cursor or other environments.

Those adapters should reuse the same Core concepts rather than duplicating product logic in each host.

---

## 8. Multi-session and enterprise direction

Possible later work includes:

- coordinated parallel sessions or worktrees;
- stronger team roles and organization controls;
- enterprise deployment models;
- expanded review and audit workflows;
- additional controlled integrations.

These are future directions, not current beta promises.

---

## Explicitly out of scope for the current public claim

- autonomous approval, merge or deployment;
- a public release of the proprietary Core;
- certified legal, security or compliance guarantees;
- production-ready enterprise service;
- general autonomous multi-agent orchestration;
- operational Codex or Cursor support;
- commercial availability.

---

## Current status

```text
private beta in preparation
marketplace not published
not commercial-ready
```

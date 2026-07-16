# Product and Surfaces

DUBSAR is one product with several technical surfaces.

The user should not have to understand a collection of brands, launchers or internal repositories. The public product is **DUBSAR**.

---

## Product definition

DUBSAR is decision memory and human governance for long-running Claude Code projects.

It adds a persistent project layer around Claude Code without rebuilding Claude Code's native capabilities.

```text
Claude Code builds
DUBSAR preserves Mission, decisions, constraints and evidence
Humans decide
```

The first supported environment is Claude Code. Other adapters may come later, but they are not part of the current beta claim.

---

## 1. Claude Code plugin

The plugin is the user's primary entry point.

Its role is to:

- expose DUBSAR commands and tools inside Claude Code;
- recognize or resume the governed workspace context;
- display bounded project state;
- connect Claude Code to the local DUBSAR runtime;
- surface the next action and Human Gate status.

The plugin remains thin. It does not contain the proprietary decision engine and it does not make business decisions locally.

Some command, MCP and token identifiers may temporarily retain the internal `scribe` prefix for compatibility. Public messages and documentation use DUBSAR.

---

## 2. DUBSAR Desktop and local runtime

DUBSAR Desktop supplies the local runtime required by the plugin.

Its responsibilities include bounded local process startup, workspace continuity, secure local state and access to the cockpit.

It is not marketed as a separate product and it is not the proprietary Core.

The legacy term “Launcher” no longer describes the public product. Existing internal launcher components may remain temporarily where changing them would break compatibility.

---

## 3. DUBSAR cockpit

The cockpit makes the governed state readable.

It is intended to show, at minimum:

- the recognized project and active Mission;
- the active lot or next action;
- relevant decisions and constraints;
- declared and verified evidence without conflating them;
- pending Human Gates;
- bounded diagnostics and availability state.

The cockpit displays and explains. It does not become the authority that approves its own state.

---

## 4. Private service boundary

The service boundary separates distributable surfaces from the proprietary Core.

It mediates sanitized and bounded requests while keeping private:

- decision logic;
- private schemas and policies;
- internal audit histories;
- sealed journals and confidential proof artifacts;
- operational trust material;
- secrets and tester data.

The plugin and Desktop must never become a disguised copy of the private Core.

---

## 5. Private DUBSAR Core

The Core is the source of truth for governed project state, including Mission, lots, contracts, decisions, evidence relationships, audit state, Human Gates and replay.

The Core is private and is not distributed from this repository.

Public documentation can describe the concepts and user-visible guarantees without publishing the proprietary mechanisms that enforce them.

---

## Public distribution

This repository is intended to become both:

- the public product and doctrine repository;
- the Claude Code Marketplace repository for the thin plugin package.

The Marketplace package is not published yet. No installation command should be treated as active until the package, licence, security contact and beta access flow are validated.

See [Marketplace and distribution](MARKETPLACE.md).

---

## Current beta boundary

The private beta is being prepared around:

- Claude Code;
- the DUBSAR plugin;
- DUBSAR Desktop/local runtime;
- a private service boundary and Core;
- Mission continuity;
- read-only governed state and bounded mutations;
- explicit Human Gates.

Not currently claimed as available:

- general multi-agent orchestration;
- operational Codex or Cursor adapters;
- enterprise on-premise deployment;
- certified compliance or security guarantees;
- autonomous approval or release authority;
- a commercial-ready public service.

---

## Summary

DUBSAR is one product.

The plugin is the entry point. Desktop supplies the local runtime. The cockpit displays governed state. The private service boundary protects the private Core. Humans remain the final authority.

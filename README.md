# DUBSAR

**Decision memory and human governance for long-running Claude Code projects.**

Claude Code builds.  
DUBSAR preserves decisions, constraints and evidence.  
Humans decide.

**Plugin-first private beta · Private core · not commercial-ready**

---

## What is DUBSAR?

DUBSAR is a governance layer for software projects that continue across many AI coding sessions.

It does not replace Claude Code and it is not another coding agent. Claude Code keeps the intelligence, editing, tools and execution environment. DUBSAR adds a durable project layer around that work:

- a persistent Mission;
- decision memory;
- bounded lots and execution contracts;
- evidence linked to proposed changes;
- replay across sessions;
- explicit Human Gates for protected movement.

The problem is not that AI coding tools cannot produce code. The problem is that long-running projects can lose the decisions, boundaries and proof that make the code coherent.

---

## The private beta product

The first DUBSAR product is a **Claude Code plugin supported by DUBSAR Desktop and a private Core**.

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
Mission, decisions, contracts, evidence and Human Gates
```

The user experiences one product: **DUBSAR**.

DUBSAR Desktop is the local runtime required by the plugin. It is not a separate commercial product. The proprietary decision logic remains in the private Core and is not distributed in this repository.

---

## What the beta is designed to do

The private beta is being prepared to support:

- installation of the DUBSAR Claude Code plugin;
- a unified start flow from Claude Code;
- workspace recognition;
- creation or resumption of a persistent Mission;
- continuity after restart or context compaction;
- read-only visibility over lots, contracts, executions and evidence;
- a local cockpit for project state;
- explicit Human Gate status;
- bounded diagnostics when a component is unavailable.

Availability and exact installation instructions will be published only after the package, licence and beta access flow are validated.

---

## What DUBSAR does not do

DUBSAR does not:

- replace Claude Code or the developer;
- generate code as an independent agent;
- make an AI system the final authority;
- treat an agent report as proof by itself;
- silently approve merges, releases or deployments;
- publish the private Core;
- guarantee bug-free code, compliance or security.

Agents propose. DUBSAR checks the governed project state. Humans decide.

---

## One public repository

This repository is being transformed into the single public home of DUBSAR.

It is intended to contain both:

1. public product documentation and doctrine;
2. the public Claude Code Marketplace package when the beta package is ready.

There will not be a separate public doctrine repository and a second public Marketplace repository.

The current GitHub repository name and URL still contain the legacy `Scribe-builder-public` identifier. That identifier is temporarily preserved to avoid an irreversible repository rename during this review. It is not the public product name.

See [Marketplace and distribution](MARKETPLACE.md) for the publication boundary.

---

## Public / private boundary

This repository may publish:

- public positioning and principles;
- installation and user documentation;
- the thin Claude Code plugin runtime;
- Marketplace metadata;
- public security and privacy policies;
- changelogs and bounded examples.

It does not publish:

- the private Core or proprietary decision logic;
- backend implementation details;
- private prompts or policies;
- internal audit histories or sealed journals;
- confidential proof artifacts;
- secrets, tokens or trust material;
- private user or tester data.

Internal compatibility identifiers may continue to use `scribe` temporarily in repository names, routes, commands, tokens or MCP component names. Their presence does not change the public DUBSAR brand and avoids breaking the current beta runtime.

---

## Project grammar

DUBSAR is built around a durable decision path:

```text
Mission
  → Decision memory
  → Locked constraints
  → Agent proposal
  → Audit and evidence
  → Human Gate
  → Result and replay
```

Conversation history is useful, but it is not a governed project memory. DUBSAR preserves what the project depends on rather than every word of every conversation.

---

## Documentation

Start here:

1. [Why DUBSAR?](WHY_SCRIBE.md)
2. [Product and surfaces](PRODUCT_SURFACES.md)
3. [Architecture](ARCHITECTURE.md)
4. [Current status](STATUS.md)
5. [Marketplace and distribution](MARKETPLACE.md)
6. [FAQ](FAQ.md)
7. [Roadmap](ROADMAP.md)

Core doctrine:

- [Principles](PRINCIPLES.md)
- [Decision memory](DECISION_MEMORY.md)
- [Design philosophy](DESIGN_PHILOSOPHY.md)
- [Why not just agents?](WHY_NOT_JUST_AGENTS.md)
- [Manifesto](MANIFESTO.md)

Older diagrams, RFCs and examples are being reviewed during the brand and product transition. Material that still uses SCRIBE or Builder terminology should be treated as legacy until explicitly migrated.

---

## Current status

- DUBSAR private beta packaging is in preparation.
- The Marketplace package is **not published**.
- No public release or production deployment is available.
- The repository rename has not been performed.
- The Core remains private.
- DUBSAR is **not commercial-ready**.

The project accepts ordinary beta bugs. It does not accept false claims of proof, verification or human approval.

---

## Created by

Created by Sofiane Kotni.

Product site: [dubsar.ai](https://dubsar.ai)

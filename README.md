# DUBSAR

**Govern long-running AI development. Keep human authority.**

DUBSAR is a governance layer for software projects that continue across many AI coding sessions.

Coding agents build.  
DUBSAR preserves the Mission, decisions, boundaries and evidence.  
Humans retain final authority.

**Controlled private beta in preparation · Windows first · Private Core**

---

## What is DUBSAR?

AI coding agents can plan, edit, test and move quickly. Long-running projects face a different problem: continuity and authority.

Across sessions, a project can lose:

- prior decisions and their reasons;
- active constraints;
- the scope of current work;
- the distinction between a declaration and verified evidence;
- pending Human Gates;
- the path required to resume safely.

DUBSAR adds a durable governed project layer around existing coding agents:

- a persistent Mission;
- decision memory;
- bounded lots and execution contracts;
- canonical session identity;
- evidence linked to work and decisions;
- replay across sessions;
- explicit Human Gates for protected movement.

DUBSAR is not another coding agent and does not replace the developer.

---

## First integration: Claude Code

DUBSAR is designed around host-specific adapters rather than a Core tied to one coding agent.

```text
Coding agent
    ↓
DUBSAR host adapter
    ↓
Local DUBSAR runtime
    ↓
Private Backend
    ↓
Private DUBSAR Core
    ↓
Mission, decisions, evidence and Human Gates
    ↓
Human-facing cockpit and decision
```

The first supported integration is Claude Code:

```text
Claude Code
    ↓
DUBSAR plugin
    ↓
Local Bridge and DUBSAR Desktop
    ↓
Private Backend
    ↓
Private DUBSAR Core
```

Claude Code keeps its native intelligence, editing, tools, tests, sub-agents and worktrees. DUBSAR governs the project state around that work.

Additional host adapters, including Codex, Cursor and other coding-agent environments, are part of the product direction. They are not currently available integrations.

---

## Multi-session governance

DUBSAR is intended for projects that outlive one chat, one process or one agent session.

Its governed model relates:

```text
Mission
  → decisions and constraints
  → lots and contracts
  → canonical sessions
  → isolated worktrees and processes
  → evidence and audit
  → Human Gates
  → result and replay
```

Internal technical validation has completed governed one-session and two-session execution on a real Windows environment, including distinct identities, isolated worktrees, explicit conflict handling, Human Gates and restart reconciliation.

This is an internal technical proof, not a claim that the public beta is available. External installation and usability validation are still in progress.

---

## What DUBSAR does not do

DUBSAR does not:

- replace the coding agent or the developer;
- make an AI system the final authority;
- treat an agent report as proof by itself;
- silently approve merges, releases or deployments;
- rebuild native agent capabilities without a governance reason;
- publish the private Core;
- guarantee bug-free code, compliance or security.

A Human Gate is a separate authenticated human decision. It cannot be inferred from agent wording or a green status.

---

## Platform status

### Windows

Windows is the first target for the controlled private beta. Packaging, installation and the governed product journey are still being finalized and validated.

### Linux

Linux validation is planned after the Windows path is stable. No Linux beta is currently announced.

### macOS

macOS support is not currently announced. Feasibility, packaging, signing and runtime behavior must be evaluated before any claim is made.

---

## One public repository

This repository is being transformed into the single public home of DUBSAR. It is intended to contain:

1. public product documentation and doctrine;
2. the thin distributable host adapter for Claude Code;
3. Claude Code Marketplace metadata when publication is authorized;
4. public security, privacy, installation and release information.

The current repository name still contains the legacy `Scribe-builder-public` identifier. The product described here is DUBSAR. Repository renaming is a separate human action and has not been performed.

---

## Public / private boundary

This repository may publish:

- public positioning and architecture;
- installation and user documentation;
- the thin Claude Code plugin runtime;
- Marketplace metadata;
- public security and privacy policies;
- changelogs and bounded examples.

It does not publish:

- the proprietary DUBSAR Core;
- private Backend implementation details;
- internal prompts or policies;
- internal audit histories or sealed journals;
- confidential proof artifacts;
- secrets, tokens or trust material;
- private user or tester data.

---

## Compatibility identifiers

The public product name is DUBSAR.

Some internal technical identifiers may temporarily retain `scribe` names, including repository names, routes, command names, MCP identifiers, environment variables and local storage paths. They are compatibility identifiers, not a second product or public brand.

They will be migrated only through deliberate compatibility work, never by an untested global rename.

---

## Documentation

Start here:

1. [Why DUBSAR?](WHY_DUBSAR.md)
2. [Product and surfaces](PRODUCT_SURFACES.md)
3. [Architecture](ARCHITECTURE.md)
4. [Current status](STATUS.md)
5. [Marketplace and distribution](MARKETPLACE.md)
6. [Installation](INSTALLATION.md)
7. [FAQ](FAQ.md)
8. [Roadmap](ROADMAP.md)

Core doctrine:

- [Principles](PRINCIPLES.md)
- [Decision memory](DECISION_MEMORY.md)
- [Design philosophy](DESIGN_PHILOSOPHY.md)
- [Why not just agents?](WHY_NOT_JUST_AGENTS.md)
- [Manifesto](MANIFESTO.md)

Older diagrams, RFCs and examples created under SCRIBE / Scribe Builder remain historical until individually migrated or archived.

---

## Current status

```text
Windows controlled private beta: in preparation
public Marketplace: not activated or announced
supported public installation: none yet
Claude Code: first integration
Codex / Cursor / other adapters: future direction, not currently available
not commercial-ready
not beta-ready
not marketplace-ready
```

The project accepts ordinary beta bugs. It does not accept false claims of proof, verification or human approval.

---

## Created by

Created by Sofiane Kotni.

Product site: [dubsar.ai](https://dubsar.ai)

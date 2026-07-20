# Status

DUBSAR is an active engineering project preparing a controlled private beta.

It is **not commercial-ready, not beta-ready and not marketplace-ready**.

---

## Current product definition

DUBSAR is a governance layer for long-running, multi-session AI coding projects.

The Core is not tied to one coding agent. Host-specific adapters connect coding environments to the same governed Mission, decision memory, evidence model and Human Gates.

```text
Coding agent
  → DUBSAR host adapter
  → local DUBSAR runtime
  → private Backend
  → private Core
  → governed project state
  → human-facing cockpit and decision
```

Claude Code is the first integration.

---

## Technical state

Private development currently includes:

- a Claude Code plugin;
- a local Bridge and DUBSAR Desktop runtime;
- a private Backend and Core;
- persistent Mission and workspace continuity;
- canonical session identity;
- lots and execution contracts;
- real Git worktrees;
- process identity and restart reconciliation;
- declared and verified evidence boundaries;
- explicit Human Gates;
- a local cockpit;
- controlled beta access and packaging work.

Internal technical proofs have completed:

- one real governed Claude Code session on Windows;
- two real governed Claude Code sessions linked to the same Mission;
- distinct canonical identities, processes and worktrees;
- separated evidence;
- explicit conflict handling without silent overwrite;
- single-use authorization behavior;
- individual process control and restart reconciliation.

These are internal technical proofs. They do not establish that an external user can yet install and use the product independently.

---

## Current product-validation target

The current target is a reproducible Windows product journey:

1. install the approved package;
2. start DUBSAR through the supported flow;
3. recognize a workspace;
4. create or resume a Mission;
5. run a governed session;
6. understand evidence, errors and Human Gates;
7. restart and resume without hidden operator intervention;
8. update or remove the product without corrupting user state.

A public or external beta should not be announced until this journey is repeatable and honestly documented.

---

## Platform status

### Windows

First controlled private-beta target. Packaging and the autonomous tester journey are still being finalized.

### Linux

Planned for validation after the Windows path is stable. No Linux beta is currently announced.

### macOS

Not currently announced. Packaging, signing, permissions and runtime behavior remain to be evaluated.

---

## Integration status

### Claude Code

First supported integration and current engineering focus.

### Codex, Cursor and other coding agents

Future host-adapter direction. No operational beta support is currently claimed.

The architecture is intended to reuse the same private Core rather than duplicate governance logic per host.

---

## Public distribution status

- Public product repository: this existing repository, currently under a legacy GitHub name.
- Public DUBSAR documentation: being realigned in PR #9.
- Thin Claude Code plugin source: staged in the draft branch, not approved as the final publication pin.
- DUBSAR Claude Code Marketplace: not activated or announced.
- Supported public installation: none yet.
- Public release: none.
- Production deployment: none.
- Commercial availability: none.
- Repository rename: not performed.

The final public plugin runtime must be re-vendored from the approved canonical plugin commit after the current Windows product journey is stabilized.

---

## Not currently claimed

DUBSAR is not currently presented as:

- production-ready;
- commercially available;
- enterprise-ready;
- a certified compliance or security system;
- a general autonomous multi-agent orchestrator;
- an operational Codex or Cursor integration;
- a public release of the private Core;
- an autonomous coding, merge or approval authority.

No agent-generated statement becomes a Human GO.

---

## Public / private boundary

This repository is intended to contain public documentation and thin distributable host-adapter code.

It does not publish:

- the proprietary Core;
- private Backend implementation details;
- internal prompts, policies or sealed journals;
- confidential proof artifacts;
- secrets, tokens or trust material;
- private tester or project data.

---

## Canonical status labels

```text
Windows controlled private beta: in preparation
internal one-session proof: completed
internal two-session proof: completed
external installation and usability proof: pending
marketplace: not activated or announced
not commercial-ready
not beta-ready
not marketplace-ready
```

Any stronger readiness claim requires a separate verified decision and explicit Human GO.

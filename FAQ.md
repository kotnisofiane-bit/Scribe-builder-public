# FAQ

## Is DUBSAR another coding agent?

No.

DUBSAR does not replace coding agents or developers. It is a governance layer around long-running AI coding projects.

Coding agents build. DUBSAR preserves Mission, decisions, boundaries and evidence. Humans decide protected movement.

---

## What problem does DUBSAR address?

AI coding agents can move quickly, but a project that continues across many sessions can lose:

- prior decisions and their reasons;
- active constraints;
- the scope of current work;
- the relationship between sessions, processes and worktrees;
- required evidence;
- the difference between a declaration and a verification;
- pending Human Gates;
- the path needed to resume later.

DUBSAR gives that project state a durable governed structure.

---

## Is DUBSAR only for Claude Code?

No.

DUBSAR is designed around host adapters. The private Core, Mission, decision memory, evidence model and Human Gates are intended to remain independent of any single coding agent.

Claude Code is the first supported integration.

Codex, Cursor and other coding-agent adapters are future product direction. They are not currently available integrations.

---

## What is the first product?

The first product journey combines:

- the DUBSAR Claude Code plugin;
- a local Bridge;
- DUBSAR Desktop and local runtime;
- a private Backend;
- a private Core;
- a human-facing cockpit and Human Gate surface.

The user experiences one product called DUBSAR. These are technical surfaces, not separate offers.

---

## What happened to Scribe Builder, Scribe Launcher and Eyes of SCRIBE?

They belong to earlier stages of the project and are no longer public product brands.

The public product is DUBSAR.

Some internal repository, command, route, MCP, environment or storage identifiers may retain `scribe` temporarily to preserve compatibility. They should not be interpreted as separate products.

---

## Does DUBSAR replace native worktrees, tools or sub-agents?

No.

The coding-agent host keeps its native execution capabilities. For Claude Code, that includes planning, editing, tools, tests, sub-agents and worktrees.

DUBSAR governs the project state around those capabilities. It should not rebuild the host without a specific governance reason.

---

## Does DUBSAR support multiple sessions?

The architecture and internal Windows technical proofs support governed one-session and two-session execution linked to the same canonical Mission.

The proof covered distinct identities, processes and worktrees, separated evidence, explicit conflict handling, Human Gates and restart reconciliation.

This is internal technical validation. It does not mean the public beta or external installation journey is available yet.

---

## What is the cockpit?

The cockpit is DUBSAR's human-facing view.

It is intended to show:

- the active Mission;
- sessions, lots, contracts and worktrees;
- decisions and constraints;
- evidence status;
- conflicts and stale state;
- availability and process state;
- pending Human Gates.

It displays governed state and sends bounded actions through the product boundary. It does not approve its own state.

---

## Why not just let agents collaborate directly?

Agents can collaborate, but agent-to-agent conversation does not automatically create durable project memory, canonical identity, evidence, authority boundaries or replay.

Whether a project uses one agent or many, it still needs to know:

- which Mission is active;
- which decisions apply;
- which constraints are active;
- what each session is allowed to do;
- what evidence is expected;
- what has actually been verified;
- which movement requires a human decision.

DUBSAR focuses on that project layer.

---

## What is decision memory?

Decision memory preserves what became meaningful for the project:

- the decision;
- its reason;
- applicable constraints;
- supporting evidence;
- what replaced it later;
- the human decision when protected movement occurred.

It is different from storing every conversation.

---

## Does DUBSAR verify everything an agent says?

No.

An agent report is a declaration. DUBSAR distinguishes declarations from evidence checked by an identified deterministic verifier. Missing and invalid evidence must remain visible.

DUBSAR does not turn persuasive wording into proof.

---

## What is a Human Gate?

A Human Gate is an explicit authenticated human decision before protected movement such as merge, release, deployment, sensitive scope or another irreversible action.

No agent can create a Human GO by claiming approval. DUBSAR can prepare and display the relevant dossier; the decision remains human.

---

## Which operating systems are supported?

### Windows

Windows is the first target for the controlled private beta. The product journey is still being finalized and validated.

### Linux

Linux validation is planned after the Windows path is stable. No Linux beta is currently announced.

### macOS

macOS support is not currently announced. Packaging, signing, permissions and runtime behavior must be evaluated before any support claim.

---

## Is DUBSAR open source?

The public repository and thin distributable host-adapter code are publicly viewable under the applicable beta licence.

The proprietary Core, private Backend implementation, internal policies, sealed journals and confidential proof artifacts are not open source and are not distributed here.

Publicly visible source is not automatically an open-source licence grant.

---

## Is the Marketplace live?

No.

The repository contains Marketplace staging material, but the DUBSAR Marketplace is not activated or announced. No installation command should be treated as active until publication is explicitly authorized.

---

## Is DUBSAR beta-ready or production-ready?

No.

DUBSAR is preparing a controlled private beta beginning with Windows and Claude Code. Internal technical proofs are complete for key one-session and multi-session governance paths, but the external installation and usability journey is still pending.

DUBSAR is not commercial-ready, not beta-ready and not marketplace-ready.

---

## Why is the GitHub repository still named Scribe-builder-public?

The repository name is a legacy identifier. Renaming a public repository is a separate human action and has not been performed inside this documentation work.

The product described here is DUBSAR.

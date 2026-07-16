# FAQ

## Is DUBSAR another coding agent?

No.

DUBSAR does not replace Claude Code or the developer. It is a decision-memory and human-governance layer around long-running Claude Code projects.

Claude Code builds. DUBSAR preserves decisions, constraints and evidence. Humans decide.

---

## What problem does DUBSAR address?

AI coding tools can move quickly, but a project that continues across many sessions can lose:

- prior decisions and their reasons;
- active constraints;
- the scope of the current lot;
- required evidence;
- the difference between a declaration and a verification;
- pending Human Gates;
- the path needed to resume later.

DUBSAR gives that project state a durable structure.

---

## What is the first product?

The first private-beta product is a Claude Code plugin supported by DUBSAR Desktop/local runtime and a private Core.

The plugin is the user entry point. Desktop provides the local runtime. The private Core remains the source of truth for governed project state.

---

## What happened to Scribe Builder and Scribe Launcher?

They belong to earlier stages of the project.

The public product name is now DUBSAR. “Launcher” is no longer a separate public product, and “Builder” is no longer the public parent brand.

Some internal repository, command, route, MCP or token identifiers may retain `scribe` temporarily to preserve compatibility. They should not be interpreted as separate public products.

---

## Does DUBSAR replace Claude Code, Codex or Cursor?

No.

Claude Code remains the first supported host and keeps its native planning, editing, tool, test, sub-agent and worktree capabilities.

Codex and Cursor adapters are possible later directions. They are not currently claimed as operational beta integrations.

---

## What is the cockpit?

The cockpit is DUBSAR's local human-facing view.

It is intended to show the active Mission, decisions, constraints, lot, evidence, availability state and pending Human Gates.

It displays governed state. It does not approve its own state and does not replace human review.

---

## Why not just let agents collaborate directly?

Agents can collaborate, but agent-to-agent conversation does not automatically create durable project memory, evidence, authority boundaries or replay.

Whether a project uses one agent or many, it still needs to know:

- which decisions apply;
- which constraints are active;
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

A Human Gate is an explicit human decision before protected movement such as merge, release, deployment, sensitive scope or another irreversible action.

No agent can create a Human GO by claiming approval. DUBSAR can prepare and display the relevant dossier; the decision remains human.

---

## Is DUBSAR open source?

The public repository and thin distributable plugin package are publicly viewable.

The proprietary Core, private backend implementation, internal policies, sealed journals and confidential proof artifacts are not open source and are not distributed here.

The exact licence for the beta package must be approved before Marketplace publication.

---

## Is the Marketplace live?

No.

The Marketplace package has been prepared privately, but it is not published. This existing repository is intended to become the single public documentation and Marketplace repository after review.

No installation command should be treated as active until publication is explicitly announced.

---

## Is DUBSAR production-ready?

No.

DUBSAR is preparing a controlled private beta. It is not commercial-ready, production-ready or enterprise-certified.

---

## Why is the GitHub repository still named Scribe-builder-public?

The repository name is a legacy compatibility identifier. Renaming a public repository is a separate human action and is intentionally not performed inside this documentation PR.

The product described here is DUBSAR.

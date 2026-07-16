# Why DUBSAR?

DUBSAR began with a practical problem:

> How can an AI-assisted software project remain coherent when it lasts longer than one chat, one pull request or one agent session?

In short interactions, an AI coding tool can be remarkably effective. Long-running projects are different.

Decisions accumulate. Constraints change. Evidence is scattered. Context is compacted or restarted. A new session can produce a locally reasonable answer that quietly contradicts what the project previously decided.

The challenge is no longer only generating code.

The challenge is preserving project coherence.

---

## The engineering observation

As models became more capable, the missing layer became clearer.

Projects also needed:

- a persistent Mission;
- decision memory;
- explicit contracts and boundaries;
- evidence that can be distinguished from claims;
- audit and role separation;
- replay across sessions;
- explicit human judgment for protected movement.

DUBSAR exists to provide that project layer around existing AI coding tools.

---

## A different question

Many systems ask:

> How can AI become more autonomous?

DUBSAR asks:

> How can humans and AI build more reliably over time?

Autonomy and reliability are not the same objective.

DUBSAR does not assume that adding more agents or more freedom automatically creates better project governance. It assumes that human responsibility needs durable memory, evidence and clearer decision boundaries.

---

## From conversation to project memory

Conversation remains useful. It helps explore, explain and propose.

But a conversation is not a governed project memory.

A long-running project needs to preserve:

- what became a decision;
- why it was accepted;
- which constraints still apply;
- what evidence exists;
- what was merely declared;
- which Human Gate was required;
- how the decision path can be reconstructed later.

DUBSAR does not attempt to remember everything. It attempts to remember what the project depends on.

---

## Why Claude Code first?

Claude Code already provides a capable environment for planning, editing, tools, tests, sub-agents and worktrees.

DUBSAR should not rebuild those capabilities.

The first product is therefore a thin Claude Code plugin connected through a local runtime to a private Core. Claude Code continues to act. DUBSAR preserves the Mission and governed project state around those actions.

---

## Why a private Core?

The public plugin must remain small enough to inspect and distribute, while the proprietary decision and governance mechanisms remain protected and consistent.

The private Core owns canonical Mission, contract, decision, evidence, audit and Human Gate state. The public repository can document the concepts and distribute the thin plugin without exposing the private engine.

---

## Why publish this repository?

Because a product needs a clear public source of truth.

This repository is intended to become the single public home for:

- DUBSAR's purpose and doctrine;
- user and beta documentation;
- the Claude Code Marketplace package when ready;
- security, privacy and release information.

The Marketplace package is not published yet, and the project is not commercial-ready.

---

## The broader question

DUBSAR begins with software development and Claude Code.

The broader question remains:

> How should humans and AI build together when the work must remain understandable, accountable and resumable over time?

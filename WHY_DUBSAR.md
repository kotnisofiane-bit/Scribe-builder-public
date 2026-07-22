# Why DUBSAR?

DUBSAR began with a practical problem:

> How can an AI-assisted software project remain coherent when it lasts longer than one chat, one pull request, one coding agent or one session?

In short interactions, coding agents can be remarkably effective. Long-running projects are different.

Decisions accumulate. Constraints change. Evidence becomes scattered. Sessions restart or compact their context. Different agents may work in parallel. A locally reasonable answer can quietly contradict what the project previously decided.

The challenge is no longer only generating code.

The challenge is preserving project coherence and human authority.

---

## The missing project layer

As coding agents became more capable, the missing layer became clearer.

Projects also needed:

- a persistent Mission;
- decision memory;
- explicit contracts and boundaries;
- canonical session identity;
- evidence that remains distinct from claims;
- audit and role separation;
- replay across sessions;
- explicit human judgment for protected movement.

DUBSAR exists to provide that governed project layer around existing coding agents.

---

## Intelligence is not authority

Many systems ask:

> How can AI become more autonomous?

DUBSAR asks:

> How can humans and AI build more reliably over time?

Autonomy and reliability are not the same objective.

DUBSAR does not assume that more agents, more tools or more freedom automatically create better project governance. It assumes that human responsibility needs durable memory, evidence and clear authority boundaries.

---

## Conversation history is not project memory

Conversation remains useful. It helps explore, explain and propose.

But conversation history is not a governed project memory.

A long-running project needs to preserve:

- what became a decision;
- why it was accepted;
- which constraints still apply;
- what was replaced or rejected;
- which work belongs to which Mission, lot and session;
- what evidence exists;
- what was merely declared;
- which Human Gate was required;
- how the decision path can be reconstructed later.

DUBSAR does not attempt to remember everything. It attempts to remember what the project depends on.

---

## Why host adapters?

Coding agents already provide intelligence, tools, editing and execution environments.

DUBSAR should not rebuild those capabilities. It connects to them through bounded host-specific adapters while keeping the governed Mission and authority model independent of any single provider.

Claude Code is the first integration because it provides a capable environment for planning, editing, tests, sub-agents and worktrees.

The same private Core is intended to support future adapters for Codex, Cursor and other coding-agent environments. Those adapters are product direction, not currently available integrations.

---

## Why a private Core?

Public adapters must remain small enough to inspect and distribute. The proprietary decision and governance mechanisms must remain protected and consistent.

The private Core owns canonical Mission, session, contract, decision, evidence, audit and Human Gate state.

The public repository can document the concepts and distribute a thin adapter without exposing the private engine.

---

## Why multi-session matters

A project does not stop being one project because two sessions work at the same time.

Without a shared governed layer, parallel sessions can:

- forget the same prior decision differently;
- work from different bases;
- modify overlapping scope;
- produce incompatible evidence;
- overwrite state silently;
- leave the human unable to understand which session produced what.

DUBSAR relates each session to the same canonical Mission while keeping identities, worktrees, processes and evidence separate.

Internal technical validation has completed governed one-session and two-session execution on Windows. Public beta installation and usability remain under validation.

---

## Why publish this repository?

Because a product needs a clear public source of truth.

This repository is intended to become the single public home for:

- DUBSAR's purpose and doctrine;
- product, installation and beta documentation;
- the first thin host adapter for Claude Code;
- Marketplace metadata when publication is authorized;
- security, privacy and release information.

The Marketplace is not published, and the installable product is not generally available. The separately scoped DUBSAR Audit professional service is available on request under a bounded mandate.

---

## The broader question

DUBSAR begins with software development.

The broader question remains:

> How should humans and AI build together when the work must remain understandable, accountable and resumable across sessions and tools?

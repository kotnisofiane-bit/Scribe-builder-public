# Why Not Just Agents?

AI agents are useful. Multiple agents can also be useful.

DUBSAR does not reject agentic development. It asks a different question:

> What does the project remember, verify and require when an agent session ends or work moves to another tool?

---

## More agents do not automatically create governance

A project can use one agent or many and still suffer from:

- forgotten decisions;
- unclear authority;
- missing or self-reported evidence;
- repeated assumptions;
- scope drift;
- weak replay;
- human approval without the relevant dossier.

The issue is not only who speaks. The issue is how proposed work becomes governed project movement.

---

## Agent collaboration is not durable project state

Agents can exchange messages, critique work and produce plans, patches or reviews.

A long-running project still needs to know:

- which Mission is active;
- which decisions and constraints apply;
- what the current lot permits;
- which canonical session owns the work;
- what evidence is expected;
- what was merely declared;
- what was independently verified;
- what requires a Human Gate;
- how the path can be resumed later.

Agent conversation alone does not guarantee those properties.

---

## DUBSAR focuses on the project layer

DUBSAR does not manage agents as personalities.

It governs the project state around their work:

```text
Mission
  → decisions and constraints
  → bounded contract
  → canonical session
  → agent proposal or execution
  → audit and evidence
  → Human Gate
  → result and replay
```

The host agent remains capable. The project becomes more coherent.

---

## Why the host remains in control of execution

Coding-agent environments already supply planning, tools, editing, tests and execution capabilities.

DUBSAR should not create a competing coding agent or orchestration engine merely to claim ownership of execution.

It connects through a thin host adapter while keeping Mission, decision, evidence and Human Gate truth in the private DUBSAR Core.

Claude Code is the first supported host. Codex, Cursor and other adapters are future direction, not currently available integrations.

---

## Role separation still matters

Architect, coder, auditor and verifier are useful responsibility patterns:

- framing is not execution;
- proposing is not verification;
- verification is not final approval;
- no agent validates itself;
- no agent creates a Human GO.

These roles do not require DUBSAR to host a full proprietary team of agents. They define how authority and evidence should remain separated when different roles are used.

---

## One governed memory across sessions and hosts

A user should not have to rebuild the project's core reasoning every time a host restarts, compacts context or work moves to another supported coding-agent environment.

DUBSAR provides the continuing Mission and decision memory around those sessions.

Coding agents may propose and act. DUBSAR preserves the governed project context. The human decides protected movement.

---

## Summary

Long-running AI projects need more than agent activity.

They need durable Mission state, canonical sessions, decisions, constraints, evidence, audit, Human Gates and replay.

DUBSAR adds that project layer.

Not more intelligence. More reliable project movement.

# Diagrams

The existing SVG files in this folder predate the current DUBSAR product architecture.

They are retained temporarily as historical conceptual material. None should be treated as a current product diagram or embedded in the root README.

## Canonical current architecture

```text
Coding agent
    ↓
DUBSAR host adapter
    ↓
Local Bridge and DUBSAR runtime
    ↓
Private Backend
    ↓
Private DUBSAR Core
    ↓
Mission / sessions / decisions / evidence / Human Gates
    ↓
DUBSAR cockpit and human decision
```

Claude Code is the first host adapter.

See [Architecture](../ARCHITECTURE.md) for the current explanation.

## Required new diagrams

Before this repository is presented as canonical DUBSAR documentation, it should contain at least:

1. **DUBSAR architecture** — host adapter, Bridge, Desktop/runtime, Backend, Core, Runner and cockpit responsibilities.
2. **Governed multi-session model** — one Mission, separate sessions, worktrees, processes and evidence, with conflict and Human Gate handling.
3. **User journey** — install, start, Mission, governed work, evidence, Human Gate and resume.

New diagrams should use the real DUBSAR visual direction:

- dark graphite and night-blue background;
- restrained turquoise for navigation and flows;
- warm gold for evidence and Human Gates;
- clear typography;
- no purple, excessive neon or generic SaaS dashboard styling.

## Legacy files

The current SVG files are historical and require one of three decisions:

- redraw under DUBSAR;
- move to an explicit legacy archive;
- remove if they no longer add value.

The files must not be mistaken for the current product architecture.

## Boundary

Future public diagrams may explain product responsibilities and user-visible guarantees. They must not publish private Core logic, Backend routes, internal policies, confidential proof artifacts, secrets or tester data.

```text
not commercial-ready
not beta-ready
not marketplace-ready
```

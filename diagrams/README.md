# Diagrams

This folder contains simple public diagrams for SCRIBE.

The diagrams are sober, readable and conceptual.

They explain public ideas without exposing the private engine.

## Current status

Some diagrams in this folder were created during an earlier phase of the project, when SCRIBE was described more explicitly as a governed multi-role collaboration loop.

That doctrine remains useful, but it should not be read as the current product architecture.

The current public product direction is:

```text
Existing AI coding workflow
        ↓
SCRIBE Launcher / connector surface
        ↓
Private service boundary
        ↓
Private SCRIBE decision core
        ↓
Evidence, memory and Human GO surfaced for review
```

This repository now includes a public boundary / decision trace diagram (`public-boundary.svg`) aligned with the current direction. It is shown first below.

Read the remaining diagrams with the status labels provided here.

## Preview

### Public Boundary / Decision Trace — current framing

![SCRIBE public boundary and decision trace](public-boundary.svg)

This diagram reflects the current public direction. The upper band is the decision trace — Agent proposal → SCRIBE check → Evidence → Human GO → Replay. The lower band is the public / private boundary between public surfaces, the private service boundary and the private core. It publishes no private routes, schemas, prompts, policies or proof artifacts.

### Governed Collaboration Loop — legacy conceptual framing

![Governed Collaboration Loop](governed-loop.svg)

This diagram is useful as a historical explanation of role separation and governed collaboration. It should not be treated as the current product architecture.

### Conceptual Architecture — legacy conceptual framing

![Conceptual Architecture](architecture.svg)

This diagram belongs to the earlier “roles around SCRIBE” framing. It is retained for context, not as the current architecture map.

### Decision Memory — still conceptually aligned

![Decision Memory](decision-memory.svg)

This diagram remains aligned with the current trajectory: memory, decision context and replay remain central.

### Execution Contract — still conceptually aligned

![Execution Contract](execution-contract.svg)

This diagram remains aligned with the current trajectory: boundaries, evidence and human decision remain central.

### Project Evolution — legacy trajectory note

![Project Evolution](project-evolution.svg)

This diagram reflects an older trajectory and should be read as a legacy note.

## Files

- [Public Boundary / Decision Trace](public-boundary.svg) — current framing
- [Governed Collaboration Loop](governed-loop.svg) — legacy conceptual framing
- [Conceptual Architecture](architecture.svg) — legacy conceptual framing
- [Decision Memory](decision-memory.svg) — current concept remains aligned
- [Execution Contract](execution-contract.svg) — current concept remains aligned
- [Project Evolution](project-evolution.svg) — legacy trajectory note

## Boundary

These diagrams are public explanatory material.

They do not publish the private engine, backend implementation details, internal audit logs, sealed journals, private prompts, operational write mechanisms, trust material or confidential proof artifacts.

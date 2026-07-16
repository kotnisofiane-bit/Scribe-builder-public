# Diagrams

The diagrams in this folder were created during earlier SCRIBE / Scribe Builder phases.

They are retained temporarily as historical conceptual material. None of the existing SVG files should currently be treated as the canonical DUBSAR product architecture.

## Canonical current architecture

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
Governed state and Human Gates
```

See [Architecture](../ARCHITECTURE.md) for the current public explanation.

## Legacy files

- `public-boundary.svg` — legacy SCRIBE branding and pre-plugin framing;
- `governed-loop.svg` — historical multi-role collaboration model;
- `architecture.svg` — historical roles-around-SCRIBE architecture;
- `decision-memory.svg` — concept remains relevant, branding and context require revision;
- `execution-contract.svg` — concept remains relevant, branding and context require revision;
- `project-evolution.svg` — historical project trajectory.

## Migration decision

Before the public repository is merged and presented as canonical DUBSAR documentation, these files must be individually:

- redrawn under DUBSAR;
- retained in an explicit legacy archive; or
- removed if they no longer add value.

The old diagrams must not be embedded in the root README as the current product architecture.

## Boundary

Future public diagrams may explain product responsibilities and user-visible guarantees. They must not publish private Core logic, backend routes, internal policies, confidential proof artifacts, secrets or tester data.

DUBSAR is not commercial-ready. The Marketplace is not published.

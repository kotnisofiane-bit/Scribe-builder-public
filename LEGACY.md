# Legacy material

DUBSAR is the current public product.

This repository preserves selected historical material created under the names SCRIBE and Scribe Builder. That material remains visible for engineering history, not as current product documentation.

---

## Current product source of truth

Use these documents for the current DUBSAR product:

- [`README.md`](README.md)
- [`WHY_DUBSAR.md`](WHY_DUBSAR.md)
- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`PRODUCT_SURFACES.md`](PRODUCT_SURFACES.md)
- [`STATUS.md`](STATUS.md)
- [`ROADMAP.md`](ROADMAP.md)
- [`MARKETPLACE.md`](MARKETPLACE.md)
- [`INSTALLATION.md`](INSTALLATION.md)

---

## Historical product names

The following names are not current public product brands:

- SCRIBE;
- Scribe Builder;
- Scribe Launcher;
- Eyes of SCRIBE.

They may appear in Git history, legacy diagrams, legacy RFCs or technical compatibility identifiers.

---

## Legacy documentation areas

### RFCs

The [`rfcs/`](rfcs/) folder is an explicit legacy conceptual reference layer.

Its documents are non-normative for current DUBSAR behavior and do not specify the current host-adapter, canonical-session or multi-session architecture.

### Diagrams

Historical SVG files that do not begin with `dubsar-` predate the current visual and product architecture.

Current diagrams are:

- [`diagrams/dubsar-architecture.svg`](diagrams/dubsar-architecture.svg)
- [`diagrams/dubsar-multi-session.svg`](diagrams/dubsar-multi-session.svg)
- [`diagrams/dubsar-windows-journey.svg`](diagrams/dubsar-windows-journey.svg)

### Git history and earlier pull requests

Earlier commits and pull requests intentionally retain the terminology used when they were created. History should not be rewritten to simulate a product identity that did not yet exist.

---

## Technical compatibility identifiers

Some active technical identifiers may temporarily retain `scribe` names, including:

- private repository names;
- `scribe-bridge`;
- `/scribe-*` commands;
- `scribe.*` MCP tools;
- `SCRIBE_*` environment variables;
- routes, schemas and local storage paths.

These are not legacy documents and must not be renamed casually. They remain compatibility-sensitive implementation identifiers until a tested migration plan exists.

---

## Interpretation rule

When historical material conflicts with current root documentation:

> Current DUBSAR root documentation wins.

Historical content must not be used to claim current availability, platform support, architecture or readiness.

```text
product generally available: no
public beta: no
marketplace-ready: no
```

# Public RFCs — Legacy Reference Layer

This folder contains public technical design references created during the SCRIBE / Scribe Builder phase of the project.

The underlying concepts remain useful, but these RFCs are **not current DUBSAR product specifications**.

---

## Canonical status

Treat every RFC in this folder as:

```text
legacy conceptual reference
non-normative for the current DUBSAR product
not API documentation
not installation documentation
not a statement of current runtime behavior
```

The canonical current product description is maintained in the repository root:

- [`README.md`](../README.md)
- [`ARCHITECTURE.md`](../ARCHITECTURE.md)
- [`PRODUCT_SURFACES.md`](../PRODUCT_SURFACES.md)
- [`STATUS.md`](../STATUS.md)
- [`MARKETPLACE.md`](../MARKETPLACE.md)

---

## Why the RFCs are retained

Git history should not be rewritten merely because the product evolved.

These documents preserve useful reasoning about:

- public/private boundaries;
- execution contracts;
- decision memory;
- evidence;
- replay;
- human validation.

They also show how the doctrine evolved before the current host-adapter and multi-session architecture existed.

---

## Known legacy characteristics

The RFCs may still contain:

- SCRIBE or Scribe Builder branding;
- earlier role and product-surface language;
- abstract shapes that do not match current private schemas;
- assumptions predating canonical DUBSAR sessions;
- assumptions predating real multi-session worktrees and process identity;
- language centered on a single host or a speculative product surface;
- simplified evidence or Human Gate semantics.

None of those statements should override current root documentation.

---

## Reading order and migration status

| RFC | Topic | Current value | Migration decision |
| --- | --- | --- | --- |
| [RFC-0000](RFC-0000-public-boundary.md) | Public boundary | Core concept remains valid | Retain as legacy; root architecture is canonical |
| [RFC-0001](RFC-0001-execution-contract.md) | Execution contract | Scope and evidence concepts remain valid | Future DUBSAR replacement required |
| [RFC-0002](RFC-0002-decision-memory.md) | Decision memory | Strong conceptual alignment | Future DUBSAR replacement should add Mission and canonical session model |
| [RFC-0003](RFC-0003-evidence-package.md) | Evidence package | Declaration/evidence distinction remains useful | Future replacement should align with current verification tiers |
| [RFC-0004](RFC-0004-replay-format.md) | Replay | Meaningful-path concept remains valid | Future replacement should include sessions, worktrees and reconciliation |
| [RFC-0005](RFC-0005-human-validation.md) | Human validation | Human authority remains canonical | Future replacement should align with authenticated Human Gates and single-use authorization |

---

## Current DUBSAR architecture not represented by these RFCs

The legacy RFC set does not fully specify:

- host adapters;
- Claude Code as the first integration rather than the product boundary;
- future Codex, Cursor or other adapters;
- canonical DUBSAR session identity;
- native host session linkage;
- worktree and process bindings;
- multi-session conflict handling;
- Backend-only canonical writes;
- restart reconciliation;
- current Windows-first beta packaging.

For these topics, use the root documentation.

---

## Public boundary

The public repository may describe concepts, invariants, abstract record shapes, failure modes and fictional examples.

It must not publish:

- private Core code;
- private Backend implementation;
- internal gate logic or private policies;
- prompts or private chain-of-thought;
- sealed journals or confidential proof artifacts;
- secrets, tokens or trust material;
- tester or customer data.

---

## Future replacement strategy

The legacy RFCs should not be mechanically renamed from SCRIBE to DUBSAR.

New DUBSAR RFCs should be written only when the current product behavior is stable enough to support a useful public invariant without exposing private mechanisms.

Possible future DUBSAR RFCs include:

- Host Adapter Contract;
- Canonical Session Identity;
- Multi-Session Concurrency and Conflict;
- Evidence Tiers and Verifier Boundary;
- Human Gate Authentication;
- Restart and Reconciliation;
- Public Package Provenance.

Until then, this folder remains an explicit historical reference layer.

```text
not commercial-ready
not beta-ready
not marketplace-ready
```

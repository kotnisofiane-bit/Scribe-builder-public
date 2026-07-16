# Public RFCs

This folder contains public technical design references created during the SCRIBE / Scribe Builder phase of the project.

The underlying concepts remain relevant to DUBSAR, but the individual RFCs have not yet completed a terminology and product-accuracy review.

## Current status

Treat the RFCs as **legacy conceptual references**, not as current DUBSAR API or installation documentation.

They may still use:

- SCRIBE or Scribe Builder branding;
- earlier role and product-surface language;
- abstract contracts that do not exactly match the current private beta;
- terminology that predates the Claude Code plugin-first product.

The canonical public product description is in the repository root documentation.

## Reading order

0. [RFC-0000 — Public Boundary](RFC-0000-public-boundary.md)
1. [RFC-0001 — Execution Contract](RFC-0001-execution-contract.md)
2. [RFC-0002 — Decision Memory](RFC-0002-decision-memory.md)
3. [RFC-0003 — Evidence Package](RFC-0003-evidence-package.md)
4. [RFC-0004 — Replay Format](RFC-0004-replay-format.md)
5. [RFC-0005 — Human Validation](RFC-0005-human-validation.md)

## Concepts that remain aligned

- explicit execution boundaries;
- decision memory distinct from conversation history;
- declared evidence distinct from verified evidence;
- deterministic replay;
- explicit human validation for protected movement;
- separation between public surfaces and the private Core.

## Public boundary

The public repository may describe concepts, invariants, abstract record shapes, failure modes and fictional examples.

It must not publish:

- private Core code;
- internal gate logic or private policies;
- prompts or private chain-of-thought;
- sealed journals or confidential proof artifacts;
- secrets, tokens or trust material;
- private backend implementation;
- tester or customer data.

## Migration decision

The RFC files will be audited individually after the top-level product and Marketplace realignment. They should be updated, replaced or archived based on whether they still explain the real DUBSAR product.

DUBSAR remains not commercial-ready, and the Marketplace is not published.

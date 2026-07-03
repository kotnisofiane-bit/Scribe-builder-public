# Public RFCs

This folder contains the public technical specification layer for SCRIBE Builder.

The RFCs are written for technical readers who want to understand the governance model without seeing the private implementation.

They define public concepts, invariants, interfaces and failure boundaries.

They do not publish the engine.

## Status

These documents are public design references.

They are not product documentation, API documentation or implementation documentation.

SCRIBE Builder remains experimental and not commercial-ready.

## Normative language

The words `MUST`, `SHOULD` and `MAY` are used as public specification language.

They describe expected protocol properties.

They do not reveal or imply the private enforcement mechanism.

## Reading order

0. [RFC-0000 — Public Boundary](RFC-0000-public-boundary.md)
1. [RFC-0001 — Execution Contract](RFC-0001-execution-contract.md)
2. [RFC-0002 — Decision Memory](RFC-0002-decision-memory.md)
3. [RFC-0003 — Evidence Package](RFC-0003-evidence-package.md)
4. [RFC-0004 — Replay Format](RFC-0004-replay-format.md)
5. [RFC-0005 — Human Validation](RFC-0005-human-validation.md)

## Public design surface

The public repository may describe:

- concepts;
- protocol roles;
- public invariants;
- abstract record shapes;
- examples with fictional content;
- failure modes;
- non-goals;
- review checklists.

The public repository MUST NOT publish:

- private engine code;
- internal gate logic;
- private policies;
- prompts;
- sealed journals;
- proof artifacts;
- trust material;
- provider details;
- operational write mechanisms;
- confidential project history.

## Intended credibility

A technical reader should be able to evaluate the project’s reasoning model.

They should not be able to reconstruct the private system.

This is the core boundary of the public RFC layer.

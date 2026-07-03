# RFC-0000 — Public Boundary

## Abstract

This RFC defines the publication boundary for SCRIBE Builder.

It explains what the public repository may contain and what must remain private.

The goal is to make the project technically legible without exposing the engine.

## Audience

This document is for technical readers, contributors, reviewers and future maintainers.

It is also the reference boundary for public documentation work.

## Public/private split

SCRIBE Builder has two distinct surfaces.

The public surface explains the governance model.

The private surface contains the implementation, operational proof material and internal enforcement details.

The public surface MAY describe concepts and invariants.

The public surface MUST NOT reveal mechanisms that would allow reconstruction of the private system.

## Allowed public material

The public repository MAY contain:

- conceptual diagrams;
- public RFCs;
- abstract record shapes;
- fictional examples;
- public glossary terms;
- design philosophy;
- threat boundaries;
- non-goals;
- review checklists;
- roadmap-level direction.

## Forbidden public material

The public repository MUST NOT contain:

- private engine source code;
- real gate logic;
- private policy files;
- internal prompts;
- sealed journals;
- real proof packs;
- hashes of sensitive artifacts;
- signing keys or trust material;
- provider configuration;
- operational write paths;
- real project logs;
- confidential audit traces.

## Technical disclosure rule

A public document SHOULD be useful for understanding the protocol.

A public document MUST NOT be sufficient to implement the private engine.

When those two goals conflict, non-disclosure wins.

## Threat model

The public documentation assumes three basic risks:

1. A reader may try to infer private implementation details.
2. A reader may mistake conceptual documents for product guarantees.
3. A future contributor may accidentally publish sensitive material.

The RFC layer mitigates these risks by separating public invariants from private mechanisms.

## Redaction rule

A technical idea is acceptable for publication when it can be expressed without:

- naming private modules;
- copying internal schemas;
- exposing real data;
- exposing real prompts;
- exposing operational commands;
- exposing cryptographic or trust material;
- exposing execution traces.

If redaction removes the meaning of the idea, the idea should remain private.

## Review checklist

Before publishing a public technical document, check that it answers these questions:

- Does it contain only public concepts?
- Does it avoid real internal names?
- Does it avoid real project data?
- Does it avoid implementation code?
- Does it avoid prompts and policies?
- Does it avoid operational write details?
- Does it avoid proof artifacts and trust material?
- Does it clearly state non-goals?
- Does it preserve the not commercial-ready status?

## Non-goals

This RFC does not define the implementation boundary inside the private repository.

It does not describe how the engine enforces rules.

It does not describe any operational signing, writing or verification flow.

## Summary

The public repository should make SCRIBE Builder understandable.

It should not make the private system reproducible.

# Product Surfaces

This document describes the current public product direction of SCRIBE without exposing the private implementation.

SCRIBE is not another coding agent.

It is a decision-memory, audit and human-validation layer around AI-assisted software projects.

The current product direction is hybrid:

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

This is a public framing, not an implementation map.

No private routes, schemas, prompts, policies, logs, proof artifacts, write mechanisms, trust material or backend details are published here.

---

## SCRIBE Launcher

SCRIBE Launcher is the first product surface being explored.

Its purpose is to sit around AI-assisted coding workflows and help keep project movement bounded by:

- project memory;
- locked constraints;
- audit questions;
- evidence;
- Human GO;
- replay.

Launcher does not replace the AI coding tool.

It does not act as a complete local brain.

It does not make the AI agent an authority over the project.

Depending on the host environment, future delivery forms may include a connector, plugin or MCP-compatible integration.

That does not mean a public connector is available today.

Current status:

- no public installation package;
- no stable public connector API;
- no public MCP server package;
- no production deployment;
- no commercial availability.

---

## Eyes of SCRIBE

Eyes of SCRIBE is the cockpit / observation direction.

Its role is to make SCRIBE's checks readable to the human.

It should help answer questions such as:

- What did SCRIBE see?
- What memory applied?
- Which constraints were relevant?
- What was excluded?
- What evidence exists?
- What remains uncertain?
- What requires Human GO?
- What can be replayed later?

Eyes of SCRIBE is not an autonomous execution engine.

It does not replace human review.

It should make responsibility easier to exercise, not hide it.

This direction is still under active development.

---

## Private service boundary

The private service boundary exists to keep public surfaces thin and the proprietary core protected.

Public surfaces may show sanitized, bounded and reviewable information.

They must not expose:

- private decision logic;
- internal prompts or policies;
- sealed journals;
- operational proof artifacts;
- write mechanisms;
- trust or signing material;
- backend routes or payloads;
- sensitive project history.

This boundary is part of the product design.

---

## Private SCRIBE core

The private core is where SCRIBE's proprietary decision-memory, audit, proof and replay logic evolves.

This repository does not publish that core.

The public repository may describe abstract concepts such as memory, contracts, evidence, Human GO and replay.

It must not publish the mechanisms that enforce those concepts internally.

---

## MCP / plugin / connector direction

MCP, plugins and connectors are possible delivery forms.

They are not the product definition.

The product definition is the decision-memory and audit layer around agent-assisted project movement.

A cautious public wording is:

> SCRIBE Launcher is being explored as a thin connection surface around existing AI coding workflows. Depending on the host environment, future delivery forms may include a connector, plugin or MCP-compatible integration. No public installation package or stable connector API is available today.

Avoid wording that suggests SCRIBE is already installable, publicly packaged or marketplace-ready.

---

## What should remain private

Do not publish:

- install commands for a product that is not publicly installable;
- connector manifests that are not stable and public;
- real backend routes;
- private schemas;
- provider-specific logic;
- prompts;
- internal gates;
- sealed journals;
- trust material;
- write-path details;
- confidential proof artifacts.

---

## Summary

The public surfaces explain and expose enough for humans to understand SCRIBE.

The private core remains protected.

That separation is intentional.

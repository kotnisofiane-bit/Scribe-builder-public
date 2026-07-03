# RFC-0003 — Evidence Package

## Purpose

An evidence package is a public conceptual bundle that explains what supports a decision.

It helps a future reader understand what was checked, what was accepted and what remains limited.

Evidence is not persuasion.

Evidence is what makes review possible.

## Problem

AI systems can produce fluent explanations.

A fluent explanation is not enough for a governed project.

A human decision should be connected to material that can be reviewed later.

## Public evidence shape

A public evidence package may contain:

- evidence id;
- contract reference;
- changed-file summary;
- audit summary;
- test or check summary;
- boundary confirmation;
- human decision reference;
- known limitations;
- replay reference.

This shape is conceptual and content-free.

It does not expose private proof artifacts or internal signing material.

## Example

```text
Evidence package:
Documentation update only.

Changed files:
README.md and rfcs/README.md.

Checks:
No engine code included.
No private logs included.
No prompt material included.

Decision:
Human-approved publication.

Limitations:
Conceptual documentation only.
```

## Evidence classes

Public evidence can be grouped into simple classes:

- scope evidence;
- change evidence;
- audit evidence;
- decision evidence;
- replay evidence;
- limitation evidence.

This classification is descriptive only.

It is not the private evidence engine.

## Invariants

An evidence package should make clear:

- what was checked;
- what changed;
- what did not change;
- what evidence is missing;
- what the evidence does not prove.

## Non-goals

This RFC does not publish:

- private proof packs;
- hashes from sensitive artifacts;
- signing keys;
- internal trust ledgers;
- provider output;
- hidden policy details.

## Summary

Evidence packages make governance reviewable.

They should be durable, bounded and honest about their limits.

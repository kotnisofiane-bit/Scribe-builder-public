# Privacy

This document describes the intended public privacy boundary for the DUBSAR private beta. It is not a substitute for a final legal privacy notice.

DUBSAR is not commercial-ready and the Marketplace package is not published.

---

## Product model

The first beta combines:

- a Claude Code plugin;
- DUBSAR Desktop/local runtime;
- a private service boundary and Core;
- a local cockpit.

The public plugin is designed to remain thin. The private Core is not distributed through this repository.

---

## Data minimization

DUBSAR should process only the information required to provide governed project continuity and the requested feature.

Public and local surfaces should avoid sending:

- secrets or credentials;
- private chain-of-thought;
- unrestricted repository contents;
- full terminal output when a bounded result is sufficient;
- unrelated personal information;
- private data not required by the active contract.

Exact beta data flows must be documented before publication.

---

## Local data

The Desktop/local runtime may store bounded local state required for:

- workspace recognition;
- session continuity;
- local diagnostics;
- cockpit operation;
- secure access state.

Sensitive access keys should be held only in the supported operating-system secure store, not in plugin files, command arguments, logs or ordinary metadata files.

---

## Private service data

The private service may receive bounded project metadata and governed records required for Mission, decisions, contracts, evidence, audit and Human Gate workflows.

The plugin should not send arbitrary repository content merely because it can access the workspace. Any content-bearing feature must have an explicit purpose, boundary and user-facing explanation.

---

## Claude Code

DUBSAR operates inside Claude Code and is also subject to the data handling and configuration of the user's Claude Code environment. DUBSAR does not control the host's independent privacy terms or model-provider behavior.

---

## Beta access

Private beta access may require account, invitation, activation or licence metadata. The final categories, retention periods and user rights must be documented before commercial availability.

Do not submit real access keys, secrets or sensitive personal information through GitHub issues.

---

## Publication blockers

Before Marketplace publication, the project must confirm:

- the exact data sent by the final plugin and Desktop build;
- local storage locations and removal behavior;
- private service retention rules;
- access and deletion procedures;
- the final public privacy contact and legal notice;
- consistency between this document and the implemented product.

---

## Current status

```text
privacy notice: engineering boundary, not final legal notice
marketplace: not published
not commercial-ready
```

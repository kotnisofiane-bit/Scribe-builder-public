# Privacy

This document describes the intended public privacy boundary for the DUBSAR controlled private beta. It is an engineering boundary, not a final legal privacy notice.

It does not define the complete contractual data-processing terms of a professional DUBSAR Audit engagement. Audit scope, authorized sources, access, retention and deletion are agreed before an engagement begins. The public website does not request credentials, tokens or source code.

```text
product generally available: no
public beta: no
marketplace-ready: no
```

---

## Product model

DUBSAR is designed around thin host adapters connected to a private governance Core.

The first beta journey combines:

- the DUBSAR Claude Code plugin;
- a local Bridge;
- DUBSAR Desktop and local runtime;
- a private Backend and Core;
- a local cockpit and Human Gate surface.

Claude Code is the first integration. Future adapters may connect Codex, Cursor or other coding-agent environments to the same governed Core. Those adapters are not currently available.

The public adapter is designed to remain thin. The private Backend and Core are not distributed through this repository.

---

## Data minimization

DUBSAR should process only the information required to provide governed project continuity and the requested feature.

Public, local and private-service surfaces should avoid sending or retaining:

- secrets or credentials;
- private chain-of-thought;
- unrestricted repository contents;
- full terminal output when a bounded result is sufficient;
- unrelated personal information;
- private data not required by the active Mission or contract;
- raw conversations when a bounded decision or evidence record is sufficient.

Exact beta data flows must be documented and compared with the final implementation before publication.

---

## Local data

The local Bridge and DUBSAR Desktop may store bounded local state required for:

- workspace recognition;
- native and canonical session continuity;
- worktree and process references;
- local diagnostics;
- cockpit operation;
- secure access state;
- restart and reconciliation observations.

Local state must not silently become a competing source of truth for canonical Mission, decision, evidence or Human Gate state.

Sensitive access keys should be held only through the supported secure local mechanism. They must not appear in adapter files, command arguments, ordinary logs, public evidence or metadata intended for the coding agent.

---

## Private service data

The private Backend and Core may receive bounded project metadata and governed records required for:

- Mission and workspace continuity;
- canonical session identity;
- lots and execution contracts;
- decisions and constraints;
- evidence relationships and verification status;
- audit;
- Human Gates and authorization state;
- replay and reconciliation.

A host adapter must not send arbitrary repository content merely because the coding agent can access the workspace.

Any content-bearing feature requires:

- an explicit product purpose;
- a defined scope;
- user-facing explanation;
- minimization and retention rules;
- appropriate authorization.

---

## Coding-agent hosts

DUBSAR operates inside or alongside a coding-agent host and is also subject to that host's independent data handling, account configuration and model-provider behavior.

For the first integration, this includes Claude Code.

DUBSAR does not control the host's separate privacy terms or the model provider's independent processing. Future adapters must document any host-specific differences before availability is claimed.

---

## Evidence and logs

Evidence should remain bounded to what is required to support a governed decision.

Public or tester-facing evidence must avoid:

- credentials and tokens;
- full private paths unless operationally necessary and protected;
- unrelated source content;
- raw private prompts;
- private chain-of-thought;
- unbounded stdout or terminal history;
- private tester data.

An agent declaration and a deterministic verification result must remain distinguishable.

---

## Beta access

Private beta access may require account, invitation, activation or licence metadata.

The final categories, retention periods, deletion procedures and user rights must be documented before commercial availability.

Do not submit real access keys, secrets, private service URLs, confidential repository content or sensitive personal information through public GitHub issues.

---

## Platform status

Windows is the first controlled private-beta target.

Linux validation is planned later. macOS support is not announced.

Platform-specific storage, secure-key handling, permissions, uninstall and deletion behavior must be documented before support is claimed for each platform.

---

## Publication blockers

Before Marketplace publication, the project must confirm:

- the exact data sent by the final plugin and Desktop build;
- the final canonical plugin version and package contents;
- local storage locations and removal behavior on supported Windows;
- whether Mission and workspace data survive update or reinstall intentionally;
- private-service retention rules;
- access, export and deletion procedures;
- the final public privacy contact and legal notice;
- differences introduced by any future host adapter;
- consistency between this document and the implemented product.

---

## Current status

```text
privacy notice: engineering boundary, not final legal notice
Windows controlled private beta: in preparation
Marketplace: not activated or announced
supported public installation: none
product generally available: no
public beta: no
marketplace-ready: no
audit engagement data terms: agreed per mandate before work begins
```

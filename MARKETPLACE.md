# Marketplace and Distribution

This repository is intended to become the **single public repository** for DUBSAR documentation and Claude Code Marketplace distribution.

There will not be a separate public doctrine repository and a second public Marketplace repository.

The Marketplace is **not activated or announced**.

---

## Product and adapter boundary

DUBSAR is a governance layer for long-running, multi-session AI coding projects.

Claude Code is the first supported integration. The Marketplace package distributes only the thin Claude Code adapter. The private Core remains host-independent and private.

Future adapters for Codex, Cursor or other coding-agent environments are product direction only. They are not distributed or claimed as operational here.

---

## Repository structure

The publication candidate is expected to contain:

```text
.claude-plugin/
  marketplace.json
plugins/
  scribe/                 # temporary technical compatibility path
    .claude-plugin/plugin.json
    .mcp.json
    commands/
    hooks/
    bin/
    src/
    package.json
    LICENSE
README.md
INSTALLATION.md
SECURITY.md
PRIVACY.md
CHANGELOG.md
INTEGRITY.md
```

The public product name is DUBSAR. The `plugins/scribe` path and `scribe-bridge` package name are temporary technical compatibility identifiers until a tested migration plan exists.

---

## Current staging state

The draft PR currently contains a vendored thin plugin runtime assembled from an earlier reviewed private commit:

```text
scribe-claude-code-plugin@c2878313198aceccac078bf9446c5ab45751e424
plugin version 0.11.1
```

This pin was valid for the earlier PR stage. It is **not the final publication candidate** after the one-session and two-session runtime work completed later.

The vendored runtime must remain frozen until it is deliberately replaced from the final approved canonical plugin commit. Documentation work may continue without pretending the old pin is the final beta package.

No manual edits should be made inside the vendored runtime to imitate a newer private version.

---

## Internal proof versus public availability

Internal Windows technical validation has completed:

- one real governed Claude Code session;
- two real sessions on the same Mission;
- distinct identities, processes and worktrees;
- separated evidence;
- explicit conflict handling;
- Human Gate and single-use authorization behavior;
- restart reconciliation.

This does not make the Marketplace publicly available.

The remaining product question is whether an approved package can be installed and used through a repeatable tester journey without hidden operator intervention.

---

## Publication blockers

Before the Marketplace is activated or announced:

1. Complete the DUBSAR public copy and remove legacy product-brand language.
2. Stabilize the Windows private-beta product journey.
3. Select the final canonical Claude Code plugin commit and version.
4. Re-vendor the plugin runtime from that single pin without manual runtime edits.
5. Regenerate per-file and aggregate integrity hashes.
6. Pass strict Claude Code Marketplace and plugin validation.
7. Confirm the final public plugin name and description.
8. Verify clean installation, update, rollback and removal on supported Windows.
9. Confirm the implemented data flow matches Privacy and Security documentation.
10. Confirm `security@dubsar.ai` and `licensing@dubsar.ai` exist and are monitored.
11. Document beta access and Desktop prerequisites honestly.
12. Decide whether the public repository is renamed before activation.
13. Obtain explicit Human GO to publish and announce the Marketplace.

Linux and macOS are not publication blockers for an initial Windows-only controlled beta unless product strategy later decides otherwise.

---

## Public plugin naming

The Marketplace id is intended to use the DUBSAR brand.

The current plugin technical id remains `scribe-bridge`. Before publication, the project must choose between:

- a clean public DUBSAR plugin id with tested compatibility handling; or
- a temporary historical technical id clearly described as compatibility-only.

No global rename is permitted without runtime, installation, update and migration tests.

---

## Compatibility identifiers

The first package may retain internal identifiers such as:

- `scribe-mcp`;
- `/scribe-*` commands;
- `scribe.*` MCP tools;
- `SCRIBE_*` environment variables;
- existing routes, tokens or local storage paths.

These identifiers are not public brands or separate products.

Future `/dubsar-*` aliases or deeper migrations require a separate compatibility plan.

---

## Platform status

- **Windows:** first controlled private-beta target, still in preparation.
- **Linux:** planned for later validation; not announced.
- **macOS:** not announced; feasibility and packaging remain to be evaluated.

Marketplace metadata must not list an operating system as supported until the corresponding package and product journey are proven.

---

## Installation commands

No public installation command is active.

Commands from legacy SCRIBE staging documentation are not canonical DUBSAR installation instructions.

When publication is authorized, this document and [INSTALLATION.md](INSTALLATION.md) will contain the supported commands for this repository and the approved package version.

---

## Distribution boundary

The Marketplace package may distribute only:

- the thin Claude Code adapter;
- approved public documentation;
- public metadata and licence files.

It must not distribute:

- the private Core;
- private Backend implementation;
- private tests, development scripts or internal reports;
- confidential proof artifacts;
- secrets or tokens;
- tester data;
- private prompts or policies.

---

## Canonical status

```text
DUBSAR Marketplace: NOT ACTIVATED OR ANNOUNCED
Windows controlled private beta: IN PREPARATION
final public plugin pin: NOT SELECTED
public repository rename: NOT PERFORMED
supported public installation: NONE
product generally available: NO
public beta: NO
marketplace-ready: NO
```

This status block applies to product distribution. It does not describe the availability of the separately scoped [DUBSAR Audit professional service](AUDIT.md).

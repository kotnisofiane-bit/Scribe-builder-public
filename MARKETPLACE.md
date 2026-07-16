# Marketplace and Distribution

This repository is intended to become the **single public repository** for DUBSAR documentation and Claude Code Marketplace distribution.

There will not be a separate public doctrine repository and a second public Marketplace repository.

---

## Target repository structure

When the beta package is approved, this repository is expected to contain:

```text
.claude-plugin/
  marketplace.json
plugins/
  dubsar/
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
```

The exact package tree must come from the reviewed private staging source and be re-verified before publication.

---

## Current state

A Marketplace package was previously assembled and validated in the private plugin repository under the legacy SCRIBE name.

That work is preserved, but it is **not published** and should not be copied unchanged because:

- the public product name is now DUBSAR;
- public descriptions must reflect the plugin-first beta;
- the package name and metadata require review;
- the licence is still a draft requiring human approval;
- the security contact must be finalized;
- package integrity must be regenerated from the final DUBSAR plugin commit.

---

## Publication blockers

The Marketplace must remain unpublished until all of the following are complete:

1. DUBSAR public name and copy are consistent across the site, Desktop, plugin and repository.
2. The final public plugin name and description are validated.
3. The plugin runtime is vendored from a pinned reviewed private commit.
4. Integrity hashes are regenerated for the final vendored tree.
5. The distribution licence is read and explicitly approved by the human owner.
6. A real security contact is published.
7. Privacy and beta limitations are consistent with the actual data flow.
8. Strict plugin validation passes.
9. Clean installation and removal are tested on the supported environment.
10. Beta access and Desktop prerequisites are documented honestly.
11. Human GO to publish is explicit.

---

## Compatibility identifiers

The first DUBSAR package may retain internal identifiers such as:

- `scribe-mcp`;
- `/scribe-*` commands;
- an internal MCP server name;
- existing routes, tokens or local storage paths.

These identifiers are retained only where renaming would break the tested runtime. Public labels, descriptions and user-facing copy should use DUBSAR.

Future `/dubsar-*` aliases or deeper migrations require a separate compatibility plan and must not be invented through an untested global rename.

---

## Installation commands

No public installation command is active yet.

Commands from the legacy private staging documentation must not be presented as current DUBSAR installation instructions.

When publication is authorized, this document and [INSTALLATION.md](INSTALLATION.md) will contain the canonical commands for this same repository.

---

## Distribution boundary

The Marketplace package may distribute only the thin plugin runtime and approved public documentation.

It must not distribute:

- the private Core;
- private backend implementation;
- private tests, development scripts or internal reports;
- confidential proof artifacts;
- secrets or tokens;
- tester data;
- private prompts or policies.

---

## Canonical status

```text
DUBSAR Marketplace: NOT PUBLISHED
public repository rename: NOT PERFORMED
licence: PENDING HUMAN APPROVAL
security contact: PENDING
not commercial-ready
```

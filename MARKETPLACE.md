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

The DUBSAR Claude Code plugin runtime is now **vendored** into this repository at
`plugins/scribe/`, clean-room reassembled from a single pinned private commit
(`scribe-claude-code-plugin@c2878313`), with `.claude-plugin/marketplace.json` and
per-file integrity in `INTEGRITY.md`. The thin plugin source is therefore
**publicly visible and downloadable** here.

However, the **DUBSAR Claude Code Marketplace is not yet activated or announced**,
and there is **no supported public installation yet**:

- the public product name is DUBSAR; internal `scribe` / `scribe-bridge` remain only
  as documented historical technical identifiers;
- public descriptions reflect the plugin-first beta;
- the distribution licence is now **in force** (LICENSE, ratified 2026-07-16) — this
  covers only the thin plugin, never the private Backend/Core;
- a public security contact is designated (security@dubsar.ai);
- integrity hashes are regenerated for the vendored tree (INTEGRITY.md).

---

## Publication blockers

Completed in this review:

- ✅ the plugin runtime is vendored from a pinned reviewed private commit (`plugins/scribe/`);
- ✅ integrity hashes are regenerated for the vendored tree (`INTEGRITY.md`);
- ✅ the distribution licence is explicitly approved and in force (`LICENSE`, ratified 2026-07-16 by Sofiane Kotni);
- ✅ a public security contact is designated (`security@dubsar.ai`) — to be confirmed live and monitored before activation.

Still required before the Marketplace is activated or announced:

1. DUBSAR public name and copy are consistent across the site, Desktop, plugin and repository.
2. The final public plugin name and description are validated.
3. Privacy and beta limitations are consistent with the actual data flow.
4. Clean installation and removal are tested on the supported environment.
5. Explicit human GO to activate/announce the Marketplace (and the separate repository rename).
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
licence: IN FORCE (ratified 2026-07-16 by Sofiane Kotni)
security contact: designated (security@dubsar.ai) — live monitoring to be confirmed
not commercial-ready
```

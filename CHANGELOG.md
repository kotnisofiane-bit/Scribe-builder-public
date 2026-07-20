# Changelog

All notable public repository and Marketplace changes will be recorded here.

## Unreleased — DUBSAR public realignment R2

### Changed

- public product name and current-facing copy standardized on DUBSAR;
- public positioning broadened from a Claude Code-only product to a host-adapter governance layer for long-running AI coding projects;
- Claude Code retained as the first supported integration;
- Codex, Cursor and other coding-agent adapters classified as future direction, not current availability;
- public architecture aligned with host adapter → local Bridge/runtime → private Backend → private Core → human-facing cockpit;
- canonical session, worktree, process, evidence and Human Gate responsibilities clarified;
- internal one-session and two-session Windows technical proofs reflected without claiming public beta availability;
- Windows identified as the first controlled private-beta target;
- Linux classified as later validation and macOS as unannounced pending feasibility;
- speculative Scribe Launcher and Eyes of SCRIBE product brands removed from current product surfaces;
- legacy internal `scribe` identifiers retained only where required for compatibility;
- `WHY_SCRIBE.md` replaced by `WHY_DUBSAR.md`.

### Marketplace staging

- existing public PR remains the single documentation and future Marketplace home;
- Marketplace remains not activated or announced;
- no supported public installation command is active;
- the currently vendored plugin `0.11.1` pin is documented as an earlier staging pin, not the final publication candidate;
- final runtime re-vendoring, hashes and strict validation are deferred until the Windows product journey selects an approved canonical plugin commit.

### Added or refreshed

- host-independent product definition;
- explicit multi-session public architecture;
- Windows-first installation boundary;
- platform status for Windows, Linux and macOS;
- distinction between internal technical proof and external product validation;
- adapter direction for Codex, Cursor and other coding agents.

### Not published

- no Marketplace activation or announcement;
- no public installation command;
- no release or tag;
- no repository rename;
- no Linux or macOS support claim;
- no operational Codex or Cursor support claim;
- no private Core or Backend implementation exposed.

```text
not commercial-ready
not beta-ready
not marketplace-ready
```

## Legacy history

Earlier repository history documents the project under SCRIBE and Scribe Builder. Git history is intentionally preserved and should not be rewritten. Legacy names are not current public product brands.

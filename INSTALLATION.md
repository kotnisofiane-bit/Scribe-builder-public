# Installation

There is no supported public DUBSAR installation yet.

The controlled private beta is being prepared for Windows first. The final public package, Marketplace pin and installation commands are not yet approved.

Do not treat the visible staging plugin source as a complete or supported installation path.

---

## Intended Windows beta journey

The target tester flow is:

1. Receive controlled beta access.
2. Download the approved DUBSAR Windows package from the authorized channel.
3. Install DUBSAR Desktop and the local runtime.
4. Install the approved DUBSAR Claude Code plugin from this Marketplace after publication.
5. Approve the required Claude Code plugin and MCP prompts.
6. Start DUBSAR through the supported Claude Code flow.
7. Verify local component and access state.
8. Recognize or attach the intended workspace.
9. Resume an existing Mission or create a new one.
10. Complete a bounded governed task and understand the resulting evidence or Human Gate.
11. Restart and resume without hidden operator repair.

The beta is not ready until this path is reproducible with the approved package and documented recovery behavior.

---

## Current platform status

### Windows

First controlled private-beta target. Packaging, installation and the end-to-end tester journey are still being finalized and validated.

### Linux

Planned for validation after Windows stabilizes. No supported Linux package or beta is currently announced.

### macOS

Not currently announced. Packaging, signing, notarization, permissions, secure storage and runtime behavior must be evaluated before any support claim.

---

## Current prerequisites under validation

- supported Claude Code version;
- approved DUBSAR Desktop/runtime package;
- approved Claude Code plugin pin and version;
- Windows architecture and version support;
- local process and worktree behavior;
- beta access or activation state;
- network access to the private service where required;
- secure local token and permission handling;
- clean update, rollback and removal;
- preservation or migration of Mission and workspace state;
- honest diagnostics when a component is unavailable.

---

## Internal compatibility names

Early beta diagnostics may display internal `scribe` identifiers such as:

- `scribe-mcp`;
- `/scribe-*` commands;
- `scribe.*` tools;
- `SCRIBE_*` environment variables;
- historical local paths or component names.

These are technical compatibility identifiers, not a second product name.

Do not manually rename executables, paths, commands, routes or stored state unless an official tested migration is published.

---

## Do not use legacy commands

Installation commands from earlier SCRIBE staging material are not canonical DUBSAR instructions.

Do not:

- install from an unpublished Marketplace path;
- copy a private staging package into a public installation manually;
- mix an old Desktop package with a newer plugin or Backend pin;
- assume that source visibility means the complete product is publicly installable;
- replace internal identifiers through a global search and replace.

---

## Package provenance requirement

A supported package must identify and verify the exact versions of the components it executes.

At minimum, the publication evidence must bind:

- Desktop package commit and installer hash;
- Bridge commit;
- Backend compatibility pin;
- Claude Code plugin commit and version;
- required private Core compatibility state;
- supported Claude Code version;
- supported operating system.

A green CI run alone is not a user installation proof.

---

## Publication status

```text
Windows controlled private beta: in preparation
supported public installation: none
public Marketplace: not activated or announced
final plugin pin: not selected
Linux package: not announced
macOS package: not announced
not commercial-ready
not beta-ready
not marketplace-ready
```

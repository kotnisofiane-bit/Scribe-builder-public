---
description: SCRIBE — rescan the attached workspace structurally and report changes (read-only, via MCP).
---

`/scribe-workspace-manifest` rescans the attached workspace **structurally**
through this plugin's read-only MCP server (`scribe-bridge`): it recomputes the
manifest (names, kinds, sizes, extensions, depth) and its keyless digest, and
reports whether the structure changed since the last scan. It reads no file
content, produces no diff, runs no Git, and never claims which file changed —
only that the structure did or did not change.

Use the SCRIBE MCP tool `scribe.workspace_manifest` and report its result: the
entry count, the digest, `changed` (true/false), and the exclusions. Do not
interpret the change beyond what the tool reports.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

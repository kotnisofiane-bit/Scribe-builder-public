---
description: SCRIBE — report the attached workspace (read-only, via MCP).
---

`/scribe-workspace-status` reports the workspace attached to your SCRIBE session
through this plugin's read-only MCP server (`scribe-bridge`): root, workspace id,
entry count, and last structural digest. It rescans nothing, reads no file
content, runs no Git, and writes nothing.

Use the SCRIBE MCP tool `scribe.workspace_status` and report its result. If no
workspace is attached, say so plainly.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

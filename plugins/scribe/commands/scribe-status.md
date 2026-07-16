---
description: SCRIBE Bridge — report the static status JSON (read-only, via MCP).
---

`/scribe-status` reports the local SCRIBE Bridge static status JSON through
this plugin's read-only MCP server (`scribe-bridge`). It reads no repository,
writes nothing, and calls no backend.

Use the SCRIBE MCP tool `scribe.status` and summarize the reported status for
the user, keeping the field values exactly as returned.

If the tool is unavailable or returns an error, relay the error text exactly
as given and stop. Do not run any shell or terminal command, do not search
the filesystem or the disk, and do not try to locate, open, or execute any
wrapper script or file yourself. Do not take any further action.

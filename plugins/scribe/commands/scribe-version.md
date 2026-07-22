---
description: SCRIBE Bridge — report the version line (read-only, via MCP).
---

`/scribe-version` reports the local SCRIBE Bridge version through this
plugin's read-only MCP server (`scribe-bridge`). It reads no repository,
writes nothing, and calls no backend.

Use the SCRIBE MCP tool `scribe.version` and report its result to the user
verbatim.

If the tool is unavailable or returns an error, relay the error text exactly
as given and stop. Do not run any shell or terminal command, do not search
the filesystem or the disk, and do not try to locate, open, or execute any
wrapper script or file yourself. Do not take any further action.

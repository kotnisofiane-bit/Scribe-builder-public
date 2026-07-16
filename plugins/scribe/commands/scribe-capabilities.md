---
description: SCRIBE Bridge — report the capability manifest (read-only, via MCP).
---

`/scribe-capabilities` reports the local SCRIBE Bridge capability manifest
(allowed + forbidden) through this plugin's read-only MCP server
(`scribe-bridge`). It reads no repository, writes nothing, and calls no
backend.

Use the SCRIBE MCP tool `scribe.capabilities` and summarize the allowed and
forbidden capabilities for the user, keeping the values exactly as returned.

If the tool is unavailable or returns an error, relay the error text exactly
as given and stop. Do not run any shell or terminal command, do not search
the filesystem or the disk, and do not try to locate, open, or execute any
wrapper script or file yourself. Do not take any further action.

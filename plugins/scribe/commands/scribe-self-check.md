---
description: SCRIBE Bridge — run local structural invariant checks (read-only, via MCP).
---

`/scribe-self-check` runs the local SCRIBE Bridge structural invariant checks
through this plugin's read-only MCP server (`scribe-bridge`). The check is
filesystem-free and network-free on the Bridge side. It reads no repository,
writes nothing, and calls no backend.

Use the SCRIBE MCP tool `scribe.self_check` and report whether the self-check
passed (`ok: true`) or failed, summarizing any reported findings.

If the tool is unavailable or returns an error, relay the error text exactly
as given and stop. Do not run any shell or terminal command, do not search
the filesystem or the disk, and do not try to locate, open, or execute any
wrapper script or file yourself. Do not take any further action.

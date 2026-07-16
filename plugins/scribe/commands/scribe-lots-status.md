---
description: SCRIBE — read the current lots snapshot and selection state (read-only, via MCP).
---

`/scribe-lots-status` reads the **current lots snapshot** of the session's mission
through this plugin's MCP server (`scribe-bridge`). It is **read-only**: only opaque
ids ride the wire; nothing is selected, changed, run, or approved.

Use the SCRIBE MCP tool `scribe.lots_status` (default session). Report the result
plainly: each proposed lot (opaque `lot_id`, title, status) and — clearly — which
lot is currently selected (`selected_lot_id`), or that none is selected yet.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error (including "no mission for session"),
relay the error text exactly as given and stop. Do not run any shell or terminal
command, do not search the filesystem or the disk, and do not try to locate, open,
or execute any wrapper script or file yourself. Do not take any further action;
reading lots is not an approval, and Human GO remains a separate, manual step.

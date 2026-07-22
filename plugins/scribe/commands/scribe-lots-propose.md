---
description: SCRIBE — ask the Core for governed lot proposals for the current mission (metadata-only, via MCP).
---

`/scribe-lots-propose` asks the private Core (through the backend, via this plugin's
MCP server `scribe-bridge`) for the **governed lot proposals** of the session's
mission. The proposals are deterministic, bounded, **metadata-only** drafts — never
executable; only **opaque ids** ride the wire (no path, name, content, secret, or
token). Nothing is selected, run, audited, sealed, or approved.

Use the SCRIBE MCP tool `scribe.lots_propose` (default session). Report the result
plainly: the mission id, then EACH proposed lot with its opaque `lot_id`, title,
objective, scope kind, and risks — so the human can review them and choose. State
explicitly that **no lot is selected** until the human names one, and that selecting
happens only via `/scribe-lot-select`.

Do not choose, recommend by default, or call any selection tool yourself; proposing
lots is not a selection. Never perform any HTTP from Claude — only ask the SCRIBE
MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; a lot proposal is not an
approval, and Human GO remains a separate, manual step.

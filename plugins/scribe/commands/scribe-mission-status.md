---
description: SCRIBE — look up a governed mission by its opaque id (metadata-only, via MCP).
---

`/scribe-mission-status` looks up a **governed mission** through this plugin's MCP
server (`scribe-bridge`). It is **read-only toward the mission**: the Bridge sends
only the opaque mission id recorded for this session (a **metadata-only** lookup —
never a path, name, content, secret, or token) and returns the closed Core snapshot;
it changes nothing, starts no agent, no job, no execution, and triggers no Human GO.

Use the SCRIBE MCP tool `scribe.mission_status` (default session; omit `mission_id`
to use the session's current recorded mission). Report its result plainly: whether
the backend is **configured**; whether the mission was **found**; and the returned
**mission id**, **status**, and **next_action**.

Never read, parse, or print the backend token or URL yourself, and never perform
any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error (including "no mission for session"),
relay the error text exactly as given and stop. Do not run any shell or terminal
command, do not search the filesystem or the disk, and do not try to locate, open,
or execute any wrapper script or file yourself. Do not take any further action;
reading a mission is not an approval, and Human GO remains a separate, manual step.

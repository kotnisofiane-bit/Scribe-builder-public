---
description: SCRIBE — resume a governed mission after a restart by its opaque id (metadata-only, via MCP).
---

`/scribe-mission-resume` resumes a **governed mission** after a restart through this
plugin's MCP server (`scribe-bridge`). The Core reloads and re-verifies the mission
and returns the SAME opaque mission id and closed snapshot. It is **read-only toward
the mission**: the Bridge sends only the opaque mission id (a **metadata-only**
lookup — never a path, name, content, secret, or token); it starts no agent, no job,
no execution, and triggers no Human GO.

Use the SCRIBE MCP tool `scribe.mission_resume` (default session; omit `mission_id`
to use the session's current recorded mission). Report its result plainly: whether
the backend is **configured**; whether the mission was **resumed**; and that the
returned **mission id** is the SAME as at creation, with its **status** and
**next_action**.

Never read, parse, or print the backend token or URL yourself, and never perform
any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; resuming a mission is not
an approval, and Human GO remains a separate, manual step.

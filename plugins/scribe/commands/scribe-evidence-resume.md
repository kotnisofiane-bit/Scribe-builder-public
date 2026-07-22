---
description: SCRIBE — resume the typed evidence after a restart (read-only, via MCP).
---

`/scribe-evidence-resume` resumes the evidence after a restart through this plugin's
MCP server (`scribe-bridge`): the Core reloads and re-verifies it, returning the
**SAME** opaque ids and evidence head. It is read-only; nothing is run, verified, or
approved.

Use the SCRIBE MCP tool `scribe.evidence_resume` (default session; omit `execution_id`
to use the session's current attempt — including from a new session on the same
attached workspace). Report the result plainly: the same evidence head, the tier
counts (`verified_count` is `0` in R1), and the visible missing evidence.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Resuming evidence is not a verification or an approval; Human GO remains a
separate, manual step.

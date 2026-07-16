---
description: SCRIBE — resume the non-launched execution attempt after a restart (via MCP).
---

`/scribe-execution-resume` resumes the ExecutionAttempt after a restart through this
plugin's MCP server (`scribe-bridge`): the Core reloads and re-verifies it, returning
the **SAME** opaque `execution_id` and the never-launched snapshot. It is read-only;
nothing is run or approved.

Use the SCRIBE MCP tool `scribe.execution_resume` (default session; omit
`execution_id` to use the session's current attempt — including from a new session on
the same attached workspace). Report the result plainly: the same opaque
`execution_id`, `execution_status=not_started`, and `next_action`.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Resuming an attempt is not an execution or an approval; Human GO remains a
separate, manual step.

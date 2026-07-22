---
description: SCRIBE — read the non-launched execution attempt (read-only, via MCP).
---

`/scribe-execution-status` reads the ExecutionAttempt snapshot through this plugin's
MCP server (`scribe-bridge`). It is **read-only**: only opaque ids ride the wire;
nothing is changed, run, or approved.

Use the SCRIBE MCP tool `scribe.execution_status` (default session; omit
`execution_id` to use the session's current attempt). Report the result plainly: the
opaque `execution_id`, the never-launched posture (`execution_status=not_started`,
`agent_run_started=false`, `workspace_mutated=false`, `human_go_present=false`), any
DECLARED candidate report, and `next_action`.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error (including "no execution for session"),
relay the error text exactly as given and stop. Do not run any shell or terminal
command, do not search the filesystem or the disk, and do not try to locate, open, or
execute any wrapper script or file yourself. Reading an attempt is not an execution or
an approval; Human GO remains a separate, manual step.

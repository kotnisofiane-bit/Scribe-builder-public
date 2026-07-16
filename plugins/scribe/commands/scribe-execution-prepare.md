---
description: SCRIBE — prepare a NON-LAUNCHED execution attempt for the contract (via MCP).
---

`/scribe-execution-prepare` prepares a **non-launched** ExecutionAttempt for the
session's governed ExecutionContract, through this plugin's MCP server
(`scribe-bridge`). It starts **nothing**: no agent, no runner, no workspace change,
no Human GO.

Only opaque ids and bounded metadata ride the wire (**metadata-only**); no file
content is ever sent.

Use the SCRIBE MCP tool `scribe.execution_prepare` (default session; omit
`contract_id` to use the session's current contract). Report the result plainly: the
opaque `execution_id`, its `execution_status` (`not_started`), `executor_kind`
(`none`), and `next_action` (`provide_candidate_report`). Make it clear that no
execution has occurred — the attempt is prepared for review only.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Preparing an attempt is not an execution and not an approval; Human GO
remains a separate, manual step.

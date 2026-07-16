---
description: SCRIBE — record a DECLARED candidate execution report (via MCP).
---

`/scribe-execution-report` records a **candidate** ExecutionReport for the attempt
through this plugin's MCP server (`scribe-bridge`). A report is an **assertion, never
a proof**: the Core stores it with `report_tier=DECLARED` and `authoritative=false`.
It may NEVER claim a real run, an audit pass, a human approval, a seal, or a VERIFIED
outcome.

Only opaque ids and the bounded declared report ride the wire (**metadata-only**); no
file content is ever sent.

Use the SCRIBE MCP tool `scribe.execution_report` (default session; omit
`execution_id` to use the session's current attempt). Provide the `report` object with
the coder's CLAIMED status, changed paths (relative only), declared test counts,
outputs, and reserves. Report the result plainly: the opaque `report_id` and its
`DECLARED` tier. Make clear that nothing has been verified — the declared report
awaits human review.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool. Do not assert the
work was actually executed or that any claim is verified.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Recording a declared report is not an execution, a verification, or an
approval; Human GO remains a separate, manual step.

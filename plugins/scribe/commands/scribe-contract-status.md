---
description: SCRIBE — read the governed ExecutionContract draft (read-only, via MCP).
---

`/scribe-contract-status` reads the governed **ExecutionContract draft** through
this plugin's MCP server (`scribe-bridge`). It is **read-only**: only opaque ids
ride the wire; nothing is changed, run, or approved.

Use the SCRIBE MCP tool `scribe.contract_status` (default session; omit
`contract_id` to use the session's current contract). Report the result plainly:
the opaque `contract_id`, its mission and lot ids, `status`, the coder/auditor
roles, the allowed scope with the forbidden and sensitive zones, the expected
evidence, the validation criteria, and `next_action`.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error (including "no contract for
session"), relay the error text exactly as given and stop. Do not run any shell or
terminal command, do not search the filesystem or the disk, and do not try to
locate, open, or execute any wrapper script or file yourself. Do not take any
further action; reading a contract is not an approval, and Human GO remains a
separate, manual step.

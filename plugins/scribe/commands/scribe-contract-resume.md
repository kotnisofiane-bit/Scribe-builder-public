---
description: SCRIBE — resume the governed ExecutionContract draft after a restart (metadata-only, via MCP).
---

`/scribe-contract-resume` resumes the governed **ExecutionContract draft** after a
restart through this plugin's MCP server (`scribe-bridge`). The Core reloads and
re-verifies the contract and returns the SAME opaque contract id and closed draft
snapshot. It is **metadata-only**: only opaque ids ride the wire; nothing is run,
audited, sealed, or approved.

Use the SCRIBE MCP tool `scribe.contract_resume` (default session; omit
`contract_id` to use the session's current contract — a new session on the same
workspace finds it again through the local registry). Report the result plainly:
that the returned **contract id is the SAME** as at creation, with its mission and
lot ids, `status` (`contract_draft`), `execution_status` (`not_started`), and
`next_action` (`review_contract`).

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; resuming a contract is not
an approval, and Human GO remains a separate, manual step.

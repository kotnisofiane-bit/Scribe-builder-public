---
description: SCRIBE — create the draft-only ExecutionContract for the selected lot (metadata-only, via MCP).
---

`/scribe-contract-draft` asks the private Core (through the backend, via this
plugin's MCP server `scribe-bridge`) to create — or idempotently re-read — the
canonical **draft-only ExecutionContract** for the lot the human explicitly
selected. It is **metadata-only**: only opaque ids ride the wire. The contract has
**no execution authority**: no agent, no runner, no job, no audit, no seal, no
Human GO — it awaits human review.

Use the SCRIBE MCP tool `scribe.contract_draft` (default session; the selected lot
is resolved locally, or pass an explicit opaque `lot_id`). Report the result
plainly: the opaque `contract_id`, `status` (`contract_draft`), the DISTINCT coder
and auditor roles, the allowed scope, the **forbidden and sensitive zones**, the
expected evidence, the validation criteria, `execution_status` (`not_started`), and
`next_action` (`review_contract`).

If the Core refuses because no lot is selected, say so and point the user to
`/scribe-lots-status` and `/scribe-lot-select`; do not select anything yourself.
Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; a contract draft is not an
execution approval, and Human GO remains a separate, manual step.

---
description: SCRIBE — record the user's lot choice as a non-authoritative selection request (metadata-only, via MCP).
argument-hint: [lot id]
---

`/scribe-lot-select` records in the private Core (through the backend, via this
plugin's MCP server `scribe-bridge`) the lot the user chose by running this
command. It is **metadata-only**: only **opaque ids** ride the wire. Nothing is
run, audited, sealed, or approved by selecting a lot.

**Honesty note (R2)**: Claude Code offers no technically reliable channel proving
a human invoked this command, so the recorded selection is a **non-authoritative
client declaration** (`selection_origin=client_declared_user_command`,
`authoritative=false`) — the system never claims a verified human selection.

The lot id provided by the user is, verbatim:

$ARGUMENTS

Call the SCRIBE MCP tool `scribe.lot_select` with `lot_id` set to that id **exactly
as written above — verbatim, byte for byte** (do not invent, guess, correct,
normalize, or otherwise transform it) and `confirm_selection` set to `true` —
allowed HERE ONLY because the human explicitly named this lot by running this
command with it. NEVER call `scribe.lot_select` on your own initiative, never pick
a lot for the user, and never set `confirm_selection` outside this explicit command:
nothing may auto-select. When reporting the result, state that the selection was
recorded as a non-authoritative client declaration awaiting human review.

If the lot id above is empty, do not call the tool: show the proposed lots
(`/scribe-lots-status`), ask the user to name one, and stop. If the Core reports a
conflict (a different lot is already selected), relay it exactly and stop — never
switch a selection silently.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; a lot selection is not an
execution approval, and Human GO remains a separate, manual step.

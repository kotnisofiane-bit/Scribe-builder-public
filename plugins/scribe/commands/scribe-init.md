---
description: SCRIBE — canonical init (read-only probes, via MCP) then initialize the local decision session.
---

`/scribe-init` is the canonical command. It performs a **read-only dry local
init** and then initializes your local decision session, through this plugin's
read-only MCP server (`scribe-bridge`). It attaches no repository, reads no user
files, starts no backend or dashboard, and performs no Git action.

Do exactly this, in order, and nothing else:

1. Call the SCRIBE MCP tool `scribe.init` (the four read-only probes: version,
   status, capabilities, self-check) and relay its report.
2. **Only if** that report shows the Bridge was found (`SCRIBE Bridge found:
   yes`) and its self-check is ok (`self_check: ok`), call the SCRIBE MCP tool
   `scribe.session_init` and relay its result too (session_id, journal_id,
   created or existing, entry_count, journal_valid).
3. If the probes failed (Bridge not found, or self-check not ok), do **not**
   call `scribe.session_init`; relay the probe error and stop.

Report both results together so the user sees: Bridge found, self_check ok,
session_id, journal_id, created or existing, entry_count, journal_valid. This
prepares the session so that a later `/scribe-record` does not fail with
`unknown_session`.

If a tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

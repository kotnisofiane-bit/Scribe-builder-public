---
description: SCRIBE — read the typed evidence with its strict tiers (read-only, via MCP).
---

`/scribe-evidence-status` reads the evidence snapshot through this plugin's MCP server
(`scribe-bridge`). It is **read-only**: only opaque ids ride the wire; nothing is
changed, run, verified, or approved.

Use the SCRIBE MCP tool `scribe.evidence_status` (default session; omit `execution_id`
to use the session's current attempt). Report the result plainly: each record's tier
(`DECLARED` / `VERIFIED` / `MISSING` / `INVALID`), the tier counts (note that
`verified_count` is `0` in R1), the visible missing expected evidence, and the evidence
head. Never describe declared evidence as verified.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Reading evidence is not a verification or an approval; Human GO remains a
separate, manual step.

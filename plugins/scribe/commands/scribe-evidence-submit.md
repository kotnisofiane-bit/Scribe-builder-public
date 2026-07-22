---
description: SCRIBE — submit typed evidence for the attempt; the Core assigns tiers (via MCP).
---

`/scribe-evidence-submit` submits **typed** EvidenceRecords for the attempt through
this plugin's MCP server (`scribe-bridge`). The **Core** assigns each record's strict
tier — `DECLARED` / `VERIFIED` / `MISSING` / `INVALID` — never a client flag. In R1
`VERIFIED` is unreachable (no allowlisted deterministic verifier exists), so declared
evidence stays `DECLARED`; expected evidence the contract requires but that is absent
is surfaced as `MISSING`.

Only opaque ids and the bounded typed evidence ride the wire (**metadata-only**); no
file content is ever sent.

Use the SCRIBE MCP tool `scribe.evidence_submit` (default session; omit `execution_id`
to use the session's current attempt). Provide `evidence_records` with each record's
type, source kind, target reference, optional report id, optional sha256 digest, and a
bounded summary; leave `verifier_id` and `verification_method` null (a verifier claim
is refused in R1). Report the result plainly: the tier counts, the visible missing
evidence, and the evidence head. Never describe any evidence as verified unless the
Core tiered it `VERIFIED`.

Never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as given
and stop. Do not run any shell or terminal command, do not search the filesystem or
the disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Recording declared evidence is not a verification or an approval; Human GO
remains a separate, manual step.

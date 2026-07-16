---
description: SCRIBE — replay the local decision session (readable trace + hashes + digest) via MCP.
---

`/scribe-replay` replays your local SCRIBE decision session through this
plugin's read-only MCP server (`scribe-bridge`). It returns the ordered entries
(each with its readable summary, `index`, `previous_hash`, and `entry_hash`) and
the final integrity digest. It reads no repository, writes nothing, runs no Git,
and calls no backend.

Use the SCRIBE MCP tool `scribe.replay` and report its result to the user. Show
the chronology (event type + readable summary in order), the hashes, and the
final digest. Do not claim that the recorded content is validated, approved, or
correct — replay reports what was noted, nothing more.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

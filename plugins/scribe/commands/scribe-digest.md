---
description: SCRIBE — report the local session's deterministic keyless integrity digest (read-only, via MCP).
---

`/scribe-digest` reports the deterministic, keyless integrity digest of your
local SCRIBE decision session through this plugin's read-only MCP server
(`scribe-bridge`). It reads no repository, writes nothing, runs no Git, and calls
no backend.

Use the SCRIBE MCP tool `scribe.digest` and report its result to the user. When
you present the digest, remind the user that it is a local integrity check only:
it is keyless — **no signature, no legal proof, no seal authority** — and it is
not a governance decision.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

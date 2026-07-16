---
description: SCRIBE — send an explicit, opt-in metadata-only backend probe (via MCP).
---

`/scribe-backend-probe` sends ONE explicit, opt-in **metadata-only** probe to the
configured SCRIBE backend through this plugin's MCP server (`scribe-bridge`). It
transmits only structural **counts**, keyless **hashes**, and bounded random
per-send references — **never** a path, name, filename, file content, Git data,
secret, or token. It makes no core call, starts no job, uploads no file, reads or
writes no repository, and triggers no Human GO.

Use the SCRIBE MCP tool `scribe.backend_probe` (default session) and report its
result plainly:

- whether the backend is **configured** (`SCRIBE_BACKEND_URL` +
  `SCRIBE_BACKEND_PREVIEW_TOKEN`); if not, say it is not configured and that
  nothing was sent;
- whether a request was **sent** or **refused**, and why;
- the exact **kind of data** projected (and the projected payload shown for local
  inspection), the `request_id`, and the `contract_version`;
- the backend **receipt** and its **status**, if a request was sent.

Do not treat the receipt as an approval, a briefing, or a decision. Never read,
parse, or print the token or URL yourself, and never perform any HTTP from
Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; sending a metadata probe
is not an approval, and Human GO remains a separate, manual step.

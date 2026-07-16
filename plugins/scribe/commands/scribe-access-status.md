---
description: SCRIBE — read the installation access status (metadata-only; safe fields only).
---

`/scribe-access-status` reports the SCRIBE beta access status for this
installation. It takes **no arguments** and sends ONE **metadata-only** request
through this plugin's MCP server (`scribe-bridge`) — it transmits **no** license
key, activation code, email, or token.

Call the SCRIBE MCP tool `scribe.access_status` (it takes an empty, closed input
object) and report, in plain language, **only** these safe fields exactly as the
tool returned them:

- **state** — the access state (e.g. `not_activated`, `activation_required`,
  `active`, `grace`, `expired`, `revoked`, or `unavailable`);
- **plan** — the access plan, if any;
- **masked key** — the masked `display_key` (e.g. `SCRIBE_****AB12`), if any;
- **last validation** — `last_validated_at`, if any;
- **expiration** — `expires_at`, if any;
- **grace** — `grace_expires_at`, if any;
- **next action** — the reported `next_action`.

If the local Backend is not configured or not reachable, the result reports
`access_backend_unavailable` / `access_state: unavailable`; say so plainly and do
not invent a state, a key, or a date. The reported state is computed only by the
local Backend (from its real Polar validation and offline grace); the plugin and
the Bridge never compute it and never see the key.

Never print or reconstruct a full key, a token, a credential, an internal or
backend URL, or an absolute local path, and never perform any HTTP yourself — only
ask the SCRIBE MCP tool. This command is read-only for you; it approves nothing and
activates nothing.

If the tool is unavailable or returns an error, relay the error text exactly as
given and **stop**. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Human GO remains a separate, manual step.

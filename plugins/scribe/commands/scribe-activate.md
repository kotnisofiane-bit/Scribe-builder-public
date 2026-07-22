---
description: SCRIBE — prepare beta access activation (metadata-only; the key is never entered here).
---

`/scribe-activate` prepares the SCRIBE beta access activation surface. It takes
**no arguments**. It sends ONE **metadata-only** request through this plugin's MCP
server (`scribe-bridge`) to ask the Bridge to prepare an activation session — it
transmits **no** license key, activation code, email, or token.

Call the SCRIBE MCP tool `scribe.access_prepare` (it takes an empty, closed input
object) and then act on its result:

- If it returns a valid temporary **local** `activation_url`, present that URL to
  the user **as a link** and explain, in plain language, that the license key must
  be entered **only** on that local activation page (served by the local Backend on
  loopback) — **never here in Claude**. The local Backend receives the key, calls
  Polar, and stores it in the operating system's secure store; the plugin, the
  Bridge, and Claude never see it. Then take **no** further action.
- If the local Backend is not configured or not reachable (the result reports
  `access_backend_unavailable` / `access_state: unavailable`), say exactly:
  **"Activation surface prepared but the local Backend is not reachable."** Do not
  invent an activation, a key, or a URL.

Absolute rules for this command:

- **Never** ask the user to paste, type, or provide a license key, activation code,
  or token in Claude, and never show a "enter your key here" prompt in the
  conversation.
- **Never** read a key from stdin, an environment variable, a file, the clipboard,
  or a license file, and never try to locate or open one.
- **Never** open a browser or a page through a shell; only present the local URL as
  a link for the user to open themselves.
- Do not print or reconstruct any secret, token, backend URL, or absolute local
  path, and never perform any HTTP yourself — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error, relay the error text exactly as
given and **stop**. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Preparing an activation surface is not an activation and
not an approval; Human GO remains a separate, manual step.

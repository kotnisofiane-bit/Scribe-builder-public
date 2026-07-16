---
description: SCRIBE — unified start (metadata-only, via MCP); enter SCRIBE with one command.
---

`/scribe-start` is the unified way to enter SCRIBE. Through this plugin's MCP
server (`scribe-bridge`) it asks the SCRIBE Bridge to: check the installation,
join (or start, when explicitly configured) the local backend, reflect the
access state, recognize the workspace, resume the existing Mission or propose
creating one, reflect a pending Human Gate, and open the Eyes interface — then
it returns one closed JSON result. The plugin transmits metadata only; it
executes nothing, decides nothing, and never handles a license key.

Do exactly this and nothing else:

1. Call the SCRIBE MCP tool `scribe.start` (no arguments, or the optional
   `session_id` the user explicitly named).
2. Present a SHORT human summary of the returned JSON, keeping every field
   value exactly as returned and recomputing nothing:
   - installation and bridge: `installation_status`, `bridge_status`;
   - backend and core: `backend_status`, `core_status` (say explicitly when
     the backend was joined vs freshly started, from `backend_started`);
   - access: `access_state` and `access_mode` (full / read_only / blocked);
   - workspace: `workspace_status`;
   - mission: `mission_id`, `mission_status` (resumed mission), or say that no
     mission exists yet and that `/scribe-mission-draft` can create one;
   - Human Gate: if `pending_human_gate` is true, say a human review is
     waiting;
   - Eyes: `eyes_status`; when `eyes_url` is present, show it as a clickable
     link (it is a local loopback URL) — especially when `eyes_status` is
     `url_fallback`;
   - finish with the returned `next_action` as the single suggested next step
     (for example `activate` means: run `/scribe-activate`).
3. If `access_mode` is `read_only` or `blocked`, state clearly that SCRIBE is
   in a restricted mode and relay the `next_action` (activation or
   revalidation); do not attempt any other tool call to work around it.

If the tool is unavailable or returns an error, relay the error text exactly
as given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script, browser, or file yourself. Do not take any further action; Human GO
remains a separate, manual step.

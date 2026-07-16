---
description: SCRIBE — read-only continuity doctor (Claude Code + plugin + MCP + Bridge + workspace + Mission), no secrets.
---

`/scribe-doctor` is a **read-only** health check for the SCRIBE continuity
surface in Claude Code. It changes nothing, approves nothing, and starts no
agent, job, or execution; the Mission lookup it performs is **metadata-only**
(an opaque id, never a path, name, content, secret, or token). Human GO remains
a separate, manual step.

Report the following, each on its own line, in plain language:

1. **Claude Code version** — state the version of Claude Code you are running
   under (from the environment you already know); if you cannot determine it,
   say "unknown" rather than guessing.
2. **Plugin loaded** — the `scribe-bridge` plugin is loaded if this command ran;
   confirm that.
3. **MCP available** — the plugin's `scribe-bridge` MCP server is available if
   its tools respond below; confirm that.
4. **Bridge reachable** — call the SCRIBE MCP tool `scribe.self_check` and report
   whether the local Bridge answered its structural self-check.
5. **Workspace recognized** — call the SCRIBE MCP tool `scribe.workspace_status`
   and report whether a workspace is attached (by its opaque workspace id and
   entry count only — **do not print the absolute workspace path**). If none is
   attached, say so plainly.
6. **Mission active or absent** — call the SCRIBE MCP tool `scribe.mission_status`
   (metadata-only) and report whether a governed Mission is recorded for this
   session (its opaque mission id and status), or that none is / the backend is
   not configured.
7. **Hooks recognized** — confirm the plugin's continuity hooks are registered:
   `SessionStart`, `PreCompact`, and `SessionEnd` (from the loaded plugin's hook
   configuration you already know). Do not run them; just report whether each is
   recognized. This also makes `/scribe-doctor` a **post-installation** check.
8. **Plugin version** — state the loaded `scribe-bridge` plugin version (from the
   plugin metadata you already know) and note whether it matches the expected
   `0.11.1`. Do not print any path; the version alone is enough.

Guidelines:

- Keep every reported value exactly as the tool returned it. **Never** print or
  reconstruct any secret, token, backend URL, or absolute private path, and
  never perform any HTTP yourself — only ask the SCRIBE MCP tools.
- Make errors **understandable**: if a tool is unavailable or returns an error
  (including "not configured" or "no mission for session"), relay the error text
  as given and continue with the remaining checks so the operator sees the full
  picture, then stop. A failed check is a diagnostic result, not a reason to
  improvise.
- Do not run any shell or terminal command, do not search the filesystem or the
  disk, and do not try to locate, open, or execute any wrapper script or file
  yourself. Do not take any further action; reading status is not an approval.

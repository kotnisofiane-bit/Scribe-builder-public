---
description: SCRIBE — detach the local workspace association (read-only toward the repo, via MCP).
---

`/scribe-workspace-detach` removes only the local SCRIBE association with the
attached workspace, through this plugin's MCP server (`scribe-bridge`). It is
**read-only toward your repository**: it deletes no file, removes no repository,
runs no Git, and keeps your decision history (journal) intact. It only forgets
the local attachment and journals `workspace.detached`.

Use the SCRIBE MCP tool `scribe.workspace_detach` and report its result. If no
workspace was attached, say so plainly.

If the tool is unavailable or returns an error, relay the error text exactly as
given and stop. Do not run any shell or terminal command, do not search the
filesystem or the disk, and do not try to locate, open, or execute any wrapper
script or file yourself. Do not take any further action; Human GO remains a
separate, manual step.

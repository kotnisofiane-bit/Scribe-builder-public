---
description: SCRIBE — attach a local workspace in read-only structural mode (via MCP).
argument-hint: [absolute workspace path]
---

`/scribe-workspace-attach` attaches a local workspace to your SCRIBE session in
**read-only structural mode** through this plugin's MCP server (`scribe-bridge`):
it records names, kinds, sizes, extensions, and depth only. It never reads file
content, never runs Git, and writes only the Bridge's own local manifest — never
your repository.

The absolute workspace path provided by the user is, verbatim:

$ARGUMENTS

Call the SCRIBE MCP tool `scribe.workspace_attach` with `workspace_root` set to
that path **exactly as written above — verbatim**. Do not invent, guess,
complete, normalize, or correct the path; do not use the current directory
(pwd); do not search the filesystem for a repository. If the path above is empty,
do not call the tool: ask the user for an absolute workspace path and stop.
Report the tool's result (root, workspace id, entry count, exclusions, digest).

If the tool is unavailable or returns an error (including an invalid or unsafe
root), relay the error text exactly as given and stop.
Do not run any shell or terminal command, do not search the filesystem or the
disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Do not take any further action; attaching a workspace is not an
approval, and Human GO remains a separate, manual step.

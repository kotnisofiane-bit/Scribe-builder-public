---
description: SCRIBE — record ONE readable decision/constraint/observation into the local session (via MCP).
argument-hint: [decision text]
---

`/scribe-record` records a single human-readable note into your local SCRIBE
decision session through this plugin's MCP server (`scribe-bridge`). It appends
one entry to the Bridge's local decision journal (a controlled local write); it
is **read-only toward your repository, Git, and any backend**: it reads no
repository, runs no Git, calls no backend, and starts no dashboard.

The decision text provided by the user is, verbatim:

$ARGUMENTS

Call the SCRIBE MCP tool `scribe.record` with `display_summary` set to that text
**exactly as written above — verbatim, byte for byte**. Do not invent, enrich,
rephrase, summarize, translate, correct, or otherwise transform it; pass it
through unchanged. Use `event_type` `decision.noted` by default (or
`constraint.noted` / `observation.noted` only if the user clearly marked the
note as a constraint or an observation). Report the tool's result. The summary
is stored locally and is never transmitted.

If the decision text above is empty, do not call the tool: ask the user to
supply the decision text and stop.

If the tool is unavailable or returns an error (including a never-send refusal
or a length refusal), relay the error text exactly as given and stop.
Do not run any shell or terminal command, do not search the filesystem or the
disk, and do not try to locate, open, or execute any wrapper script or file
yourself. Do not take any further action; recording a note is not an approval,
and Human GO remains a separate, manual step.

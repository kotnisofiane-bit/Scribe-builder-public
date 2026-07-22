---
description: SCRIBE — draft a governed mission from an explicit objective (metadata-only otherwise, via MCP).
argument-hint: [mission objective]
---

`/scribe-mission-draft` drafts a **governed mission** from your explicit objective
through this plugin's MCP server (`scribe-bridge`). The Bridge sends the objective
plus a **structural** workspace summary to the SCRIBE backend (the only door to the
private Core); everything else is **metadata-only** (counts + keyless hashes +
bounded opaque refs — never a path, name, file content, Git, secret, or token). The
Core returns a **draft only**: no agent, no job, no execution, no audit, no seal, no
Human GO. The opaque mission id is recorded locally so it can be resumed later.

The mission objective provided by the user is, verbatim:

$ARGUMENTS

Call the SCRIBE MCP tool `scribe.mission_draft` with `objective` set to that text
**exactly as written above — verbatim, byte for byte**. Do not invent, enrich,
rephrase, summarize, translate, correct, or otherwise transform it; pass it through
unchanged. Report the tool's result plainly: whether the backend is **configured**
(if not, say so and that nothing was sent); whether the draft was **created** or
**refused**, and why; and the returned **mission id**, **status**
(`mission_draft`), and **next_action** (`review_mission_draft`).

If the objective above is empty, do not call the tool: ask the user to supply the
objective and stop. Never read, parse, or print the backend token or URL yourself,
and never perform any HTTP from Claude — only ask the SCRIBE MCP tool.

If the tool is unavailable or returns an error (including a screening or never-send
refusal), relay the error text exactly as given and stop. Do not run any shell or
terminal command, do not search the filesystem or the disk, and do not try to
locate, open, or execute any wrapper script or file yourself. Do not take any
further action; drafting a mission is not an approval, and Human GO remains a
separate, manual step.

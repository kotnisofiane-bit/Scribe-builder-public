#!/usr/bin/env node
// scribe_mcp.mjs
//
// Minimal MCP stdio server for THIS plugin (hand-rolled, no SDK, zero deps).
// Transport: newline-delimited JSON-RPC 2.0 over stdin/stdout, as used by the
// MCP stdio transport. Claude Code starts it from the plugin's `.mcp.json`.
//
// This is the plugin's ONLY runtime surface for Claude (MACRO-VERTICAL-1A):
// the slash commands are declarative and ask Claude to call these tools —
// there is no embedded shell preprocessing anywhere in the plugin.
//
// Scope: the four read-only probes + one read-only aggregate, the four local
// decision-trace tools (MACRO-VERTICAL-1B), the four workspace M0 tools
// (MACRO-BRIDGE-6), and the ONE backend metadata-probe tool (MACRO-API-1):
//   scribe.version, scribe.status, scribe.capabilities, scribe.self_check,
//   scribe.init (aggregate of the four; a read-only dry local init),
//   scribe.session_init, scribe.record, scribe.replay, scribe.digest,
//   scribe.workspace_attach/status/manifest/detach,
//   scribe.backend_probe (explicit, opt-in, metadata-only backend probe).
// These tools route to the Bridge, which writes ONLY inside its own explicit
// local journal home and owns the sole (metadata-only) network client. There is
// still NO repo-read/write tool, NO merge/deploy/apply/seal tool, and NO backend
// CORE-call / job / upload / content-send tool. Unknown tools rejected.
//
// Every Bridge launch goes through the strict adapter (src/bridge_adapter.mjs):
// allowlisted flag/op only, explicit Bridge path only (SCRIBE_BRIDGE_ENTRY /
// SCRIBE_BRIDGE_HOME from this process's environment), no shell, short
// timeout, bounded output, minimal child env (PATH only), strict JSON,
// fail-closed. This file itself launches nothing, writes nothing, reads no
// user repository, opens no socket, binds no port, and calls no backend.

import process from "node:process";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  JSON_COMMANDS,
  runBridgeCommand,
  runBridgeSession,
  runBridgeWorkspace,
  runBridgeBackend,
  runBridgeAccess,
  runBridgeMission,
  runBridgeLotContract,
  runBridgeExecutionEvidence,
  runBridgeStart,
  bridgeInit,
  formatInitReport,
} from "../src/bridge_adapter.mjs";
import { formatOperatorHint } from "../src/operator_messages.mjs";

// Minimal MCP protocol version advertised by this hand-rolled server. It
// matches the Bridge's own minimal MCP server; clients negotiate from here.
export const PROTOCOL_VERSION = "2024-11-05";
export const SERVER_NAME = "scribe-bridge";

const here = path.dirname(fileURLToPath(import.meta.url));
const ownPkg = JSON.parse(readFileSync(path.join(here, "..", "package.json"), "utf8"));

export const SERVER_INFO = Object.freeze({
  name: SERVER_NAME,
  version: typeof ownPkg.version === "string" ? ownPkg.version : "0.0.0",
  title: "SCRIBE Bridge plugin (private, read-only wrapper)",
});

const NO_ARGS_SCHEMA = Object.freeze({
  type: "object",
  properties: {},
  additionalProperties: false,
});

// Optional local session id (defaults to "default"), shared by the trace tools.
const SESSION_ID_PROP = Object.freeze({
  session_id: Object.freeze({
    type: "string",
    description: 'Optional local session id (defaults to "default").',
  }),
});

const SESSION_ONLY_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({ ...SESSION_ID_PROP }),
  additionalProperties: false,
});

const RECORD_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    display_summary: Object.freeze({
      type: "string",
      description:
        "Human-readable decision/constraint/observation (1-500 chars). Stored locally, never sent.",
    }),
    event_type: Object.freeze({
      type: "string",
      enum: Object.freeze(["decision.noted", "constraint.noted", "observation.noted"]),
      description: "Defaults to decision.noted.",
    }),
    ...SESSION_ID_PROP,
  }),
  required: Object.freeze(["display_summary"]),
  additionalProperties: false,
});

const WORKSPACE_ATTACH_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    workspace_root: Object.freeze({
      type: "string",
      description:
        "Absolute path to the local workspace to attach (passed verbatim; read-only structure only).",
    }),
    ...SESSION_ID_PROP,
  }),
  required: Object.freeze(["workspace_root"]),
  additionalProperties: false,
});

// ASSEMBLY-CORE-MISSION-1: the mission-draft tool takes the user's EXPLICIT
// objective (required) plus an optional session id. The objective is passed to the
// Bridge verbatim; the Bridge screens it and runs the never-send gate.
const MISSION_DRAFT_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    objective: Object.freeze({
      type: "string",
      description:
        "The EXPLICIT objective for the governed mission draft (bounded natural language; " +
        "passed verbatim). Never a path, secret, token, or key — the Bridge screens it.",
    }),
    ...SESSION_ID_PROP,
  }),
  required: Object.freeze(["objective"]),
  additionalProperties: false,
});

// mission-status / mission-resume take an optional session id and an optional
// opaque mission id (else the Bridge uses the session's recorded current mission).
const MISSION_LOOKUP_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    mission_id: Object.freeze({
      type: "string",
      description:
        "Optional opaque mission id (mis_...). Omit to use the session's current recorded mission.",
    }),
  }),
  additionalProperties: false,
});

// CONTRACT-LOT-1: lot/contract schemas. ONLY opaque ids — no free text anywhere.
const MISSION_ID_PROP = Object.freeze({
  mission_id: Object.freeze({
    type: "string",
    description: "Optional opaque mission id (mis_...). Omit to use the session's current mission.",
  }),
});

const LOTS_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({ ...SESSION_ID_PROP, ...MISSION_ID_PROP }),
  additionalProperties: false,
});

const LOT_SELECT_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    lot_id: Object.freeze({
      type: "string",
      description: "The opaque lot id (lot_...) supplied in the client request, from the proposed lots.",
    }),
    confirm_selection: Object.freeze({
      type: "boolean",
      description:
        "MUST be exactly true, and ONLY after the human explicitly named this lot " +
        "(e.g. via /scribe-lot-select). Never set it on your own initiative. " +
        "HONESTY (R2): this flag is a CLIENT DECLARATION that cannot be technically " +
        "verified — the Core records the selection as selection_origin=" +
        "\"client_declared_user_command\" with authoritative=false; it is NEVER a " +
        "proven human selection.",
    }),
    ...SESSION_ID_PROP,
    ...MISSION_ID_PROP,
  }),
  required: Object.freeze(["lot_id", "confirm_selection"]),
  additionalProperties: false,
});

const CONTRACT_DRAFT_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    ...MISSION_ID_PROP,
    lot_id: Object.freeze({
      type: "string",
      description: "Optional opaque lot id (lot_...). Omit to use the lot referenced by the non-authoritative selection request.",
    }),
  }),
  additionalProperties: false,
});

const CONTRACT_LOOKUP_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    contract_id: Object.freeze({
      type: "string",
      description: "Optional opaque contract id (ctr_...). Omit to use the session's current contract.",
    }),
  }),
  additionalProperties: false,
});

// EXECUTION-EVIDENCE-1: execution-prepare takes an optional session id and an optional
// opaque contract id (else the Bridge uses the session's current contract). Nothing is
// executed — the attempt is prepared NON-LAUNCHED.
const EXECUTION_PREPARE_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    contract_id: Object.freeze({
      type: "string",
      description: "Optional opaque contract id (ctr_...) supplied in the client request. " +
        "Omit to use the session's current contract.",
    }),
  }),
  additionalProperties: false,
});

// execution/evidence status/resume take an optional session id and an optional opaque
// execution id (else the Bridge uses the session's recorded current execution).
const EXECUTION_LOOKUP_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    execution_id: Object.freeze({
      type: "string",
      description: "Optional opaque execution id (exe_...). Omit to use the session's current attempt.",
    }),
  }),
  additionalProperties: false,
});

// The candidate report body — a pure DECLARED assertion. It is NEVER a proof: it may not
// claim a real run, an audit pass, a human approval, a seal, or a VERIFIED outcome.
const REPORT_BODY_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    producer_role: Object.freeze({ type: "string", enum: Object.freeze(["code"]),
      description: 'The role that produced the report (only "code" in R1).' }),
    claimed_status: Object.freeze({ type: "string",
      enum: Object.freeze(["candidate_complete", "candidate_partial", "candidate_failed"]),
      description: "A CLAIMED candidate outcome — never verified/approved/sealed." }),
    claimed_changed_paths: Object.freeze({ type: "array", items: Object.freeze({ type: "string" }),
      description: "CLAIMED changed paths (RELATIVE only; metadata, never absolute paths)." }),
    claimed_tests: Object.freeze({ type: "object", properties: Object.freeze({
        declared_total: Object.freeze({ type: "integer" }),
        declared_passed: Object.freeze({ type: "integer" }),
        summary: Object.freeze({ type: "string" }),
      }), required: Object.freeze(["declared_total", "declared_passed", "summary"]),
      additionalProperties: false,
      description: "DECLARED test counts + a bounded summary — an assertion, not a verification." }),
    claimed_outputs: Object.freeze({ type: "array", items: Object.freeze({ type: "string" }),
      description: "Bounded opaque output refs the agent claims." }),
    claimed_reserves: Object.freeze({ type: "array", items: Object.freeze({ type: "string" }),
      description: "Bounded caveats/reserves the agent declares." }),
    provenance: Object.freeze({ type: "string", description: "Bounded provenance label." }),
  }),
  required: Object.freeze(["producer_role", "claimed_status", "claimed_changed_paths",
    "claimed_tests", "claimed_outputs", "claimed_reserves", "provenance"]),
  additionalProperties: false,
});

const EXECUTION_REPORT_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    execution_id: Object.freeze({
      type: "string",
      description: "Optional opaque execution id (exe_...). Omit to use the session's current attempt.",
    }),
    report: REPORT_BODY_SCHEMA,
  }),
  required: Object.freeze(["report"]),
  additionalProperties: false,
});

// A single client-declared evidence record. The client NEVER supplies a tier; the Core
// assigns it (DECLARED/VERIFIED/MISSING/INVALID). A verifier claim is refused in R1.
const EVIDENCE_RECORD_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    evidence_type: Object.freeze({ type: "string", description: "The kind of evidence (e.g. tests_passed)." }),
    source_kind: Object.freeze({ type: "string",
      enum: Object.freeze(["agent_report", "command_output_ref", "artifact_ref", "external_ref"]),
      description: "Where the evidence comes from (a reference kind, never raw content)." }),
    target_ref: Object.freeze({ type: "string", description: "A bounded opaque reference the evidence points at." }),
    report_id: Object.freeze({ type: ["string", "null"], description: "Optional opaque report id (rpt_...) this evidence supports." }),
    digest: Object.freeze({ type: ["string", "null"], description: "Optional sha256 hex digest (a malformed digest is tiered INVALID by the Core)." }),
    summary: Object.freeze({ type: "string", description: "A bounded human summary of the declared evidence." }),
    verifier_id: Object.freeze({ type: "null", description: "Must be null in R1 — no allowlisted verifier exists; a value is refused." }),
    verification_method: Object.freeze({ type: "null", description: "Must be null in R1 — the Core assigns tiers, never a client claim." }),
  }),
  required: Object.freeze(["evidence_type", "source_kind", "target_ref", "report_id",
    "digest", "summary", "verifier_id", "verification_method"]),
  additionalProperties: false,
});

const EVIDENCE_SUBMIT_SCHEMA = Object.freeze({
  type: "object",
  properties: Object.freeze({
    ...SESSION_ID_PROP,
    execution_id: Object.freeze({
      type: "string",
      description: "Optional opaque execution id (exe_...). Omit to use the session's current attempt.",
    }),
    evidence_records: Object.freeze({ type: "array", items: EVIDENCE_RECORD_SCHEMA,
      description: "The typed evidence records to persist; the Core assigns each a strict tier." }),
  }),
  required: Object.freeze(["evidence_records"]),
  additionalProperties: false,
});

// The complete, exhaustive tool table. `flag` tools forward one allowlisted
// read-only Bridge flag; `scribe.init` is the read-only aggregate; `session`
// tools forward one local decision-trace op (session_init/record/replay/digest)
// through the strict adapter. If a name is not in this table, it does not exist.
const TOOL_TABLE = Object.freeze([
  Object.freeze({
    name: "scribe.version",
    flag: "--version",
    inputSchema: NO_ARGS_SCHEMA,
    description: "Report the local SCRIBE Bridge version line (read-only).",
  }),
  Object.freeze({
    name: "scribe.status",
    flag: "--status",
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "Report the local SCRIBE Bridge static status JSON (read-only, strictly parsed).",
  }),
  Object.freeze({
    name: "scribe.capabilities",
    flag: "--capabilities",
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "Report the SCRIBE Bridge capability manifest, allowed + forbidden (read-only).",
  }),
  Object.freeze({
    name: "scribe.self_check",
    flag: "--self-check",
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "Run the SCRIBE Bridge local structural invariant checks (read-only, exit-style ok flag).",
  }),
  Object.freeze({
    name: "scribe.init",
    flag: null,
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "Read-only dry local init: aggregate the four read-only probes into a summary " +
      "with the maturity banner and mandatory notices. Changes nothing; Human GO stays separate.",
  }),
  Object.freeze({
    name: "scribe.session_init",
    op: "session_init",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Open (or create) a local SCRIBE decision session and report it. Writes only inside the " +
      "Bridge's local journal home; no repo, no backend, no Git. Human GO stays separate.",
  }),
  Object.freeze({
    name: "scribe.record",
    op: "record",
    inputSchema: RECORD_SCHEMA,
    description:
      "Record ONE readable decision/constraint/observation (display_summary, 1-500 chars) into the " +
      "local session. Stored locally and never transmitted; filtered by never-send; not a decision.",
  }),
  Object.freeze({
    name: "scribe.replay",
    op: "replay",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Replay the local session's readable trace (ordered entries + hashes + final digest), read-only. " +
      "The trace is not validated or approved; Human GO stays separate.",
  }),
  Object.freeze({
    name: "scribe.digest",
    op: "digest",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Report the deterministic, keyless integrity digest of the local session (read-only). " +
      "Not a signature, not a legal proof, not a seal authority.",
  }),
  Object.freeze({
    name: "scribe.workspace_attach",
    wop: "workspace_attach",
    inputSchema: WORKSPACE_ATTACH_SCHEMA,
    description:
      "Explicitly attach a local workspace (absolute path) in READ-ONLY STRUCTURAL mode: names, " +
      "kinds, sizes, extensions, depth. Never reads file content, never runs Git, writes only the " +
      "Bridge's local manifest. Human GO stays separate.",
  }),
  Object.freeze({
    name: "scribe.workspace_status",
    wop: "workspace_status",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Report the attached workspace for the session (root, id, entry count, digest), read-only. " +
      "No rescan, no content, no Git.",
  }),
  Object.freeze({
    name: "scribe.workspace_manifest",
    wop: "workspace_manifest",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Rescan the attached workspace structurally, recompute the digest, and report the manifest " +
      "plus whether the structure changed. Read-only; no content, no diff, no Git.",
  }),
  Object.freeze({
    name: "scribe.workspace_detach",
    wop: "workspace_detach",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Remove ONLY the local SCRIBE workspace association (no file deleted, no Git, repo intact). " +
      "Journals workspace.detached; the decision history is preserved.",
  }),
  Object.freeze({
    name: "scribe.backend_probe",
    bop: "backend_probe",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "Send an explicit, opt-in METADATA-ONLY probe to the configured SCRIBE backend: structural " +
      "counts + keyless hashes + bounded random refs only — NEVER a path, name, file content, Git, " +
      "secret, or token. Requires SCRIBE_BACKEND_URL + SCRIBE_BACKEND_PREVIEW_TOKEN (HTTPS only); if " +
      "unset it reports 'not configured' and sends nothing. One attempt; makes no core call, starts " +
      "no job, uploads no file; the receipt is not a decision or a Human GO.",
  }),
  Object.freeze({
    name: "scribe.access_prepare",
    aop: "access_prepare",
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "POLAR-ACCESS-0: prepare the SCRIBE beta activation surface (installation-wide). Asks the " +
      "Bridge to project ONE closed, metadata-only request to the future Backend access route and, " +
      "when wired, returns a temporary LOCAL activation URL (loopback only). The license key is NEVER " +
      "entered in Claude — only in the future Backend-owned local page. Takes no arguments; performs " +
      "no HTTP, handles no key, calls no Polar. Until the route exists it reports " +
      "access_backend_unavailable — nothing is activated.",
  }),
  Object.freeze({
    name: "scribe.access_status",
    aop: "access_status",
    inputSchema: NO_ARGS_SCHEMA,
    description:
      "POLAR-ACCESS-0: read the installation-wide SCRIBE access status (metadata-only). Returns only " +
      "the closed access state, a MASKED display key, the plan, opaque ids, and dates — never a full " +
      "key, token, or internal URL. Takes no arguments; performs no HTTP, handles no key. Until the " +
      "Backend route exists it reports access_backend_unavailable.",
  }),
  Object.freeze({
    name: "scribe.mission_draft",
    mop: "mission_draft",
    inputSchema: MISSION_DRAFT_SCHEMA,
    description:
      "Draft a GOVERNED mission from an EXPLICIT objective via the SCRIBE backend (the only door " +
      "to the private Core). Sends the objective + a STRUCTURAL workspace summary; the opaque " +
      "mission id is recorded locally. Draft only: the Core returns a mission_draft — no agent, no " +
      "job, no execution, no audit, no seal, no Human GO. Requires SCRIBE_BACKEND_URL + preview " +
      "token; unset -> 'not configured' and nothing is sent.",
  }),
  Object.freeze({
    name: "scribe.mission_status",
    mop: "mission_status",
    inputSchema: MISSION_LOOKUP_SCHEMA,
    description:
      "Look up a governed mission by the opaque id recorded for this session (or an explicit " +
      "mission_id). Read-only: sends only the opaque id and returns the closed Core snapshot; " +
      "changes nothing. Requires the backend to be configured.",
  }),
  Object.freeze({
    name: "scribe.mission_resume",
    mop: "mission_resume",
    inputSchema: MISSION_LOOKUP_SCHEMA,
    description:
      "Resume a governed mission after a restart: the Core reloads and re-verifies it, returning " +
      "the SAME opaque mission id and closed snapshot. Sends only the opaque id; starts no agent, " +
      "no job, no execution, no Human GO. Requires the backend to be configured.",
  }),
  Object.freeze({
    name: "scribe.lots_propose",
    lcop: "lots_propose",
    inputSchema: LOTS_SCHEMA,
    description:
      "Ask the private Core (via the backend) for the GOVERNED lot proposals of the session's " +
      "mission: deterministic, bounded, metadata-only drafts — NEVER executable. Sends only opaque " +
      "ids. Presents lots for HUMAN review; selects nothing, runs nothing, triggers no Human GO.",
  }),
  Object.freeze({
    name: "scribe.lots_status",
    lcop: "lots_status",
    inputSchema: LOTS_SCHEMA,
    description:
      "Read the current lots snapshot for the session's mission (selection state included), " +
      "read-only via opaque ids. Changes nothing; selects nothing.",
  }),
  Object.freeze({
    name: "scribe.lot_select",
    lcop: "lot_select",
    inputSchema: LOT_SELECT_SCHEMA,
    description:
      "Record a NON-AUTHORITATIVE lot selection REQUEST in the Core. Call ONLY after the human " +
      "explicitly named the lot; confirm_selection must be exactly true and is never assumed — " +
      "nothing may auto-select. The recorded provenance is an unverifiable client declaration " +
      "(selection_origin=client_declared_user_command, authoritative=false) — never a proven human " +
      "selection. Sends only opaque ids; runs nothing; a different prior request is a conflict.",
  }),
  Object.freeze({
    name: "scribe.contract_draft",
    lcop: "contract_draft",
    inputSchema: CONTRACT_DRAFT_SCHEMA,
    description:
      "Create (or idempotently re-read) the canonical DRAFT-ONLY ExecutionContract for the " +
      "lot referenced by the non-authoritative selection request: distinct coder/auditor roles, " +
      "closed scope, visible forbidden and " +
      "sensitive zones, expected evidence, validation criteria. No execution authority, no agent, " +
      "no audit, no seal, no Human GO — the contract awaits human review.",
  }),
  Object.freeze({
    name: "scribe.contract_status",
    lcop: "contract_status",
    inputSchema: CONTRACT_LOOKUP_SCHEMA,
    description:
      "Read the contract snapshot by its opaque id (or the session's current contract), read-only. " +
      "Changes nothing; approves nothing.",
  }),
  Object.freeze({
    name: "scribe.contract_resume",
    lcop: "contract_resume",
    inputSchema: CONTRACT_LOOKUP_SCHEMA,
    description:
      "Resume the governed contract after a restart: the Core reloads and re-verifies it, returning " +
      "the SAME opaque contract id and closed draft snapshot. Sends only opaque ids; runs nothing.",
  }),
  Object.freeze({
    name: "scribe.execution_prepare",
    eeop: "execution_prepare",
    inputSchema: EXECUTION_PREPARE_SCHEMA,
    description:
      "Prepare (or idempotently re-read) a NON-LAUNCHED ExecutionAttempt for the session's contract. " +
      "It starts NOTHING: executor_kind=none, execution_status=not_started, no agent, no runner, no " +
      "workspace mutation, no Human GO. Sends only opaque ids and returns the opaque exe_ id.",
  }),
  Object.freeze({
    name: "scribe.execution_status",
    eeop: "execution_status",
    inputSchema: EXECUTION_LOOKUP_SCHEMA,
    description:
      "Read the ExecutionAttempt snapshot by its opaque id (or the session's current attempt), " +
      "read-only. Reports the never-launched posture and any DECLARED candidate report. Changes nothing.",
  }),
  Object.freeze({
    name: "scribe.execution_resume",
    eeop: "execution_resume",
    inputSchema: EXECUTION_LOOKUP_SCHEMA,
    description:
      "Resume the ExecutionAttempt after a restart: the Core reloads and re-verifies it, returning the " +
      "SAME opaque exe_ id and never-launched snapshot. Sends only opaque ids; runs nothing.",
  }),
  Object.freeze({
    name: "scribe.execution_report",
    eeop: "execution_report",
    inputSchema: EXECUTION_REPORT_SCHEMA,
    description:
      "Record a CANDIDATE ExecutionReport as a pure DECLARED assertion (report_tier=DECLARED, " +
      "authoritative=false). It is NEVER a proof: it may not claim a real run, an audit pass, a human " +
      "approval, a seal, or a VERIFIED outcome. The report body rides stdin; only opaque ids ride argv.",
  }),
  Object.freeze({
    name: "scribe.evidence_submit",
    eeop: "evidence_submit",
    inputSchema: EVIDENCE_SUBMIT_SCHEMA,
    description:
      "Submit TYPED evidence records for the attempt. The CORE assigns each record's strict tier " +
      "(DECLARED / VERIFIED / MISSING / INVALID) — never a client flag; VERIFIED is unreachable in R1. " +
      "Missing expected evidence is surfaced explicitly. The records ride stdin; only opaque ids ride argv.",
  }),
  Object.freeze({
    name: "scribe.evidence_status",
    eeop: "evidence_status",
    inputSchema: EXECUTION_LOOKUP_SCHEMA,
    description:
      "Read the evidence snapshot by the opaque execution id (or the session's current attempt), " +
      "read-only: the tiered records, the tier counts, and the visible missing evidence. Changes nothing.",
  }),
  Object.freeze({
    name: "scribe.evidence_resume",
    eeop: "evidence_resume",
    inputSchema: EXECUTION_LOOKUP_SCHEMA,
    description:
      "Resume the evidence after a restart: the Core reloads and re-verifies it, returning the SAME " +
      "opaque ids and evidence head. Sends only opaque ids; runs nothing, verifies nothing.",
  }),
  Object.freeze({
    name: "scribe.start",
    sop: "start",
    inputSchema: SESSION_ONLY_SCHEMA,
    description:
      "SCRIBE-START-1: the unified SCRIBE start (metadata-only orchestration). ONE call that asks the " +
      "Bridge to: run its structural self-check, JOIN the local backend (or start the ONE explicitly " +
      "configured entry — idempotent, never a duplicate, never a kill), REFLECT the closed " +
      "POLAR-ACCESS-1 access state (active/grace/blocked — computed by the backend, never here), " +
      "recognize the attached workspace, resume the recorded mission via one governed lookup, reflect " +
      "a pending Human Gate, and open the loopback Eyes shell at most once per session (URL fallback " +
      "otherwise). Executes nothing: no agent, no job, no runner, no audit, no seal, no Human GO. " +
      "Returns the closed scribe_start_result_v0 JSON. Takes only an optional session id.",
  }),
]);

export const MCP_TOOL_NAMES = Object.freeze(TOOL_TABLE.map((t) => t.name));

export const TOOLS = Object.freeze(
  TOOL_TABLE.map((t) =>
    Object.freeze({ name: t.name, description: t.description, inputSchema: t.inputSchema })
  )
);

// A local decision-trace result is "ok" only if the Bridge accepted it: no
// error field, not blocked by never-send, a record actually recorded, and the
// journal still valid. A bounded refusal is surfaced as an error to Claude.
function deriveSessionOk(json) {
  if (!json || typeof json !== "object") return false;
  if (json.error) return false;
  if (json.blocked === true) return false;
  if (json.recorded === false) return false;
  if (json.journal_valid === false) return false;
  return true;
}

// A workspace result is "ok" only if the Bridge accepted it (explicit ok:true,
// no error). A bounded refusal (bad root, unknown session, not attached) surfaces
// to Claude as an error.
function deriveWorkspaceOk(json) {
  return Boolean(json && typeof json === "object" && json.ok === true && !json.error);
}

// A backend-probe result is "ok" (informational, not an error) when the Bridge
// produced a valid outcome: `ok:true` covers both "not configured / sent nothing"
// and "sent + received a receipt" (even a backend decline is a valid, informative
// result). Only a hard failure — unknown session, projection guard, or a delivery
// failure — is surfaced to Claude as an error (`ok:false`).
function deriveBackendOk(json) {
  return Boolean(json && typeof json === "object" && json.ok === true);
}

// A mission result is "ok" only when the Bridge achieved the op's goal: a created
// draft, or a status/resume that returned the mission (json.ok === true). A
// not-configured, refused, or no-mission outcome is surfaced to Claude as an error
// (the user asked to draft/find a mission and it did not happen).
function deriveMissionOk(json) {
  return Boolean(json && typeof json === "object" && json.ok === true);
}

// A product access result is "ok" (informational, not an error) when the Bridge
// produced a valid outcome: json.ok === true covers both a validated snapshot and
// the honest "access_backend_unavailable" (the route is not wired yet — that is a
// legitimate, non-error state this lot, never a real block). Only a hostile or
// invalid Backend response (json.ok === false) surfaces to Claude as an error.
function deriveAccessOk(json) {
  return Boolean(json && typeof json === "object" && json.ok === true);
}

// A unified-start result is "ok" (informational) whenever the Bridge produced
// the closed envelope (json.ok === true): degraded/unreachable component states
// are honest findings the command projects for the user, never a tool crash.
function deriveStartOk(json) {
  return Boolean(json && typeof json === "object" && json.ok === true);
}

/**
 * Run one tool and return MCP tool-call content: readable text + isError.
 * Every failure is bounded and fails closed in the adapter; here it becomes a
 * readable operator hint (cause, safe action, what was NOT done) — never a
 * crash, never a fallback to a shell or a disk search.
 * @param {string} name
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 * @param {{session_id?: string, event_type?: string, display_summary?: string}} [args]
 * @returns {{text: string, isError: boolean}}
 */
export function callTool(name, opts = {}, args = {}) {
  const def = TOOL_TABLE.find((t) => t.name === name);
  if (!def) {
    return { text: `Unknown tool: ${String(name)}`, isError: true };
  }
  // Local decision-trace tools route to the Bridge session ops.
  if (def.op) {
    const res = runBridgeSession(def.op, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge session command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveSessionOk(res.json) };
  }
  // Workspace M0 tools route to the Bridge workspace ops.
  if (def.wop) {
    const res = runBridgeWorkspace(def.wop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge workspace command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveWorkspaceOk(res.json) };
  }
  // MACRO-API-1: the backend metadata probe routes to the Bridge backend op.
  if (def.bop) {
    const res = runBridgeBackend(def.bop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge backend probe failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveBackendOk(res.json) };
  }
  // POLAR-ACCESS-0: the product access ops route to the Bridge access ops. The
  // plugin makes NO decision, performs NO HTTP, and never handles a license key.
  if (def.aop) {
    const res = runBridgeAccess(def.aop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge access command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveAccessOk(res.json) };
  }
  // ASSEMBLY-CORE-MISSION-1: the mission ops route to the Bridge mission ops.
  if (def.mop) {
    const res = runBridgeMission(def.mop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge mission command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveMissionOk(res.json) };
  }
  // CONTRACT-LOT-1: the lot/contract ops route to the Bridge lot/contract ops.
  if (def.lcop) {
    const res = runBridgeLotContract(def.lcop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge lot/contract command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveMissionOk(res.json) };
  }
  // EXECUTION-EVIDENCE-1: the execution/evidence ops route to the Bridge ops. The
  // report/evidence content is forwarded on stdin; nothing is executed or verified here.
  if (def.eeop) {
    const res = runBridgeExecutionEvidence(def.eeop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge execution/evidence command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveMissionOk(res.json) };
  }
  // SCRIBE-START-1: the unified start routes to the ONE Bridge start op. The
  // result envelope is transparent (ok:true) even for degraded component states
  // — those are honest findings, not tool errors; only a hard adapter failure
  // or an internal Bridge failure (ok:false) surfaces as an error.
  if (def.sop) {
    const res = runBridgeStart(def.sop, args || {}, opts);
    if (!res.ok) {
      return {
        text: `Bridge start command failed (${res.error}). ${formatOperatorHint(res.error)}`,
        isError: true,
      };
    }
    return { text: JSON.stringify(res.json, null, 2), isError: !deriveStartOk(res.json) };
  }
  if (def.flag === null) {
    const summary = bridgeInit(opts);
    const ok =
      summary.bridge_found && summary.self_check === "ok" && summary.errors.length === 0;
    return { text: formatInitReport(summary), isError: !ok };
  }
  const res = runBridgeCommand(def.flag, opts);
  if (!res.ok) {
    return {
      text: `Bridge command failed (${res.error}). ${formatOperatorHint(res.error)}`,
      isError: true,
    };
  }
  const text = JSON_COMMANDS.includes(def.flag)
    ? JSON.stringify(res.json, null, 2)
    : res.text;
  return { text, isError: false };
}

function jsonRpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function jsonRpcError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return { jsonrpc: "2.0", id, error };
}

/**
 * Pure JSON-RPC request handler. Given a parsed message, returns a response
 * object, or `null` for notifications (which get no response).
 * @param {*} msg
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 * @returns {object|null}
 */
export function handleMessage(msg, opts = {}) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return jsonRpcError(msg && msg.id !== undefined ? msg.id : null, -32600, "Invalid Request");
  }

  const { id, method, params } = msg;
  const isNotification = id === undefined || id === null;

  switch (method) {
    case "initialize":
      return jsonRpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });

    case "notifications/initialized":
      return null; // notification: no response

    case "ping":
      return jsonRpcResult(id, {});

    case "tools/list":
      return jsonRpcResult(id, { tools: TOOLS });

    case "tools/call": {
      const name = params && params.name;
      if (!MCP_TOOL_NAMES.includes(name)) {
        return jsonRpcError(id, -32602, `Unknown tool: ${String(name)}`, {
          allowed_tools: [...MCP_TOOL_NAMES],
        });
      }
      const args =
        params && params.arguments && typeof params.arguments === "object" && !Array.isArray(params.arguments)
          ? params.arguments
          : {};
      const { text, isError } = callTool(name, opts, args);
      return jsonRpcResult(id, { content: [{ type: "text", text }], isError });
    }

    default:
      if (isNotification) return null;
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}

/**
 * Start the newline-delimited JSON-RPC loop over the given streams. Defaults
 * to process.stdin/stdout. Reads stdin and writes stdout ONLY — it opens no
 * socket, binds no port, and starts no server object. The Bridge path comes
 * from this process's environment (set it before starting Claude Code).
 * @param {{input?: NodeJS.ReadableStream, output?: {write: Function}, env?: Record<string, string|undefined>}} [opts]
 */
export function startStdioServer({ input = process.stdin, output = process.stdout, env = process.env } = {}) {
  let buffer = "";
  if (typeof input.setEncoding === "function") {
    input.setEncoding("utf8");
  }
  input.on("data", (chunk) => {
    buffer += chunk;
    let nl;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      let parsed;
      try {
        parsed = JSON.parse(line);
      } catch {
        output.write(JSON.stringify(jsonRpcError(null, -32700, "Parse error")) + "\n");
        continue;
      }
      const response = handleMessage(parsed, { env });
      if (response !== null) output.write(JSON.stringify(response) + "\n");
    }
  });
  return { input, output };
}

// Only start the stdio loop when executed directly (not when imported by
// tests or by the guardrails).
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const selfPath = fileURLToPath(import.meta.url);
if (invokedPath && invokedPath === selfPath) {
  startStdioServer();
}

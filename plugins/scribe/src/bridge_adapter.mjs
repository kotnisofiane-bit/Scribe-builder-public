// bridge_adapter.mjs
//
// Strict, READ-ONLY adapter to a locally-installed SCRIBE Bridge CLI. This is
// the single place that launches the Bridge, and it does so under tight rules:
//
//   - Only the four read-only Bridge commands are ever forwarded
//     (--version / --status / --capabilities / --self-check).
//   - The Bridge is spawned via spawnSync with process.execPath and an explicit
//     argv array [entry, command]. The shell option is disabled, so no string
//     is ever interpreted by a shell.
//   - A short timeout and a hard output cap (maxBuffer) bound every call.
//   - Only PATH is passed to the child; no ambient environment variable is
//     forwarded — EXCEPT, for the MACRO-API-1 backend metadata probe, the two
//     SCRIBE_BACKEND_* config vars, which are passed through OPAQUELY (the plugin
//     never reads, parses, logs, or uses their values; the Bridge is the only
//     component that reads them). Every other var is still stripped.
//   - --status / --capabilities / --self-check output is STRICTLY parsed as a
//     JSON object; anything invalid fails closed.
//   - A missing/invalid Bridge path, a non-allowlisted command, a timeout, an
//     oversized output, or invalid JSON all fail closed (no partial trust).
//   - It reads no user repository, no .env, no keychain, no cookies; it opens no
//     network client or server itself and never sends the backend probe itself —
//     it only routes the probe to the Bridge (which owns the one network client).

import process from "node:process";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import {
  MATURITY_BANNER,
  MANDATORY_NOTICES,
  NEXT_SAFE_ACTION,
} from "./notices.mjs";
import { formatOperatorHint } from "./operator_messages.mjs";

// The only read-only Bridge subcommands this adapter will ever forward.
export const ALLOWED_COMMANDS = Object.freeze([
  "--version",
  "--status",
  "--capabilities",
  "--self-check",
]);

// The subset whose stdout must be a strict JSON object.
export const JSON_COMMANDS = Object.freeze([
  "--status",
  "--capabilities",
  "--self-check",
]);

// MACRO-VERTICAL-1B: the local decision-trace operations. These are DISTINCT
// from the read-only commands above (they take parameters and, for init/record,
// write ONLY inside the Bridge's explicit journal home). The map fixes exactly
// which Bridge CLI flag each op forwards; nothing else is ever forwarded.
export const SESSION_OPS = Object.freeze(["session_init", "record", "replay", "digest"]);
export const SESSION_OP_FLAG = Object.freeze({
  session_init: "--session-init",
  record: "--session-record",
  replay: "--session-replay",
  digest: "--session-digest",
});

/** @param {string} op */
export function isAllowedSessionOp(op) {
  return SESSION_OPS.includes(op);
}

// MACRO-BRIDGE-6: the workspace M0 read-only operations. attach takes an explicit
// workspace root (passed verbatim); status/manifest/detach take only the session.
// They write ONLY inside the Bridge's local journal home (attachment + manifest),
// never the user's workspace, never a repo, never Git.
export const WORKSPACE_OPS = Object.freeze(["workspace_attach", "workspace_status", "workspace_manifest", "workspace_detach"]);
export const WORKSPACE_OP_FLAG = Object.freeze({
  workspace_attach: "--workspace-attach",
  workspace_status: "--workspace-status",
  workspace_manifest: "--workspace-manifest",
  workspace_detach: "--workspace-detach",
});

/** @param {string} op */
export function isAllowedWorkspaceOp(op) {
  return WORKSPACE_OPS.includes(op);
}

// MACRO-API-1: the backend metadata probe. CLI-only on the Bridge; the plugin
// routes to it and stays thin — it performs NO HTTP, reads NO token or URL, and
// only forwards the two config vars OPAQUELY (below) so the Bridge can send.
export const BACKEND_OPS = Object.freeze(["backend_probe"]);
export const BACKEND_OP_FLAG = Object.freeze({ backend_probe: "--backend-probe" });

/** @param {string} op */
export function isAllowedBackendOp(op) {
  return BACKEND_OPS.includes(op);
}

// POLAR-ACCESS-1: the product access activation ops. INSTALLATION-WIDE — no
// journal home, no session, no argv payload (the Bridge builds a fixed closed
// request internally). Each maps to exactly one Bridge flag. The plugin forwards
// ONLY the LOCAL access config vars OPAQUELY (below) so the Bridge can reach the
// LOCAL activation Backend (loopback); the plugin performs NO HTTP, reads NO
// token/URL, and NEVER handles a license key (the key is entered only in the
// Backend-owned loopback page).
export const ACCESS_OPS = Object.freeze(["access_prepare", "access_status"]);
export const ACCESS_OP_FLAG = Object.freeze({
  access_prepare: "--access-prepare",
  access_status: "--access-status",
});

/** @param {string} op */
export function isAllowedAccessOp(op) {
  return ACCESS_OPS.includes(op);
}

// ASSEMBLY-CORE-MISSION-1 (R2): the governed Mission ops. Draft takes the user's
// EXPLICIT objective and transmits it VERBATIM as one bounded JSON document on the
// child's STDIN — never argv, never env; status/resume take an optional opaque
// mission id (else the Bridge resolves it locally: session pointer, then the
// stable workspace registry). Like the backend probe, the plugin forwards ONLY the
// two SCRIBE_BACKEND_* config vars OPAQUELY so the Bridge can reach the backend;
// it performs NO HTTP itself.
export const MISSION_OPS = Object.freeze(["mission_draft", "mission_status", "mission_resume"]);
export const MISSION_OP_FLAG = Object.freeze({
  mission_draft: "--mission-draft",
  mission_status: "--mission-status",
  mission_resume: "--mission-resume",
});

/** @param {string} op */
export function isAllowedMissionOp(op) {
  return MISSION_OPS.includes(op);
}

// CONTRACT-LOT-1: the governed lot/contract ops. All parameters are OPAQUE ids
// (mis_/lot_/ctr_) riding argv; there is NO free text anywhere. A lot selection
// forwards the explicit human confirmation as the literal --confirm-selection flag
// ONLY when the tool argument confirm_selection is exactly true — the plugin never
// defaults it, so nothing can auto-select. Same opaque two-var backend passthrough.
export const LOT_CONTRACT_OPS = Object.freeze([
  "lots_propose", "lots_status", "lot_select",
  "contract_draft", "contract_status", "contract_resume",
]);
export const LOT_CONTRACT_OP_FLAG = Object.freeze({
  lots_propose: "--lots-propose",
  lots_status: "--lots-status",
  lot_select: "--lot-select",
  contract_draft: "--contract-draft",
  contract_status: "--contract-status",
  contract_resume: "--contract-resume",
});

/** @param {string} op */
export function isAllowedLotContractOp(op) {
  return LOT_CONTRACT_OPS.includes(op);
}

// EXECUTION-EVIDENCE-1: the governed execution/evidence ops. All ids are OPAQUE
// (exe_/ctr_) riding argv; the STRUCTURED report / evidence content rides the child's
// STDIN as ONE bounded JSON document (never argv/env), through the SAME single spawn.
// The plugin performs no HTTP and makes NO decision — it never claims an agent really
// executed anything and never marks evidence VERIFIED (the Core tiers it).
export const EXECUTION_EVIDENCE_OPS = Object.freeze([
  "execution_prepare", "execution_status", "execution_resume", "execution_report",
  "evidence_submit", "evidence_status", "evidence_resume",
]);
export const EXECUTION_EVIDENCE_OP_FLAG = Object.freeze({
  execution_prepare: "--execution-prepare",
  execution_status: "--execution-status",
  execution_resume: "--execution-resume",
  execution_report: "--execution-report",
  evidence_submit: "--evidence-submit",
  evidence_status: "--evidence-status",
  evidence_resume: "--evidence-resume",
});

/** @param {string} op */
export function isAllowedExecutionEvidenceOp(op) {
  return EXECUTION_EVIDENCE_OPS.includes(op);
}

// SCRIBE-START-1: the unified start. ONE Bridge flag; the Bridge is authoritative
// for the whole orchestration (self-check, join-or-start of the LOCAL backend,
// reflected POLAR-ACCESS-1 state, workspace recognition, mission resume, pending
// Human Gate reflection, loopback Eyes opening). The plugin stays thin: no HTTP,
// no access logic, no process discovery, no browser opening of its own — it
// forwards a closed env allowlist OPAQUELY and relays the closed JSON result.
export const START_OPS = Object.freeze(["start"]);
export const START_OP_FLAG = Object.freeze({ start: "--start" });

/** @param {string} op */
export function isAllowedStartOp(op) {
  return START_OPS.includes(op);
}

// Env var names forwarded OPAQUELY to the Bridge for the backend probe. The
// plugin never reads, parses, logs, or acts on their values — it only copies
// them through so the Bridge (the sole authority for the probe) can resolve its
// target and authenticate. Passing the token via the child ENV (not argv) keeps
// it out of the process argument list.
export const BACKEND_PROBE_ENV_PASSTHROUGH = Object.freeze([
  "SCRIBE_BACKEND_URL",
  "SCRIBE_BACKEND_PREVIEW_TOKEN",
]);

// POLAR-ACCESS-1: the access ops reach the LOCAL activation Backend (loopback),
// resolved by the Bridge from a DISTINCT SCRIBE_LOCAL_ACCESS_URL. The plugin
// forwards ONLY these two vars OPAQUELY (child ENV, never argv); it never reads,
// parses, logs, or acts on their values, and never forwards the remote
// SCRIBE_BACKEND_URL to the access path. The license key is NEVER an env var.
export const ACCESS_ENV_PASSTHROUGH = Object.freeze([
  "SCRIBE_LOCAL_ACCESS_URL",
  "SCRIBE_BACKEND_PREVIEW_TOKEN",
]);

// SCRIBE-START-1: the unified start needs the union of the LOCAL access config
// (loopback backend + technical token), the remote backend target (when set),
// and the CLOSED set of non-secret locations the Bridge/backend use to join or
// start the local components (backend home, python binary, Eyes shell root,
// Builder root, mission store dir) plus the explicit no-browser switch. All are
// forwarded OPAQUELY (child env, never argv); the plugin never reads, parses,
// logs, or acts on their values. NO license key is ever an env var.
export const START_ENV_PASSTHROUGH = Object.freeze([
  "SCRIBE_LOCAL_ACCESS_URL",
  "SCRIBE_BACKEND_URL",
  "SCRIBE_BACKEND_PREVIEW_TOKEN",
  "SCRIBE_BACKEND_HOME",
  "SCRIBE_PYTHON",
  "SCRIBE_EYES_SHELL_ROOT",
  "SCRIBE_BUILDER_ROOT",
  "SCRIBE_MISSION_STORE_DIR",
  "SCRIBE_START_NO_BROWSER",
]);

// The unified start may legitimately wait for a local backend readiness poll and
// a browser opener, so it gets a longer (still bounded) timeout than the quick
// informational calls.
export const START_TIMEOUT_MS = 30000;

// The Bridge path must be provided by ONE of these explicit env vars.
export const BRIDGE_ENTRY_ENV = "SCRIBE_BRIDGE_ENTRY";
export const BRIDGE_HOME_ENV = "SCRIBE_BRIDGE_HOME";

// The journal home for the local decision trace. Explicit override wins; else a
// stable default under the user's home (never the repo, plugin root, or cwd).
export const BRIDGE_JOURNAL_HOME_ENV = "SCRIBE_BRIDGE_JOURNAL_HOME";

// Short timeout and hard output cap. Kept small on purpose: these are quick,
// local, informational calls.
export const DEFAULT_TIMEOUT_MS = 10000;
export const MAX_OUTPUT_BYTES = 1000000; // 1 MB

/** @param {string} cmd */
export function isAllowedCommand(cmd) {
  return ALLOWED_COMMANDS.includes(cmd);
}

/**
 * Resolve the Bridge entry point from an EXPLICIT env var. No search, no
 * default, no guessing.
 * @param {Record<string, string|undefined>} [env]
 * @returns {string|null}
 */
export function resolveBridgeEntry(env = process.env) {
  const entry = env[BRIDGE_ENTRY_ENV];
  if (typeof entry === "string" && entry.trim() !== "") {
    return path.resolve(entry.trim());
  }
  const home = env[BRIDGE_HOME_ENV];
  if (typeof home === "string" && home.trim() !== "") {
    return path.resolve(home.trim(), "src", "index.js");
  }
  return null;
}

/**
 * Truncate a string to a maximum length, appending a marker if truncated.
 * @param {unknown} value
 * @param {number} [maxBytes]
 * @returns {string}
 */
export function boundString(value, maxBytes = MAX_OUTPUT_BYTES) {
  const s = typeof value === "string" ? value : String(value ?? "");
  if (s.length <= maxBytes) return s;
  return s.slice(0, maxBytes) + "\n...[output truncated]";
}

/**
 * Build the minimal environment for the child: PATH only, plus any explicitly
 * allowlisted passthrough var names (used ONLY to forward the two SCRIBE_BACKEND_*
 * config vars for the backend probe). Nothing else ambient is forwarded.
 * @param {Record<string, string|undefined>} [env]
 * @param {readonly string[]} [passthrough]
 * @returns {Record<string, string>}
 */
export function minimalEnv(env = process.env, passthrough = []) {
  const out = {};
  if (typeof env.PATH === "string") out.PATH = env.PATH;
  for (const name of passthrough) {
    if (typeof env[name] === "string") out[name] = env[name];
  }
  return out;
}

/**
 * Resolve the explicit journal home for the local decision trace. An explicit
 * SCRIBE_BRIDGE_JOURNAL_HOME wins; otherwise a stable default under the user's
 * home directory (`<home>/.scribe-bridge/journal`). Never the repo, the plugin
 * root, or the cwd. The Bridge itself requires this explicit path and performs
 * no disk search — this is where the plugin supplies it.
 * @param {Record<string, string|undefined>} [env]
 * @returns {string}
 */
export function resolveJournalHome(env = process.env) {
  const explicit = env[BRIDGE_JOURNAL_HOME_ENV];
  if (typeof explicit === "string" && explicit.trim() !== "") {
    return path.resolve(explicit.trim());
  }
  return path.join(os.homedir(), ".scribe-bridge", "journal");
}

// The SINGLE place that launches the Bridge. Both the read-only commands and the
// local decision-trace ops funnel through here, so there is exactly one spawn in
// the whole plugin. Resolves + checks the explicit Bridge path, spawns node with
// an explicit argv array (shell disabled), and fails closed on every error path.
function launchBridge(argv, opts = {}) {
  const env = opts.env ?? process.env;
  const timeoutMs =
    Number.isInteger(opts.timeoutMs) && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_TIMEOUT_MS;
  const maxBytes =
    Number.isInteger(opts.maxBytes) && opts.maxBytes > 0 ? opts.maxBytes : MAX_OUTPUT_BYTES;

  const entry = resolveBridgeEntry(env);
  if (!entry) return { ok: false, error: "bridge_path_not_set" };
  if (!existsSync(entry) || !statSync(entry).isFile()) {
    return { ok: false, error: "bridge_entry_not_found", entry };
  }

  const bridgeRoot = path.dirname(path.dirname(entry));
  const forwardEnv = Array.isArray(opts.forwardEnv) ? opts.forwardEnv : [];
  const spawnOpts = {
    shell: false,
    timeout: timeoutMs,
    maxBuffer: maxBytes,
    encoding: "utf8",
    env: minimalEnv(env, forwardEnv),
    cwd: bridgeRoot,
    windowsHide: true,
  };
  // R2: an optional bounded stdin document for the child (the mission objective
  // travels this way — NEVER via argv, NEVER via env), still the SAME single spawn.
  if (typeof opts.stdinInput === "string") {
    spawnOpts.input = opts.stdinInput;
  }
  const result = spawnSync(process.execPath, [entry, ...argv], spawnOpts);

  if (result.error) {
    const code = /** @type {any} */ (result.error).code;
    if (code === "ETIMEDOUT") return { ok: false, error: "timeout", timeoutMs };
    if (code === "ENOBUFS") return { ok: false, error: "output_too_large", maxBytes };
    return { ok: false, error: "spawn_failed", detail: String(result.error.message) };
  }
  if (result.signal === "SIGTERM") {
    return { ok: false, error: "timeout", timeoutMs };
  }

  return {
    ok: true,
    exitCode: typeof result.status === "number" ? result.status : 1,
    stdout: boundString(result.stdout ?? "", maxBytes),
    stderr: boundString(result.stderr ?? "", maxBytes),
    signal: result.signal ?? null,
  };
}

/**
 * Launch the Bridge with exactly one allowlisted read-only command and return
 * the raw (bounded) result. Fails closed on every error path.
 * @param {string} command
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeRaw(command, opts = {}) {
  if (!isAllowedCommand(command)) {
    return { ok: false, command, error: "command_not_allowlisted" };
  }
  const res = launchBridge([command], opts);
  return { ...res, command };
}

/**
 * Run one allowlisted command and, for JSON commands, strictly parse stdout
 * into a plain object. Fails closed on invalid JSON.
 * @param {string} command
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeCommand(command, opts = {}) {
  const raw = runBridgeRaw(command, opts);
  if (!raw.ok) return raw;

  if (JSON_COMMANDS.includes(command)) {
    let json;
    try {
      json = JSON.parse(raw.stdout);
    } catch {
      return { ok: false, command, error: "invalid_json", exitCode: raw.exitCode };
    }
    if (json === null || typeof json !== "object" || Array.isArray(json)) {
      return { ok: false, command, error: "invalid_json_shape", exitCode: raw.exitCode };
    }
    return { ok: true, command, exitCode: raw.exitCode, json, stderr: raw.stderr };
  }

  const text = raw.stdout.trim();
  if (text === "") {
    return { ok: false, command, error: "empty_output", exitCode: raw.exitCode };
  }
  return { ok: true, command, exitCode: raw.exitCode, text, stderr: raw.stderr };
}

/**
 * Run one local decision-trace operation against the Bridge and strictly parse
 * its JSON object result. The plugin supplies the explicit journal home; the
 * session id / event type default to "default" / "decision.noted". The Bridge is
 * authoritative for all content rules (allowed event types, 1-500 char summary,
 * never-send) and returns a readable JSON result or a bounded refusal — the
 * plugin relays it. Fails closed on a bad path, timeout, cap, or invalid JSON.
 * @param {"session_init"|"record"|"replay"|"digest"} op
 * @param {{session_id?: string, event_type?: string, display_summary?: string}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeSession(op, args = {}, opts = {}) {
  const flag = SESSION_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, home, "--session-id", sessionId];
  if (op === "record") {
    const eventType =
      typeof args.event_type === "string" && args.event_type.trim() !== ""
        ? args.event_type.trim()
        : "decision.noted";
    argv.push("--event-type", eventType);
    // Pass the summary literally when provided (even ""); omit it only when it is
    // not a string, so the Bridge reports the precise "required" refusal.
    if (typeof args.display_summary === "string") {
      argv.push("--display-summary", args.display_summary);
    }
  }

  const raw = launchBridge(argv, opts);
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run one workspace M0 operation against the Bridge and strictly parse its JSON.
 * The plugin transmits the EXPLICIT workspace root verbatim (it does not correct
 * it, search for a repo, or use the cwd) and supplies the explicit journal home.
 * The Bridge is authoritative for validation (absolute/existing/safe root,
 * bounds, exclusions) and returns a bounded result or refusal — the plugin
 * relays it. Fails closed on a bad path, timeout, cap, or invalid JSON.
 * @param {"workspace_attach"|"workspace_status"|"workspace_manifest"|"workspace_detach"} op
 * @param {{session_id?: string, workspace_root?: string}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeWorkspace(op, args = {}, opts = {}) {
  const flag = WORKSPACE_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  let argv;
  if (op === "workspace_attach") {
    // The explicit root follows the flag, passed verbatim (even when unusual).
    const root = typeof args.workspace_root === "string" ? args.workspace_root : "";
    argv = [flag, root, "--journal-home", home, "--session-id", sessionId];
  } else {
    argv = [flag, "--journal-home", home, "--session-id", sessionId];
  }

  const raw = launchBridge(argv, opts);
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run the MACRO-API-1 backend metadata probe against the Bridge and strictly
 * parse its JSON result. The plugin supplies the explicit journal home + session
 * and forwards ONLY the two SCRIBE_BACKEND_* config vars OPAQUELY (via the child
 * env, never argv); it performs no HTTP itself, reads no token/URL, and adds no
 * payload. The Bridge is authoritative: it decides configured-or-not, projects
 * the metadata-only payload, sends at most one request, and returns a transparent
 * result or a bounded refusal — the plugin relays it. Fails closed on a bad path,
 * timeout, cap, or invalid JSON.
 * @param {"backend_probe"} op
 * @param {{session_id?: string}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeBackend(op, args = {}, opts = {}) {
  const flag = BACKEND_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, "--journal-home", home, "--session-id", sessionId];
  // Forward ONLY the two backend config vars, opaquely, so the Bridge can send.
  const raw = launchBridge(argv, { ...opts, forwardEnv: BACKEND_PROBE_ENV_PASSTHROUGH });
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run one product access activation op (POLAR-ACCESS-0) against the Bridge and
 * strictly parse its JSON result. INSTALLATION-WIDE: no journal home, no session,
 * no argv payload — the Bridge builds a fixed closed request internally. The
 * plugin forwards ONLY the two SCRIBE_BACKEND_* config vars OPAQUELY (child env,
 * never argv) so the Bridge can reach the future Backend access route; it performs
 * NO HTTP, reads NO token/URL, and NEVER handles a license key. The Bridge is
 * authoritative (configured-or-not, single request, closed snapshot validation,
 * or the honest "access_backend_unavailable"). Fails closed on a bad path,
 * timeout, cap, or invalid JSON.
 * @param {"access_prepare"|"access_status"} op
 * @param {object} [_args] unused — the access ops take no parameters
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeAccess(op, _args = {}, opts = {}) {
  const flag = ACCESS_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  // Installation-wide: the ONLY argv token is the flag. No home, no session, no
  // payload. Forward ONLY the LOCAL access config vars, opaquely, so the Bridge
  // can reach the LOCAL activation Backend (loopback).
  const raw = launchBridge([flag], { ...opts, forwardEnv: ACCESS_ENV_PASSTHROUGH });
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run one governed Mission op (ASSEMBLY-CORE-MISSION-1) against the Bridge and
 * strictly parse its JSON result. The plugin supplies the explicit journal home +
 * session and forwards ONLY the two SCRIBE_BACKEND_* config vars OPAQUELY (child
 * env, never argv) so the Bridge can reach the backend.
 *
 * R2 — the OBJECTIVE never rides argv or the environment: for mission_draft the
 * plugin transmits it VERBATIM (never filtered, never interpreted) as ONE bounded
 * JSON document `{"objective": "..."}` on the child's STDIN, through the SAME
 * single spawn. Only OPAQUE ids (--session-id / --mission-id) ever ride argv, so
 * a process list can never show the objective. The plugin performs no HTTP, reads
 * no token/URL, and screens no objective — the Bridge is authoritative (it parses
 * the bounded stdin envelope fail-closed, screens the objective, runs the
 * never-send gate, sends at most one request, and records the opaque mission id
 * locally). Fails closed on a bad path, timeout, cap, or bad JSON.
 * @param {"mission_draft"|"mission_status"|"mission_resume"} op
 * @param {{session_id?: string, objective?: string, mission_id?: string}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeMission(op, args = {}, opts = {}) {
  const flag = MISSION_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, "--journal-home", home, "--session-id", sessionId];
  const launchOpts = { ...opts, forwardEnv: BACKEND_PROBE_ENV_PASSTHROUGH };
  if (op === "mission_draft") {
    // Stdin only. Pass the objective VERBATIM when provided (even ""); omit the
    // stdin document only when it is not a string, so the Bridge reports its
    // precise "draft_input_required" refusal. Never placed in argv or env.
    if (typeof args.objective === "string") {
      launchOpts.stdinInput = JSON.stringify({ objective: args.objective });
    } else {
      launchOpts.stdinInput = "";
    }
  } else if (typeof args.mission_id === "string" && args.mission_id.trim() !== "") {
    argv.push("--mission-id", args.mission_id.trim());
  }

  // Forward ONLY the two backend config vars, opaquely, so the Bridge can send.
  const raw = launchBridge(argv, launchOpts);
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run one governed lot/contract op (CONTRACT-LOT-1) against the Bridge and strictly
 * parse its JSON result. ONLY opaque ids ride argv (--mission-id / --lot-id /
 * --contract-id); the explicit human selection is forwarded as --confirm-selection
 * ONLY when confirm_selection is exactly true (never defaulted — no auto-select).
 * The plugin performs no HTTP and makes no decision; the Bridge + backend + Core
 * are authoritative. Fails closed on a bad path, timeout, cap, or bad JSON.
 * @param {"lots_propose"|"lots_status"|"lot_select"|"contract_draft"|"contract_status"|"contract_resume"} op
 * @param {{session_id?: string, mission_id?: string, lot_id?: string,
 *          contract_id?: string, confirm_selection?: boolean}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeLotContract(op, args = {}, opts = {}) {
  const flag = LOT_CONTRACT_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, "--journal-home", home, "--session-id", sessionId];
  if (typeof args.mission_id === "string" && args.mission_id.trim() !== "") {
    argv.push("--mission-id", args.mission_id.trim());
  }
  if (typeof args.lot_id === "string" && args.lot_id.trim() !== "") {
    argv.push("--lot-id", args.lot_id.trim());
  }
  if (typeof args.contract_id === "string" && args.contract_id.trim() !== "") {
    argv.push("--contract-id", args.contract_id.trim());
  }
  if (op === "lot_select" && args.confirm_selection === true) {
    argv.push("--confirm-selection");
  }

  const raw = launchBridge(argv, { ...opts, forwardEnv: BACKEND_PROBE_ENV_PASSTHROUGH });
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run one governed execution/evidence op (EXECUTION-EVIDENCE-1) against the Bridge and
 * strictly parse its JSON result. ONLY opaque ids ride argv (--contract-id /
 * --execution-id); the STRUCTURED report / evidence content is transmitted VERBATIM as
 * ONE bounded JSON document on the child's STDIN (never argv/env), through the SAME
 * single spawn. The plugin performs no HTTP, makes no decision, never claims an agent
 * executed anything, and never marks evidence VERIFIED — the Bridge + backend + Core are
 * authoritative. Fails closed on a bad path, timeout, cap, or bad JSON.
 * @param {"execution_prepare"|"execution_status"|"execution_resume"|"execution_report"|"evidence_submit"|"evidence_status"|"evidence_resume"} op
 * @param {{session_id?: string, contract_id?: string, execution_id?: string,
 *          report?: object, evidence_records?: object[]}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeExecutionEvidence(op, args = {}, opts = {}) {
  const flag = EXECUTION_EVIDENCE_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, "--journal-home", home, "--session-id", sessionId];
  if (typeof args.contract_id === "string" && args.contract_id.trim() !== "") {
    argv.push("--contract-id", args.contract_id.trim());
  }
  if (typeof args.execution_id === "string" && args.execution_id.trim() !== "") {
    argv.push("--execution-id", args.execution_id.trim());
  }
  const launchOpts = { ...opts, forwardEnv: BACKEND_PROBE_ENV_PASSTHROUGH };
  // The report / evidence content travels ONLY via the child stdin (never argv/env).
  // Pass the document when provided; omit it (empty stdin) otherwise so the Bridge
  // reports its precise "report_required" / "evidence_records_required" refusal.
  if (op === "execution_report") {
    launchOpts.stdinInput =
      args.report && typeof args.report === "object" && !Array.isArray(args.report)
        ? JSON.stringify({ report: args.report })
        : "";
  } else if (op === "evidence_submit") {
    launchOpts.stdinInput = Array.isArray(args.evidence_records)
      ? JSON.stringify({ evidence_records: args.evidence_records })
      : "";
  }

  const raw = launchBridge(argv, launchOpts);
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Run the unified start (SCRIBE-START-1) against the Bridge and strictly parse
 * its closed JSON result. The plugin supplies the explicit journal home + the
 * session id; the Bridge is authoritative for EVERYTHING else (join-or-start,
 * reflected access state, workspace, mission resume, Eyes). Only the flag, the
 * journal home, and the session id ride argv; the closed START env allowlist is
 * forwarded OPAQUELY (child env, never argv). Fails closed on a bad path,
 * timeout, cap, or invalid JSON.
 * @param {"start"} op
 * @param {{session_id?: string}} [args]
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function runBridgeStart(op, args = {}, opts = {}) {
  const flag = START_OP_FLAG[op];
  if (!flag) return { ok: false, op, error: "command_not_allowlisted" };

  const env = opts.env ?? process.env;
  const home = resolveJournalHome(env);
  const sessionId =
    typeof args.session_id === "string" && args.session_id.trim() !== ""
      ? args.session_id.trim()
      : "default";

  const argv = [flag, "--journal-home", home, "--session-id", sessionId];
  const timeoutMs =
    Number.isInteger(opts.timeoutMs) && opts.timeoutMs > 0 ? opts.timeoutMs : START_TIMEOUT_MS;
  const raw = launchBridge(argv, { ...opts, timeoutMs, forwardEnv: START_ENV_PASSTHROUGH });
  if (!raw.ok) return { ...raw, op };

  let json;
  try {
    json = JSON.parse(raw.stdout);
  } catch {
    return { ok: false, op, error: "invalid_json", exitCode: raw.exitCode };
  }
  if (json === null || typeof json !== "object" || Array.isArray(json)) {
    return { ok: false, op, error: "invalid_json_shape", exitCode: raw.exitCode };
  }
  return { ok: true, op, exitCode: raw.exitCode, json, stderr: raw.stderr };
}

/**
 * Dry local init: probe the Bridge with the four read-only commands and return
 * a structured summary. Never writes, never attaches a repo, never calls a
 * backend. Every failure is recorded in `errors` and fails closed.
 * @param {{env?: Record<string, string|undefined>, timeoutMs?: number, maxBytes?: number}} [opts]
 */
export function bridgeInit(opts = {}) {
  const env = opts.env ?? process.env;
  const entry = resolveBridgeEntry(env);
  const found = Boolean(entry) && existsSync(entry) && statSync(entry).isFile();

  const summary = {
    bridge_found: found,
    bridge_path: entry ?? null,
    version: null,
    commercial_ready: false,
    beta_ready: false,
    backend_connected: false,
    dashboard_enabled: false,
    repo_attached: false,
    authority: null,
    self_check: null,
    limitations: [],
    errors: [],
  };

  if (!found) {
    summary.errors.push(entry ? "bridge_entry_not_found" : "bridge_path_not_set");
    return summary;
  }

  const v = runBridgeCommand("--version", opts);
  if (v.ok) summary.version = v.text;
  else summary.errors.push(`version:${v.error}`);

  const s = runBridgeCommand("--status", opts);
  if (s.ok) {
    summary.commercial_ready = Boolean(s.json.commercial_ready);
    summary.beta_ready = Boolean(s.json.beta_ready);
    summary.backend_connected = Boolean(s.json.backend_connected);
    summary.dashboard_enabled = Boolean(s.json.dashboard_enabled);
    summary.repo_attached = Boolean(s.json.repo_attached);
    if (typeof s.json.authority === "string") summary.authority = s.json.authority;
    if (!summary.version && typeof s.json.version === "string") summary.version = s.json.version;
  } else {
    summary.errors.push(`status:${s.error}`);
  }

  const c = runBridgeCommand("--capabilities", opts);
  if (c.ok) {
    if (typeof c.json.authority === "string") summary.authority = c.json.authority;
    if (Array.isArray(c.json.forbidden)) summary.limitations = c.json.forbidden.map(String).slice(0, 64);
  } else {
    summary.errors.push(`capabilities:${c.error}`);
  }

  const sc = runBridgeCommand("--self-check", opts);
  if (sc.ok) summary.self_check = sc.json.ok === true ? "ok" : "failed";
  else summary.errors.push(`self-check:${sc.error}`);

  return summary;
}

/**
 * Render the init summary as a human-readable report, including the maturity
 * banner and all mandatory notices.
 * @param {ReturnType<typeof bridgeInit>} summary
 * @returns {string}
 */
export function formatInitReport(summary) {
  const yn = (b) => (b ? "yes" : "no");
  const lines = [];
  lines.push("SCRIBE private plugin status");
  lines.push("Bridge dry local init (read-only)");
  lines.push("");
  for (const b of MATURITY_BANNER) lines.push(b);
  lines.push("");
  lines.push(`SCRIBE Bridge found: ${yn(summary.bridge_found)}`);
  lines.push(`Bridge path: ${summary.bridge_path ?? "(not set)"}`);
  lines.push(`Bridge version: ${summary.version ?? "(unknown)"}`);
  lines.push("status flags:");
  lines.push(`  commercial_ready: ${summary.commercial_ready}`);
  lines.push(`  beta_ready: ${summary.beta_ready}`);
  lines.push(`  backend_connected: ${summary.backend_connected}`);
  lines.push(`  dashboard_enabled: ${summary.dashboard_enabled}`);
  lines.push(`  repo_attached: ${summary.repo_attached}`);
  lines.push(`authority: ${summary.authority ?? "(unknown)"}`);
  lines.push(`self_check: ${summary.self_check ?? "(not run)"}`);
  lines.push("limitations:");
  if (summary.limitations.length === 0) {
    lines.push("  (none reported)");
  } else {
    for (const l of summary.limitations) lines.push(`  - ${l}`);
  }
  if (summary.errors.length > 0) {
    lines.push("errors:");
    for (const e of summary.errors) lines.push(`  - ${e}`);
  }
  lines.push(`next safe action: ${NEXT_SAFE_ACTION}`);

  // Troubleshooting hints: one readable paragraph per distinct failure.
  const hintCodes = new Set();
  for (const e of summary.errors) {
    hintCodes.add(e.includes(":") ? e.split(":").pop() : e);
  }
  if (summary.self_check === "failed") hintCodes.add("self_check_failed");
  if (hintCodes.size > 0) {
    lines.push("");
    lines.push("Troubleshooting:");
    for (const code of hintCodes) lines.push(`  - ${formatOperatorHint(code)}`);
  }

  lines.push("");
  lines.push("Notices:");
  for (const n of MANDATORY_NOTICES) lines.push(`  ${n}`);
  return lines.join("\n");
}

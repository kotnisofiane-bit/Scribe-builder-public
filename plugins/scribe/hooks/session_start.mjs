#!/usr/bin/env node
// session_start.mjs — SessionStart hook (ACCESS-PLUGIN-1A).
//
// Detects/creates the local session continuity and injects a BOUNDED (<= 2 KB)
// continuity context: Mission, active lot, contract/status, an optional Gate,
// and the next action. It resumes Mission/workspace ONLY through the existing
// read-only adapter ops (session_init / workspace_status / mission_status /
// lots_status / contract_status) — the single spawn lives in the adapter.
//
// Safety posture (all enforced here + in src/session_context.mjs):
//   - FAIL-OPEN: a missing Bridge, an unconfigured backend, an error, or a
//     timeout yields a minimal note (or nothing extra) — NEVER a crash, NEVER a
//     block. The hook ALWAYS exits 0.
//   - SHORT per-call timeout; backend ops are attempted only when the backend is
//     explicitly configured (no speculative network round-trips otherwise).
//   - It writes nothing itself, opens no network itself, and injects NO full
//     journal / Ledger, NO transcript, NO absolute path, NO secret or token.

import process from "node:process";
import {
  runBridgeSession,
  runBridgeWorkspace,
  runBridgeMission,
  runBridgeLotContract,
  resolveBridgeEntry,
  BACKEND_PROBE_ENV_PASSTHROUGH,
} from "../src/bridge_adapter.mjs";
import { buildContinuityContext, extractContinuity } from "../src/session_context.mjs";

const SESSION_ID = "default";
const HOOK_TIMEOUT_MS = 2000;

/** Emit the SessionStart additionalContext envelope Claude Code consumes. */
function emit(context) {
  const payload = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: context,
    },
  };
  process.stdout.write(JSON.stringify(payload) + "\n");
}

/** The backend is "configured" only when BOTH SCRIBE_BACKEND_* vars are set. */
function backendConfigured(env) {
  return BACKEND_PROBE_ENV_PASSTHROUGH.every(
    (k) => typeof env[k] === "string" && env[k].trim() !== ""
  );
}

function main() {
  const env = process.env;
  const opts = { env, timeoutMs: HOOK_TIMEOUT_MS };

  // Fail-open: no explicit Bridge path -> nothing to resume from.
  if (!resolveBridgeEntry(env)) {
    emit(buildContinuityContext({ bridgeAvailable: false }));
    return;
  }

  const args = { session_id: SESSION_ID };

  // Detect/create the local session continuity (local journal only).
  const sessionRes = runBridgeSession("session_init", args, opts);
  if (!sessionRes.ok) {
    // Configured but not reachable (bad path, timeout, bad JSON) -> fail-open.
    emit(buildContinuityContext({ bridgeAvailable: true, bridgeReachable: false }));
    return;
  }
  const sessionActive = Boolean(sessionRes.json && sessionRes.json.error == null);

  // Workspace is a purely local, read-only structural lookup.
  const wsRes = runBridgeWorkspace("workspace_status", args, opts);
  const workspaceAttached = Boolean(
    wsRes.ok && wsRes.json && wsRes.json.ok === true && wsRes.json.attached === true
  );

  // Resume Mission/lot/contract ONLY when the backend is explicitly configured.
  let continuity = {};
  const configured = backendConfigured(env);
  if (configured) {
    const missionRes = runBridgeMission("mission_status", args, opts);
    const lotsRes = runBridgeLotContract("lots_status", args, opts);
    const contractRes = runBridgeLotContract("contract_status", args, opts);
    continuity = extractContinuity({
      mission: missionRes.ok ? missionRes.json : null,
      lots: lotsRes.ok ? lotsRes.json : null,
      contract: contractRes.ok ? contractRes.json : null,
    });
  }

  emit(
    buildContinuityContext({
      bridgeAvailable: true,
      bridgeReachable: true,
      backendConfigured: configured,
      sessionActive,
      workspaceAttached,
      continuity,
    })
  );
}

try {
  main();
} catch {
  // Fail-open: continuity must never block a session start.
  try {
    emit(buildContinuityContext({ bridgeAvailable: false }));
  } catch {
    /* ignore — nothing more we can safely do */
  }
}
process.exit(0);

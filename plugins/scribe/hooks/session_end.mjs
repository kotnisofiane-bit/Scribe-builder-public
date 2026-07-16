#!/usr/bin/env node
// session_end.mjs — SessionEnd hook (ACCESS-PLUGIN-1A).
//
// A best-effort continuity CLOSURE recorded when a session ends: it ensures the
// local session exists and records ONE bounded observation marker in the
// Bridge's local journal. It makes NO decision and NEVER fails the shutdown.
//
// Safety posture:
//   - FAIL-OPEN / NON-BLOCKING: a missing Bridge, an error, or a timeout is
//     swallowed; the hook ALWAYS exits 0. A failed closure is not a failed
//     session.
//   - SHORT timeout. It reuses the read-only adapter (the single spawn); it
//     writes nothing itself, opens no network, and prints no path/secret/
//     journal/transcript.

import process from "node:process";
import { runBridgeSession, resolveBridgeEntry } from "../src/bridge_adapter.mjs";

const SESSION_ID = "default";
const HOOK_TIMEOUT_MS = 2000;
const MARKER = "SessionEnd (best-effort continuity closure; not a decision).";

function main() {
  const env = process.env;
  const opts = { env, timeoutMs: HOOK_TIMEOUT_MS };
  if (!resolveBridgeEntry(env)) return; // nothing to journal to — fail-open

  const args = { session_id: SESSION_ID };
  const sessionRes = runBridgeSession("session_init", args, opts);
  if (!sessionRes.ok) return; // best-effort: skip silently
  runBridgeSession(
    "record",
    { ...args, event_type: "observation.noted", display_summary: MARKER },
    opts
  );
}

try {
  main();
} catch {
  // Best-effort: closure must never fail the session shutdown.
}
process.exit(0);

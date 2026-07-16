#!/usr/bin/env node
// pre_compact.mjs — PreCompact hook (ACCESS-PLUGIN-1A).
//
// A LIGHT, best-effort continuity checkpoint taken just before Claude compacts
// its context: it ensures the local session exists and records ONE bounded
// observation marker in the Bridge's local journal. It makes NO decision (the
// marker is an observation, never a decision/approval), and it NEVER blocks.
//
// Safety posture:
//   - FAIL-OPEN / NON-BLOCKING: a missing Bridge, an error, or a timeout is
//     swallowed; the hook ALWAYS exits 0 so compaction is never held up.
//   - SHORT timeout. It reuses the read-only adapter (the single spawn); it
//     writes nothing itself, opens no network, and prints no path/secret/
//     journal/transcript.

import process from "node:process";
import { runBridgeSession, resolveBridgeEntry } from "../src/bridge_adapter.mjs";

const SESSION_ID = "default";
const HOOK_TIMEOUT_MS = 2000;
const MARKER = "PreCompact checkpoint (continuity marker; not a decision).";

function main() {
  const env = process.env;
  const opts = { env, timeoutMs: HOOK_TIMEOUT_MS };
  if (!resolveBridgeEntry(env)) return; // nothing to journal to — fail-open

  const args = { session_id: SESSION_ID };
  // Ensure the session exists (idempotent), then record ONE observation marker.
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
  // Best-effort: never block compaction over a continuity checkpoint.
}
process.exit(0);

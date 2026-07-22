// session_context.mjs
//
// Pure logic module for ACCESS-PLUGIN-1A session continuity. It builds the
// BOUNDED continuity context that the SessionStart hook injects. It imports
// nothing that touches I/O: it spawns nothing, writes nothing, reads no repo,
// opens no network, and holds no secret. Given already-parsed Bridge JSON
// results (or nulls), it extracts ONLY a tiny, TYPED, CLOSED allowlist per
// field — canonical SCRIBE ids and documented enum values — and returns a
// readable string capped at MAX_CONTEXT_BYTES. It NEVER emits a full journal /
// Ledger, a transcript, an absolute path, a URL, or a token.
//
// CONFIDENTIALITY (ACCESS-PLUGIN-1A correction): there is NO generic "enum-ish
// token" acceptor. A value is admitted ONLY when the CALLER knows the field's
// type and asks for it explicitly, via one of:
//   - safeCanonicalId(value, prefixes) — a canonical SCRIBE id with an EXPLICIT,
//     field-scoped prefix (prj_/mis_/lot_/ctr_/exe_/rpt_/evd_) and a bounded,
//     lowercase-alphanumeric body. This structurally refuses secret-shaped
//     values (tok_/token_/secret_/api_/key_/bearer/authorization/password/
//     passwd/ghp_/github_pat_/sk-/AKIA, and JWT / long base64 / hex blobs),
//     because none of those carry an allowlisted SCRIBE id prefix and none are
//     lowercase-alnum within the length bound.
//   - safeEnum(value, allowlist) — membership in a CLOSED, documented set for
//     that specific field (status / next_action / gate). A syntactically clean
//     but unknown value is refused, never passed through.

// Hard cap on the injected continuity context (<= 2 KB, per the contract).
export const MAX_CONTEXT_BYTES = 2000;

// The maturity + Human-GO reminder every continuity block carries.
export const CONTINUITY_FOOTER =
  "Human GO remains separate. SCRIBE is not commercial-ready, not beta-ready, not marketplace-ready.";

// The CLOSED set of canonical SCRIBE id prefixes. Every id field passes ONLY the
// exact prefix it expects (a mission id must be mis_, a lot id lot_, and so on).
export const CANONICAL_ID_PREFIXES = Object.freeze([
  "prj_", "mis_", "lot_", "ctr_", "exe_", "rpt_", "evd_",
]);

// The id body after the prefix: lowercase alphanumeric only, bounded. Rejects
// uppercase-heavy secrets, hyphenated keys (sk-...), and long base64/hex blobs.
const ID_BODY = /^[0-9a-z]{1,40}$/;

// CLOSED, documented enum sets. A value outside its set is refused (omitted),
// never shown. These are intentionally conservative: an unrecognized-but-clean
// status is dropped rather than surfaced. Keep in sync with docs/SESSION_CONTINUITY.md.
export const MISSION_STATUSES = Object.freeze([
  "mission_draft", "mission_proposed", "mission_reviewed", "mission_active",
  "mission_resumed", "mission_blocked", "mission_closed", "mission_rejected",
]);
export const MISSION_NEXT_ACTIONS = Object.freeze([
  "none", "review_mission_draft", "propose_lots", "review_lots", "select_lot",
  "draft_contract", "review_contract", "resume_contract", "prepare_execution",
  "submit_evidence", "await_human_go",
]);
export const CONTRACT_STATUSES = Object.freeze([
  "contract_draft", "contract_reviewed", "contract_resumed",
  "contract_ready", "contract_blocked", "contract_closed",
]);
export const GATE_VALUES = Object.freeze([
  "awaiting_human_go", "human_go_required", "human_go_pending",
  "blocked", "open", "closed", "none",
]);

/**
 * Admit `value` ONLY if it is a canonical SCRIBE id whose prefix is one of the
 * EXPLICIT, field-scoped prefixes passed by the caller (which must themselves be
 * members of CANONICAL_ID_PREFIXES) and whose body is bounded lowercase
 * alphanumeric. Everything else — notably any secret-shaped value — returns null.
 * @param {unknown} value
 * @param {readonly string[]} prefixes
 * @returns {string|null}
 */
export function safeCanonicalId(value, prefixes) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length < 5 || v.length > 44) return null;
  const allowed = Array.isArray(prefixes) ? prefixes : [];
  for (const p of allowed) {
    if (!CANONICAL_ID_PREFIXES.includes(p)) continue; // only ever the closed prefixes
    if (v.startsWith(p) && ID_BODY.test(v.slice(p.length))) return v;
  }
  return null;
}

/**
 * Admit `value` ONLY if it is EXACTLY a member of the closed `allowlist` for
 * this field. No pattern, no normalization, no generic fallback.
 * @param {unknown} value
 * @param {readonly string[]|Set<string>} allowlist
 * @returns {string|null}
 */
export function safeEnum(value, allowlist) {
  if (typeof value !== "string") return null;
  const set = allowlist instanceof Set ? allowlist : new Set(allowlist || []);
  return set.has(value.trim()) ? value.trim() : null;
}

/**
 * Pick the first value that a typed validator admits, checking the object itself
 * and one known nested "snapshot". The validator carries the field's type.
 * @param {*} obj
 * @param {string[]} keys
 * @param {(v: unknown) => string|null} validate
 * @returns {string|null}
 */
function pickWith(obj, keys, validate) {
  if (!obj || typeof obj !== "object") return null;
  const sources = [obj];
  if (obj.snapshot && typeof obj.snapshot === "object") sources.push(obj.snapshot);
  for (const src of sources) {
    for (const k of keys) {
      const t = validate(src[k]);
      if (t) return t;
    }
  }
  return null;
}

/**
 * Extract the bounded continuity fields from the (already-parsed) Bridge JSON
 * results. EACH field uses its OWN closed allowlist — a canonical id prefix or a
 * documented enum set — with NO permissive generic fallback anywhere.
 * @param {{mission?: object|null, lots?: object|null, contract?: object|null}} [raw]
 */
export function extractContinuity({ mission = null, lots = null, contract = null } = {}) {
  const missionId = pickWith(mission, ["mission_id"], (v) => safeCanonicalId(v, ["mis_"]));
  const missionStatus = pickWith(mission, ["status", "backend_status"], (v) => safeEnum(v, MISSION_STATUSES));
  const missionNext = pickWith(mission, ["next_action"], (v) => safeEnum(v, MISSION_NEXT_ACTIONS));

  const asLot = (v) => safeCanonicalId(v, ["lot_"]);
  let lotId = pickWith(lots, ["selected_lot_id", "active_lot_id", "lot_id"], asLot);
  if (!lotId && lots && Array.isArray(lots.lots)) {
    const sel = lots.lots.find((l) => l && (l.selected === true || l.is_selected === true));
    lotId = sel ? asLot(sel.lot_id) : null;
  }
  if (!lotId && lots && lots.selection && typeof lots.selection === "object") {
    lotId = asLot(lots.selection.lot_id);
  }

  const contractId = pickWith(contract, ["contract_id"], (v) => safeCanonicalId(v, ["ctr_"]));
  const contractStatus = pickWith(contract, ["status", "contract_status"], (v) => safeEnum(v, CONTRACT_STATUSES));
  const gate =
    pickWith(contract, ["gate", "human_go", "gate_status"], (v) => safeEnum(v, GATE_VALUES)) ||
    pickWith(mission, ["gate", "gate_status"], (v) => safeEnum(v, GATE_VALUES));

  return { missionId, missionStatus, missionNext, lotId, contractId, contractStatus, gate };
}

/**
 * Truncate a string to MAX_CONTEXT_BYTES on a UTF-8 byte boundary, appending a
 * marker when it had to cut. Guarantees the returned string is <= the cap.
 * @param {unknown} text
 * @returns {string}
 */
export function boundContext(text) {
  const s = typeof text === "string" ? text : String(text ?? "");
  if (Buffer.byteLength(s, "utf8") <= MAX_CONTEXT_BYTES) return s;
  const marker = "\n...[continuity truncated]";
  const room = MAX_CONTEXT_BYTES - Buffer.byteLength(marker, "utf8");
  let out = Buffer.from(s, "utf8").slice(0, room).toString("utf8");
  // toString may leave a partial multibyte char; trim any lone replacement char.
  out = out.replace(/�+$/u, "");
  return out + marker;
}

/**
 * Build the bounded, human-readable continuity block the SessionStart hook
 * injects. It states only: Bridge reachability, workspace attach state, and —
 * when the backend is configured and a mission exists — the Mission, active lot,
 * contract/status, an optional Gate, and the next action, each already validated
 * against its own closed allowlist by extractContinuity().
 * @param {{
 *   bridgeAvailable?: boolean,
 *   bridgeReachable?: boolean,
 *   backendConfigured?: boolean,
 *   sessionActive?: boolean,
 *   workspaceAttached?: boolean,
 *   continuity?: ReturnType<typeof extractContinuity>,
 * }} [state]
 * @returns {string}
 */
export function buildContinuityContext(state = {}) {
  const {
    bridgeAvailable = false,
    bridgeReachable = false,
    backendConfigured = false,
    sessionActive = false,
    workspaceAttached = false,
    continuity = {},
  } = state;

  const lines = ["SCRIBE session continuity (bounded, local, read-only):"];

  if (!bridgeAvailable) {
    lines.push("Bridge: not configured — continuity unavailable this session (fail-open).");
    lines.push(CONTINUITY_FOOTER);
    return boundContext(lines.join("\n"));
  }
  if (!bridgeReachable) {
    lines.push("Bridge: configured but not reachable this session (fail-open).");
    lines.push(CONTINUITY_FOOTER);
    return boundContext(lines.join("\n"));
  }

  lines.push(`Bridge: reachable (local session "default" ${sessionActive ? "active" : "not initialized"}).`);
  lines.push(`Workspace: ${workspaceAttached ? "attached" : "none attached"}.`);

  const { missionId, missionStatus, missionNext, lotId, contractId, contractStatus, gate } =
    continuity || {};

  if (!backendConfigured) {
    lines.push("Mission: backend not configured — Mission/lot/contract not resumed (metadata-only surface).");
  } else if (missionId) {
    lines.push(`Mission: ${missionId}${missionStatus ? ` — status ${missionStatus}` : ""}.`);
    lines.push(`Active lot: ${lotId || "none selected"}.`);
    lines.push(
      contractId
        ? `Contract: ${contractId}${contractStatus ? ` — status ${contractStatus}` : ""}.`
        : "Contract: none."
    );
    if (gate) lines.push(`Gate: ${gate}.`);
    lines.push(`Next action: ${missionNext || "none reported"}.`);
  } else {
    lines.push("Mission: none active for this session.");
  }

  lines.push(CONTINUITY_FOOTER);
  return boundContext(lines.join("\n"));
}

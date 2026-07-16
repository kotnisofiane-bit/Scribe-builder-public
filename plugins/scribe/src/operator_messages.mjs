// operator_messages.mjs
//
// Operator-facing diagnostic table for every fail-closed path in this plugin.
// Each entry explains, in plain language: the probable cause, the one safe
// action to take, and what the plugin did NOT do when it failed closed. This
// module holds data plus two small pure formatters — it spawns nothing, reads
// nothing, writes nothing, and opens no network.

// What the plugin guarantees on EVERY fail-closed path.
export const NOT_DONE_LINE =
  "No backend was called. No dashboard was started. No repository was read " +
  "or attached. No Git action was performed. Nothing was written. " +
  "Human GO remains separate.";

// Maturity reminder appended where relevant.
export const STATUS_LINE =
  "SCRIBE remains not commercial-ready, not beta-ready, not marketplace-ready.";

/**
 * Diagnostic table. Keys match the adapter/smoke error codes plus two
 * operator-level situations (real smoke skipped, loading format unverified).
 */
export const OPERATOR_MESSAGES = Object.freeze({
  bridge_path_not_set: {
    cause: "No explicit Bridge path is set in the environment.",
    action:
      "Set SCRIBE_BRIDGE_ENTRY=/abs/path/to/scribe-bridge/src/index.js or " +
      "SCRIBE_BRIDGE_HOME=/abs/path/to/scribe-bridge, then retry.",
    withStatus: true,
  },
  bridge_entry_not_found: {
    cause: "The explicit Bridge path does not point to an existing file.",
    action:
      "Check the value of SCRIBE_BRIDGE_ENTRY / SCRIBE_BRIDGE_HOME and make " +
      "sure it points to a local scribe-bridge checkout (src/index.js must exist).",
    withStatus: true,
  },
  invalid_json: {
    cause: "The Bridge output was not valid JSON, so the plugin failed closed.",
    action:
      "Verify the Bridge checkout is intact and at the expected commit, then " +
      "run the Bridge command directly to inspect its output.",
    withStatus: false,
  },
  invalid_json_shape: {
    cause:
      "The Bridge output parsed as JSON but was not a plain object, so the " +
      "plugin failed closed.",
    action:
      "Verify the Bridge checkout is intact and at the expected commit; the " +
      "read-only commands must print a single JSON object.",
    withStatus: false,
  },
  timeout: {
    cause: "The Bridge did not respond within the timeout, so the plugin failed closed.",
    action:
      "Check that the path points at the real Bridge entry (src/index.js) and " +
      "not at a long-running process, then retry.",
    withStatus: false,
  },
  output_too_large: {
    cause: "The Bridge output exceeded the size cap, so the plugin failed closed.",
    action:
      "Verify the path points at the real Bridge; its informational commands " +
      "print small outputs. Inspect the target file if this repeats.",
    withStatus: false,
  },
  self_check_failed: {
    cause: "The Bridge ran, but its own structural self-check reported a failure.",
    action:
      "Do not proceed. Re-check the Bridge checkout (clean tree at the " +
      "expected commit) and re-run its own test suite before retrying.",
    withStatus: true,
  },
  command_not_allowlisted: {
    cause: "A command outside the four read-only Bridge commands was requested.",
    action:
      "Use only: --version, --status, --capabilities, --self-check. The " +
      "wrapper forwards nothing else by design.",
    withStatus: false,
  },
  real_smoke_skipped: {
    cause:
      "The real smoke was requested, but no explicit Bridge path is set, so " +
      "it failed closed without doing anything.",
    action:
      "Export SCRIBE_BRIDGE_ENTRY or SCRIBE_BRIDGE_HOME and re-run " +
      "smoke:real, or use smoke:fake which is fully offline.",
    withStatus: true,
  },
  loading_format_unverified: {
    cause:
      "The exact Claude Code private-plugin loading format has not been " +
      "verified in this environment (PRIVATE INSTALL DRAFT).",
    action:
      "Verify the loading format yourself before loading the plugin; until " +
      "then treat this as private local verification, never as a release.",
    withStatus: true,
  },
  empty_output: {
    cause: "The Bridge returned no output for a command that should print one line.",
    action:
      "Run the Bridge command directly to inspect it; verify the checkout is " +
      "intact and at the expected commit.",
    withStatus: false,
  },
  spawn_failed: {
    cause: "The local node process for the Bridge could not be started.",
    action:
      "Check that Node.js >= 18 is installed and the Bridge path is readable, " +
      "then retry.",
    withStatus: false,
  },
});

/**
 * Look up a diagnostic entry by error code. Unknown codes get a safe generic
 * entry (still fail-closed, still explains what was not done).
 * @param {string} code
 */
export function operatorMessage(code) {
  const key = String(code || "").trim();
  const entry = OPERATOR_MESSAGES[key];
  if (entry) return entry;
  return {
    cause: `The plugin failed closed (${key || "unknown error"}).`,
    action: "Re-run npm run verify:local and read docs/TROUBLESHOOTING.md.",
    withStatus: true,
  };
}

/**
 * Render one operator hint as a single readable paragraph:
 * cause + safe action + what was NOT done (+ maturity status when relevant).
 * @param {string} code
 * @returns {string}
 */
export function formatOperatorHint(code) {
  const m = operatorMessage(code);
  const parts = [m.cause, m.action, NOT_DONE_LINE];
  if (m.withStatus) parts.push(STATUS_LINE);
  return parts.join(" ");
}

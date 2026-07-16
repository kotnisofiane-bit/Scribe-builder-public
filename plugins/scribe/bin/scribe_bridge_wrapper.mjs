#!/usr/bin/env node
// scribe_bridge_wrapper.mjs
//
// Thin, READ-ONLY wrapper. It forwards exactly ONE allowlisted, read-only
// Bridge command through the strict adapter, then prints the result: strictly
// parsed and re-serialized JSON for --status/--capabilities/--self-check, or a
// single text line for --version. Anything else fails closed before any launch.
//
// All process spawning, timeout, output bounding, minimal-env, and strict JSON
// parsing live in src/bridge_adapter.mjs. This file only does argument
// validation and printing.

import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALLOWED_COMMANDS,
  JSON_COMMANDS,
  isAllowedCommand,
  resolveBridgeEntry,
  runBridgeCommand,
} from "../src/bridge_adapter.mjs";
import { formatOperatorHint } from "../src/operator_messages.mjs";

// Re-export for tooling/tests that import from the wrapper.
export { ALLOWED_COMMANDS, JSON_COMMANDS, isAllowedCommand, resolveBridgeEntry };

/** @param {string} message @param {number} [code] */
function fail(message, code = 2) {
  process.stderr.write(`scribe-bridge-wrapper: ${message}\n`);
  return code;
}

/**
 * @param {string[]} [argv]
 * @param {Record<string, string|undefined>} [env]
 * @returns {number} process exit code
 */
export function main(argv = process.argv.slice(2), env = process.env) {
  if (argv.length !== 1) {
    return fail(
      `exactly one command is required. Allowed (read-only): ${ALLOWED_COMMANDS.join(", ")}`
    );
  }
  const command = argv[0];
  if (!isAllowedCommand(command)) {
    return fail(
      `command "${command}" is not permitted. ` +
        formatOperatorHint("command_not_allowlisted")
    );
  }

  const res = runBridgeCommand(command, { env });
  if (!res.ok) {
    return fail(`Bridge command failed (${res.error}). ${formatOperatorHint(res.error)}`);
  }

  if (JSON_COMMANDS.includes(command)) {
    process.stdout.write(JSON.stringify(res.json, null, 2) + "\n");
  } else {
    process.stdout.write(res.text + "\n");
  }
  return res.exitCode;
}

// Only run when executed directly (not when imported by tests).
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const selfPath = fileURLToPath(import.meta.url);
if (invokedPath && invokedPath === selfPath) {
  process.exitCode = main();
}

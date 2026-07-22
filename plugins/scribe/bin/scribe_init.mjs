#!/usr/bin/env node
// scribe_init.mjs
//
// Canonical MACRO-PLUGIN-1 entry: a READ-ONLY dry local init. It probes the
// locally-installed Bridge with the four read-only commands through the strict
// adapter and prints a summary plus the mandatory notices. It attaches no
// repository, reads no user files, starts no backend or dashboard, and performs
// no Git action.

import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bridgeInit, formatInitReport } from "../src/bridge_adapter.mjs";

/**
 * @param {Record<string, string|undefined>} [env]
 * @returns {number} process exit code
 */
export function main(env = process.env) {
  const summary = bridgeInit({ env });
  process.stdout.write(formatInitReport(summary) + "\n");
  const ok =
    summary.bridge_found &&
    summary.self_check === "ok" &&
    summary.errors.length === 0;
  return ok ? 0 : 1;
}

// Only run when executed directly (not when imported by tests).
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const selfPath = fileURLToPath(import.meta.url);
if (invokedPath && invokedPath === selfPath) {
  process.exitCode = main();
}

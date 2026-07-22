// personal_paths.mjs
//
// Pure, read-only helpers for the personal local install target. It computes
// where a personal copy of the plugin would live under the user's Claude Code
// directory, and validates that a target path is exactly
// `<home>/.claude/skills/scribe-bridge` before any write or delete. It reads no
// filesystem, writes nothing, spawns nothing, and opens no network.

import path from "node:path";

export const PERSONAL_SKILL_NAME = "scribe-bridge";

/**
 * Resolve the personal install paths for a given platform / environment.
 * On win32 the base is %USERPROFILE%; elsewhere it is the home directory.
 * Path separators match the target platform (path.win32 vs path.posix), so the
 * computation is correct regardless of the OS running this code.
 * @param {{platform?: string, env?: Record<string,string|undefined>, homedir?: string}} [opts]
 */
export function resolvePersonalPaths(opts = {}) {
  const platform = opts.platform ?? process.platform;
  const env = opts.env ?? process.env;
  const P = platform === "win32" ? path.win32 : path.posix;
  const base = platform === "win32" ? (env.USERPROFILE || "") : (opts.homedir || env.HOME || "");
  const dotClaude = base ? P.join(base, ".claude") : "";
  const skillsRoot = base ? P.join(dotClaude, "skills") : "";
  const target = base ? P.join(skillsRoot, PERSONAL_SKILL_NAME) : "";
  return { platform, base, dotClaude, skillsRoot, target };
}

/**
 * A target is safe to create/remove ONLY if it is exactly
 * `<something>/.claude/skills/scribe-bridge`. This refuses the home directory,
 * `.claude`, the `skills` root, filesystem roots, and empty paths.
 * @param {string} target
 * @param {string} [platform]
 * @returns {{safe: boolean, reason?: string}}
 */
export function isSafeTarget(target, platform = process.platform) {
  const P = platform === "win32" ? path.win32 : path.posix;
  if (typeof target !== "string" || target.trim() === "") {
    return { safe: false, reason: "empty target path" };
  }
  const norm = target.replace(/[\\/]+$/, "");
  if (norm === "" || norm === "/" || /^[A-Za-z]:[\\/]?$/.test(norm)) {
    return { safe: false, reason: "target resolves to a filesystem root" };
  }
  if (P.basename(norm) !== PERSONAL_SKILL_NAME) {
    return { safe: false, reason: `target basename must be "${PERSONAL_SKILL_NAME}"` };
  }
  const parent = P.dirname(norm);
  if (P.basename(parent) !== "skills") {
    return { safe: false, reason: "target parent directory must be \"skills\"" };
  }
  if (P.basename(P.dirname(parent)) !== ".claude") {
    return { safe: false, reason: "target grandparent directory must be \".claude\"" };
  }
  return { safe: true };
}

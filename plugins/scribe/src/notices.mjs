// notices.mjs
//
// Inert data module. It holds ONLY fixed, human-readable string constants that
// the plugin prints — pure data, nothing runnable.

// Maturity banner — the three "not ready" statements, always printed.
export const MATURITY_BANNER = Object.freeze([
  "SCRIBE is not commercial-ready.",
  "SCRIBE is not beta-ready.",
  "SCRIBE is not marketplace-ready.",
]);

// Mandatory notices — these exact lines must appear in the init output.
export const MANDATORY_NOTICES = Object.freeze([
  "SCRIBE is not commercial-ready.",
  "SCRIBE is not beta-ready.",
  "No backend is connected.",
  "No dashboard is started.",
  "No repository has been attached.",
  "No files were read from the user repository.",
  "No Git action was performed.",
  "Human GO remains separate.",
]);

// The single safe next step suggested to the user after a dry init.
export const NEXT_SAFE_ACTION =
  "Review the capability manifest and boundaries. No further action is " +
  "required; Human GO remains a separate, manual, out-of-band step.";

# Security Policy

DUBSAR is preparing a controlled private beta.

```text
not commercial-ready
not beta-ready
not marketplace-ready
```

## Supported versions

No public release is currently supported.

The repository contains public documentation and Marketplace staging material, including an earlier vendored Claude Code plugin pin. The DUBSAR Marketplace is not activated or announced, the final publication pin is not selected and there is no supported public installation.

Private beta testers receive version-specific package and support instructions through the controlled beta channel.

## Reporting a vulnerability

Do not publish suspected vulnerabilities, secrets, access keys, private service URLs, tester data or exploit details in a public GitHub issue.

Report suspected vulnerabilities privately by email to **security@dubsar.ai**. Private beta testers may also use the private support channel supplied with their invitation.

The security contact must be confirmed as live and monitored before Marketplace activation.

## Scope

Useful reports may concern:

- the public Claude Code host-adapter package;
- DUBSAR Desktop, Bridge or local runtime behavior;
- unintended secret or data exposure;
- unsafe command, worktree or process behavior;
- authentication or authorization boundaries;
- canonical session or stale-write integrity;
- Human Gate or single-use authorization bypass;
- package provenance, integrity, update, rollback or uninstall paths;
- ways an agent could falsely appear human-approved or verified;
- separation failures between sessions, worktrees or evidence;
- restart or reconciliation behavior that leaves phantom process state.

The private Backend and Core are not published in this repository. Do not attempt to access systems, accounts or data for which you do not have explicit authorization.

## Coding-agent hosts

Claude Code is the first supported integration under preparation.

Future Codex, Cursor or other adapters will require separate security review for their host-specific permissions, session identity, tool boundaries, process model and data flow before support is claimed.

## Platform posture

Windows is the first controlled private-beta target.

Linux validation is planned later. macOS support is not announced.

A platform is not considered supported because code compiles or CI passes. Package integrity, installation, permissions, secure storage, process identity, update and removal must be validated on the real target platform.

## Response posture

During private beta preparation, DUBSAR may change quickly. Valid security reports will be triaged according to impact and reproducibility.

No response-time guarantee is currently offered.

## Never include

- real access, activation or licence keys;
- API tokens, bearer tokens or SSH keys;
- private customer or tester data;
- confidential repository content;
- full sensitive logs;
- private prompts or chain-of-thought;
- private service URLs not intended for publication;
- instructions requiring unauthorized access.

## Current status

```text
public security contact: security@dubsar.ai — monitoring to be confirmed
Windows controlled private beta: in preparation
Marketplace: not activated or announced
supported public release: none
not commercial-ready
not beta-ready
not marketplace-ready
```

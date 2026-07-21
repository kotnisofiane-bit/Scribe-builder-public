# DUBSAR Public Review Checklist

This checklist is for the human review of the public-realignment pull request before any merge, repository rename or Marketplace activation.

---

## 1. Product identity

- [ ] DUBSAR is the only current public product brand.
- [ ] Scribe Builder is not presented as a parent product or company.
- [ ] Scribe Launcher is not presented as a current product.
- [ ] Eyes of SCRIBE is not presented as a separate product.
- [ ] Historical names appear only in explicit legacy context or compatibility notes.

---

## 2. Product definition

- [ ] DUBSAR is described as governance for long-running, multi-session AI coding projects.
- [ ] Claude Code is clearly the first supported integration.
- [ ] DUBSAR is not described as permanently Claude-only.
- [ ] Codex, Cursor and other adapters are described as future direction, not current availability.
- [ ] The private Core is described as host-independent.

---

## 3. Architecture accuracy

- [ ] Host adapter, Bridge, Desktop/runtime, Backend, Core, Runner and cockpit responsibilities are distinct.
- [ ] Backend is the protected canonical write boundary.
- [ ] Core owns Mission, decisions, contracts, sessions, evidence and Human Gates.
- [ ] Desktop and cockpit are not presented as canonical truth owners.
- [ ] Agent declarations are not described as verified evidence.
- [ ] Human Gates remain authenticated human decisions.

---

## 4. Technical proof claims

- [ ] One-session and two-session results are described as internal Windows technical proofs.
- [ ] No internal proof is presented as an external user beta proof.
- [ ] Multi-session claims mention distinct identities, processes, worktrees and evidence.
- [ ] Conflict handling is described without claiming impossible correctness guarantees.
- [ ] Restart and reconciliation claims stay within demonstrated behavior.

---

## 5. Platform claims

- [ ] Windows is described as the first controlled private-beta target in preparation.
- [ ] Linux is not described as available before real validation.
- [ ] macOS is not announced before feasibility, signing and runtime validation.
- [ ] No platform support is inferred from compilation or CI alone.

---

## 6. Marketplace and installation

- [ ] Marketplace is not described as activated, published or announced.
- [ ] No supported public installation command is active.
- [ ] The existing vendored `0.11.1` runtime is described as an earlier staging pin.
- [ ] The final publication pin remains pending Windows stabilization.
- [ ] No vendored runtime file was manually changed to imitate a newer private plugin.
- [ ] Final re-vendoring, hashes and strict validation remain explicit publication gates.

---

## 7. Public/private boundary

- [ ] No private Core source is published.
- [ ] No private Backend source is published.
- [ ] No secrets, tokens or private service credentials are present.
- [ ] No private prompts, policies, journals or tester data are present.
- [ ] Privacy and Security documents describe engineering boundaries honestly.

---

## 8. Visual identity

- [ ] Root README uses current DUBSAR diagrams.
- [ ] Current visuals use graphite/night blue, turquoise and restrained gold.
- [ ] No current visual contains SCRIBE branding.
- [ ] Legacy diagrams are clearly classified and not embedded as current architecture.
- [ ] The social-preview source uses DUBSAR.
- [ ] No mock screenshot is presented as a shipped product capture.

---

## 9. Legacy material

- [ ] `LEGACY.md` clearly defines interpretation rules.
- [ ] RFCs are classified as legacy and non-normative.
- [ ] Current root documentation wins over historical material.
- [ ] Compatibility-sensitive `scribe` identifiers are not renamed casually.

---

## 10. Repository operations

- [ ] PR remains draft during review.
- [ ] No merge occurs without explicit Human GO.
- [ ] Repository rename is handled as a separate Human Gate.
- [ ] Marketplace activation and announcement require a later separate Human GO.
- [ ] Security and licensing contacts are confirmed live before publication.

---

## Current expected verdict

```text
public documentation realignment: reviewable
Windows product journey: still in preparation
final plugin publication pin: pending
Marketplace activation: blocked
repository rename: not performed
not commercial-ready
not beta-ready
not marketplace-ready
```

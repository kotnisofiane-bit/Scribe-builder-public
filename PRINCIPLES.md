# Principles

DUBSAR is guided by product and governance constraints, not by claims of AI autonomy.

---

## 1. Humans remain the final authority

AI roles may plan, code, summarize or audit. Protected decisions remain human.

A system that hides responsibility does not create governance.

---

## 2. Agents do not self-validate

A coding agent's report is not independent proof of its own work.

Role separation, deterministic evidence and human decision remain distinct. No agent creates a Human GO.

---

## 3. Preserve decisions, not only conversations

Long-running projects need durable memory of:

- what was decided;
- why it was decided;
- which constraints apply;
- what evidence supported the decision;
- what replaced it later;
- how the path can be replayed.

---

## 4. Governance belongs inside the workflow

Governance should be available before protected execution, during review, when evidence is assessed and before human approval.

It should not be an unexplained final label applied after the work.

---

## 5. Contracts make work governable

A governed lot should make its objective, scope, allowed and forbidden actions, expected evidence, session expectations and Human Gate conditions explicit.

A contract does not guarantee correctness. It makes divergence visible.

---

## 6. Declarations are not verification

DUBSAR distinguishes what an agent or tool claims from what an identified deterministic verifier has checked.

Missing or invalid evidence must remain visible. Confidence and fluent explanation do not become proof.

---

## 7. Replay preserves continuity

The meaningful path should remain reconstructable:

```text
Mission → Decision → Contract → Session → Proposal → Audit → Evidence → Human Gate → Result
```

Replay does not require storing every token of every conversation.

---

## 8. Fail closed at protected boundaries

When required scope, evidence, identity or approval is missing, protected movement should stop rather than continue silently.

Fail-closed behavior must be targeted. DUBSAR should not interrupt harmless reads merely to look strict.

---

## 9. Reuse the host instead of rebuilding it

Coding-agent hosts already provide intelligence, tools, editing, tests and execution environments.

DUBSAR adds governed project state. It should not duplicate a host's native capabilities or move proprietary Core logic into a host adapter.

Claude Code is the first supported integration, not the permanent boundary of the product.

---

## 10. Public surfaces stay thin and honest

The public repository may distribute thin host adapters and explain the product.

The private Core, private Backend, internal policies, confidential proofs, secrets and tester data remain private.

Every public capability claim must distinguish what exists, what is in private-beta preparation and what is only future direction.

---

## 11. Compatibility before nominal purity

The public brand is DUBSAR.

Internal `scribe` repository, route, command, MCP, token or storage identifiers may remain temporarily where immediate renaming would break compatibility. Migration should be deliberate and testable.

---

## 12. One Core, multiple host adapters

Future integrations should reuse the same Mission, decisions, contracts, evidence and Human Gates.

DUBSAR should not create a different governance brain for Claude Code, Codex, Cursor or each future coding-agent environment.

---

## 13. Each iteration must produce user-visible progress

Tests and safety boundaries are necessary, but a macro-lot should also complete a user sentence such as:

> In a supported coding-agent host, the user can now start, resume, understand or review a governed DUBSAR project.

DUBSAR exists to make AI-assisted projects more coherent, not to accumulate internal proofs with no visible product result.

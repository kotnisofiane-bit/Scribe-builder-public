# Principles

SCRIBE Builder is guided by a small set of principles.

They are not implementation details.

They are constraints for how the project should evolve.

---

## 1. Human judgment remains essential

SCRIBE does not assume that AI systems should replace human responsibility.

AI roles may propose, analyze, summarize or audit.

But critical decisions remain human.

A system that removes responsibility does not create governance.

It only hides it.

---

## 2. Agents do not self-validate

An AI role should not be the final validator of its own work.

A coder may propose a change.

An auditor may review it.

SCRIBE may check the process.

But no agent becomes an independent authority.

Validation requires separation of roles, evidence and human decision.

---

## 3. Decision memory is a first-class component

A project should remember decisions, not only conversations.

Decision memory preserves:

- what was decided;
- why it was decided;
- what evidence supported the decision;
- what constraints existed;
- what can be replayed later.

Without decision memory, long-running projects drift.

---

## 4. Governance belongs inside the workflow

Governance should not be an afterthought.

It should not exist only as a final review.

SCRIBE explores governance as part of the workflow itself:

- before execution;
- during proposal review;
- before human approval;
- after proof is produced.

Governance should be close to the action without becoming invisible.

---

## 5. Contracts define execution

Before a change is executed, its boundaries should be explicit.

An execution contract defines:

- the objective;
- the scope;
- the allowed actions;
- the forbidden actions;
- the evidence required;
- the human decision point.

A contract does not guarantee correctness.

It makes the work governable.

---

## 6. Evidence matters more than explanations

AI systems can explain convincingly.

That is not enough.

A governed system needs evidence:

- what changed;
- what was checked;
- what passed;
- what failed;
- what was approved;
- what can be verified later.

Explanations are useful.

Evidence is durable.

---

## 7. Replay should always be possible

A project should be able to reconstruct the path of an important decision.

Replay does not mean preserving every word of every conversation.

It means preserving the meaningful sequence:

intent, contract, proposal, audit, evidence, decision and result.

If a decision cannot be replayed, it is difficult to govern.

---

## 8. Systems should fail closed

When uncertainty appears, the system should not silently continue.

If scope is unclear, stop.

If evidence is missing, stop.

If approval is required, stop.

If boundaries are violated, stop.

Failing closed protects the project from invisible drift.

---

## 9. Simplicity enables trust

A governance system that is too complex becomes difficult to trust.

SCRIBE should prefer clear structures over impressive mechanisms.

The system should be understandable.

A human should be able to know:

- what is being proposed;
- why it matters;
- what evidence exists;
- what decision is required.

---

## 10. Governance is continuous

Governance is not a single checkpoint.

It is a continuous property of the workflow.

Each iteration should preserve more clarity than it consumes.

Each decision should make the project easier to understand later.

SCRIBE does not attempt to replace human responsibility.

It attempts to make it easier to exercise.

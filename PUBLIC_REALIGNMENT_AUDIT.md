# Public Realignment Audit

## Scope

This audit reviews the existing public SCRIBE / Scribe Builder doctrine against the actual DUBSAR private-beta product direction.

The review covers public positioning, architecture, product surfaces, status, roadmap, FAQ and core doctrine. It does not audit the private Core implementation.

---

## Executive verdict

The original doctrine contained a strong and still-useful foundation:

- decision memory is different from conversation history;
- agents should not self-validate;
- evidence matters more than persuasive explanation;
- protected movement requires explicit human authority;
- replay and fail-closed boundaries matter;
- the proprietary Core should remain private.

The main public defect was not the philosophy. It was the product story.

The repository still described:

- Scribe Builder as a parent brand;
- Scribe Launcher as the first product surface;
- plugins and MCP as hypothetical future delivery forms;
- the public repository as documentation only;
- no concrete installable product direction.

That story no longer matched the implementation trajectory.

---

## Current product truth

The real first product is:

```text
DUBSAR
  = Claude Code plugin
  + DUBSAR Desktop / local runtime
  + private service boundary
  + private Core
  + local human-facing cockpit
```

The user experiences one product called DUBSAR.

The plugin is the entry point. Desktop supports the local runtime. The private Core owns canonical Mission and governance state.

---

## Classification of legacy statements

### Preserved as core doctrine

- Humans remain the final authority.
- Agents do not self-validate.
- Decision memory is first-class project infrastructure.
- Contracts make scope and expected evidence explicit.
- Evidence and declarations must remain distinct.
- Replay should reconstruct the meaningful decision path.
- Protected boundaries should fail closed.
- The private Core is not distributed publicly.

### Correct but requiring product-specific wording

- “Existing AI coding workflows” became Claude Code first.
- “Connector surface” became the DUBSAR Claude Code plugin.
- “Observation surface” became the DUBSAR cockpit.
- “Private decision core” became the private DUBSAR Core with clearer authority boundaries.
- General collaboration language became a concrete Mission and beta workflow.

### Obsolete public positioning

- Scribe Builder as the public parent brand.
- Scribe Launcher as a public product.
- Plugin and MCP described only as possible future forms.
- Public repository described as documentation-only.
- Assertions that no distributable plugin package is planned in this repository.
- A general multi-agent product implied by Architect/Coder/Auditor language.

### Preserved only for compatibility or history

- the current `Scribe-builder-public` GitHub repository URL;
- internal repository names;
- `/scribe-*` commands;
- `scribe-mcp` and other internal component names;
- historical Git commits, PRs, RFCs, examples and diagrams.

These identifiers are not the public brand and should be migrated only through tested compatibility plans.

### Future, not current beta claims

- operational Codex and Cursor adapters;
- broad multi-session orchestration;
- enterprise deployment;
- certified compliance or security guarantees;
- commercial availability.

---

## Marketplace decision

The existing public repository will become the single public home for:

1. DUBSAR documentation and doctrine;
2. the Claude Code Marketplace package.

The separate future Marketplace repository previously planned under the legacy name will not be created.

The private `public-marketplace/` staging work remains valuable as source material, but must be realigned and vendored into this repository from the final reviewed DUBSAR plugin commit.

---

## Publication blockers

The plugin runtime is intentionally not copied into this public branch yet because the coordinated plugin rebrand and package metadata are still being implemented.

Before publication:

- final DUBSAR plugin metadata must be reviewed;
- the vendored package must be assembled from a pinned commit;
- integrity hashes must be regenerated;
- strict Claude plugin validation must pass;
- clean install/uninstall must be tested;
- the licence must receive explicit human approval;
- a real security contact must replace the pending state;
- installation and privacy documentation must match the final implementation;
- a separate Human GO to publish is required.

---

## Files realigned in this branch

- `README.md`
- `PRODUCT_SURFACES.md`
- `ARCHITECTURE.md`
- `STATUS.md`
- `ROADMAP.md`
- `FAQ.md`
- `WHY_SCRIBE.md` — path retained, content retitled Why DUBSAR
- `PRINCIPLES.md`
- `MANIFESTO.md`
- `DECISION_MEMORY.md`
- `DESIGN_PHILOSOPHY.md`
- `WHY_NOT_JUST_AGENTS.md`

New public boundary files:

- `MARKETPLACE.md`
- `INSTALLATION.md`
- `SECURITY.md`
- `PRIVACY.md`
- `CHANGELOG.md`
- `PUBLIC_REALIGNMENT_AUDIT.md`

---

## Remaining work after this PR

- audit and migrate or retire legacy diagrams, RFC titles and examples;
- integrate the final DUBSAR Marketplace package into this repository;
- validate package integrity and installation;
- approve the licence and security contact;
- decide the final GitHub repository rename;
- update repository description and website link;
- merge only after a separate human review and GO.

---

## Canonical status

```text
DUBSAR PUBLIC REPOSITORY REALIGNMENT — REVIEW BRANCH
MARKETPLACE STAGED, NOT PUBLISHED
PLUGIN RUNTIME VENDORED (pinned scribe-claude-code-plugin@c2878313; see INTEGRITY.md)
REPOSITORY NOT RENAMED
NO PRIVATE CORE PUBLISHED
not commercial-ready
```

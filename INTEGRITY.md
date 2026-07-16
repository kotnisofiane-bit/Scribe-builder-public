# INTEGRITY — DUBSAR public plugin runtime (vendored)

**Regenerated from scratch. Do not reuse older hashes.**

The `plugins/scribe/` runtime in this public repository is a faithful, bounded,
clean-room copy of the private plugin at a single pinned commit. This file lets an
auditor reproduce and verify it byte-for-byte.

## Provenance

| Field | Value |
| --- | --- |
| Source repository (private) | `kotnisofiane-bit/scribe-claude-code-plugin` |
| Source commit (full, pinned) | `c2878313198aceccac078bf9446c5ab45751e424` |
| Plugin package | `scribe-bridge` (technical id — see naming note) |
| Plugin version | `0.11.1` (plugin.json == package.json == marketplace.json) |
| Vendored files (exact count) | 49 |
| Generated (UTC) | 2026-07-16 |
| Vendored-tree aggregate SHA-256 | `9a037a17d6a4ce7f07fcb79522fa81cd66d692ddce05e1f61d5d655de8548f06` |

**Naming:** DUBSAR is the product name. Some internal technical identifiers still
use `scribe` (package `scribe-bridge`, dir `plugins/scribe`, `/scribe-*`
commands, `scribe.*` MCP tools, `SCRIBE_*` env vars) for beta compatibility.
These are NOT yet migrated; renaming them would break local installs and wiring.

## Allowlist (what was vendored)

Only these paths were taken from the pinned commit:

- `bin/`
- `src/`
- `commands/`
- `hooks/`
- `.claude-plugin/plugin.json`
- `.mcp.json`
- `package.json`
- `LICENSE` — see the note below

The 48 runtime files (everything except `LICENSE`) are **byte-identical** to the
pinned plugin's allowlisted files. `plugins/scribe/LICENSE` (and the repo-root
`LICENSE`) is intentionally the explicit **DUBSAR / SCRIBE private-beta
evaluation licence (DRAFT, not yet in force)** — NOT the private repository's
"all rights reserved / not for distribution" notice, because a public
distribution repository needs an explicit distribution grant. That licence is the
one licensing decision a human must ratify before publication.

## Exclusions (formally NOT vendored)

`tests/`, private `docs/`, internal `scripts/`, `.git/`, private `.github/`,
logs, local build artefacts, `.env`/secrets, development history, private prompts,
any Backend/Core code, and any Polar key or credential. None of these appear under
`plugins/scribe/`.

## Reproduce and verify (clean-room)

```sh
# 1) get the pinned source and reassemble the intended public runtime
git clone https://github.com/kotnisofiane-bit/scribe-claude-code-plugin
cd scribe-claude-code-plugin
git archive c2878313198aceccac078bf9446c5ab45751e424 public-marketplace/plugins/scribe \
  | tar -x -C /tmp/dubsar-verify
# (equivalently, the 48 runtime files are: git archive <pin> bin src commands hooks \
#  .claude-plugin/plugin.json .mcp.json package.json)

# 2) compare against this repository's plugins/scribe/ tree
diff -r /tmp/dubsar-verify/public-marketplace/plugins/scribe \
        <path-to-this-repo>/plugins/scribe   # expect: no differences

# 3) recompute per-file SHA-256 and compare to the table below
cd <path-to-this-repo> && find plugins/scribe -type f | sort \
  | while read f; do sha256sum "$f"; done
```

## Per-file SHA-256 (49 files)

```
d47eb5084971927150402e1e29d551ecd748581b62ba31af75666ce86b587917  plugins/scribe/.claude-plugin/plugin.json
d9449be03caa362853c71c4cc652c1191090d50fcf703c834ba1678d3eaa9e8c  plugins/scribe/.mcp.json
be38cc4062775d3179720cfc915c03d0e8be22760bf41bc94ae54f5080755daa  plugins/scribe/LICENSE
0db9fe83e266721fd7d35a8e7274474e8a11179c066ef5f4e1393f2f9c1ebe1b  plugins/scribe/bin/scribe_bridge_wrapper.mjs
d5a0566e40f1af683e7f736bf3d075e4c13787df600035e0b064a3c03ae672e4  plugins/scribe/bin/scribe_init.mjs
2ef8d5b3f5fd3ee8603f0990f044948cf865ea7ab609e15fc230f201747160d6  plugins/scribe/bin/scribe_mcp.mjs
a8247155bf3587354cac112903b28ad6f11b2a39f7fb79186ee8706e34cc4c8d  plugins/scribe/commands/scribe-access-status.md
a61c9f6dc0b61c542eb3d9e73fd9382120cec3422ddc3a4269aad08cdf2f82e1  plugins/scribe/commands/scribe-activate.md
8d7de40e725c4e0ca1ccb3458cffe37c91ba2b7754b9d8b22416f5b44c3f28f1  plugins/scribe/commands/scribe-backend-probe.md
66eb0cf5e3852dc392dc0f4dfce93dc982e266c2a6f2ac0c061b875113e15389  plugins/scribe/commands/scribe-capabilities.md
92d728a20d0e8632a1777dfc146fd7559a116c8548b5f99fce50b0659eed7230  plugins/scribe/commands/scribe-contract-draft.md
0982187dc18c64cf8c1d25635f297a09dfbc572ad822aa0dc62641777c646b23  plugins/scribe/commands/scribe-contract-resume.md
13700620022e1c2f37697dddb71ed826cadf45d78bed48b1a0bf5b8a03ed4513  plugins/scribe/commands/scribe-contract-status.md
ef4a7504a150d346df083929b3a5d5790c01d121998f9c0668ee9f66f1254d26  plugins/scribe/commands/scribe-digest.md
f51f6acf165e40ec50aecefb90618da4d4c9ded2654340d58110cff572b768d5  plugins/scribe/commands/scribe-doctor.md
c31835a54117f53c8b6e55d6f82fad2255ec197a6f41efd09e8c7c725a635453  plugins/scribe/commands/scribe-evidence-resume.md
d83743ff7c4d3f11feed41e2f093bd2076cbcb3c4e43e5f8983ae40e92cf0518  plugins/scribe/commands/scribe-evidence-status.md
2db0606732253d4e7cfed17a5a67ed193383c71b595812e8ca944834099338f4  plugins/scribe/commands/scribe-evidence-submit.md
7609401af9b08dbf19c810123e223061a91292667f28530908fe4a57a8500b12  plugins/scribe/commands/scribe-execution-prepare.md
e1f7bf49bb3fb9cd6ac7f24f3d7e876e85d3e8449a191cc2e5f51cb4e455f280  plugins/scribe/commands/scribe-execution-report.md
4c14070faed37bdfde6266144a586b4c4355b2958e7f2dce1f0e3ccae18e6698  plugins/scribe/commands/scribe-execution-resume.md
abd51b966a843b5548a075acf55795d381be543d1c2000af471d933a113110de  plugins/scribe/commands/scribe-execution-status.md
f172e4e6d81e30cc6fbd8904114a918ad2918bce20bed6b583ca7359d017bed1  plugins/scribe/commands/scribe-init.md
7e682b4032971e87bf28a3cbb22ecbbe5af2156a9dc5b6ae52b7dbe9ebe558aa  plugins/scribe/commands/scribe-lot-select.md
a31c57d83169ae229238fee2b90c26911d106dd7c1e87847a39f5e746caf7f8d  plugins/scribe/commands/scribe-lots-propose.md
b4cd5603e25830b84369b51df38c695fe251f248504b98eda148636457d74b8c  plugins/scribe/commands/scribe-lots-status.md
7d7b606e5ccad9250370453d6f06b413ea0c3d0e1645838bf6cfa61917ce0d6c  plugins/scribe/commands/scribe-mission-draft.md
a9453126e4ba1378bbdaf983ba9aafe2f653e72d2ec798845d274a465c26a2c4  plugins/scribe/commands/scribe-mission-resume.md
500593e1b67334487e78ef4b3895de830460ba98fab2dcc88f3d8ee4c24cfd3f  plugins/scribe/commands/scribe-mission-status.md
848614048d4b6ff405dd7cb22b48838f2e239c696573a5395b5646adc6cb03d2  plugins/scribe/commands/scribe-record.md
8e9d0b2deae19f2708a62decae626815ca3d9cf79ff8f3544dbfc8fbc5cad662  plugins/scribe/commands/scribe-replay.md
9596fc7a11e22c8218ba1fa5e6ff1ff3c1a9dc97e453a786c0814ff74b122afb  plugins/scribe/commands/scribe-self-check.md
806096ce6d93b5846f8268f6d1b0185ac54ebf093b182222c655a9977eb69b90  plugins/scribe/commands/scribe-start.md
3833d6c054c11d2a133c9393712a30a8b5a0350d75ae22853fd73b0b1dd83df8  plugins/scribe/commands/scribe-status.md
1e38d01b010e1799c6b2783b283c962a1dd20099bc920f364c1e62bb8c476c34  plugins/scribe/commands/scribe-version.md
6543ddc761285e5c38f59795f88a845325d17ae357a512c8e1d19a98bc342b9e  plugins/scribe/commands/scribe-workspace-attach.md
a85972f1ba8838a57aed3c7e3620efca4a583d8c9eba19e3b84e6446bf4b7f90  plugins/scribe/commands/scribe-workspace-detach.md
608982fbeae6770dec7e1191464c90d5fd0c6b70b201c540c9488c1e84529e8a  plugins/scribe/commands/scribe-workspace-manifest.md
658ebfec87473cd6c09107071f687e8f2ae543c6d42233d9952794477c0d184c  plugins/scribe/commands/scribe-workspace-status.md
71d7161e74a097f9e93f97947dd204031faf1190849c1daf996664cb3beb92e9  plugins/scribe/hooks/hooks.json
825c51ee465049934debfe0a4aa0077f6330f9b8bf06ca1cd756266eb8e9d146  plugins/scribe/hooks/pre_compact.mjs
d47386260891cb74249e1c0158df639427e79974462ec25376530312c48797f0  plugins/scribe/hooks/session_end.mjs
e18cc3c97149a71e1f81158167411d71ce0dabc0151e24413cd80f760fcd1bcd  plugins/scribe/hooks/session_start.mjs
82cd557ca82cc99b723ef902ac6d4df9b97b7cc49abc450b3807010d1eb7a435  plugins/scribe/package.json
3bce151331f50d2895a025ebd438006df34ae63288a7e1efa7c4959e42e97d51  plugins/scribe/src/bridge_adapter.mjs
1413c0f6306d9b2db10819e98f98cfa49c14172478317a25eadaa490f410f0d2  plugins/scribe/src/notices.mjs
4f45517ffb0aefce96c5a6403d3ffcd7bc3f00ba2d061dc243949c208f119dcf  plugins/scribe/src/operator_messages.mjs
df57b133a0ac1ff01dc0f233223881e11aa33c493fb076bb249036cb2cb97579  plugins/scribe/src/personal_paths.mjs
2d30755db9728c2ec0be8af7241b43b6f05b5cd7014cdcb86eddf659f47d2226  plugins/scribe/src/session_context.mjs
```

not commercial-ready. not beta-ready. Marketplace NOT published.

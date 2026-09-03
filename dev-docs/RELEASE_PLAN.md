# Release Plan — Aug 29 → Sept 10, 2026

Goal: 7 releases, every release has a changelog entry (4+ substantial), plugin fully restructured to PSR-4 by the deadline. Adjust the calendar dates below if your actual start date differs — the sequence and dependencies matter more than the exact days.

## Important architectural decision first

The plugin already has a top-level `/src` folder — that's the **JavaScript** source (React admin app, block editor code), and it's deliberately excluded from the WordPress.org release package via `.distignore` and `composer.json`'s archive exclude list.

**The PSR-4 root must NOT also be named `/src`.** If PHP classes go into `/src`, the existing exclude rules will silently strip them out of every release and the plugin will fatal-error on activation. Use the existing `includes/` folder as the PSR-4 root instead — it already ships correctly, nothing to reconfigure there.

```
composer.json
  "autoload": {
    "psr-4": {
      "PointwiseSummary\\": "includes/"
    }
  }
```

## PSR-4 autoloading approach: custom, not vendor/

Two ways to get PSR-4 autoloading working at runtime:

1. **Composer's generated autoloader** (`vendor/autoload.php`) — standard, but means committing a `vendor/` folder to the WordPress.org SVN repo just for autoloading, since WP.org doesn't run `composer install` for you. That reintroduces exactly the kind of "generated/non-obvious files" concern the plugin was just closed for.
2. **A small hand-written `spl_autoload_register` following the PSR-4 spec's own reference implementation** (~15 lines) — no `vendor/` shipped, fully human-readable, still 100% PSR-4 compliant (PSR-4 defines the namespace-to-path resolution algorithm, not which autoloader implementation you use).

**Recommendation: option 2.** Composer's `autoload.psr-4` block stays in `composer.json` purely so your editor/IDE and `composer dump-autoload` understand the mapping during development; the plugin itself loads classes via the small custom autoloader registered once in `pointwise-summary.php`.

## Naming conventions going forward

- Drop the `Pointwise_Summary_` class prefix — the namespace does that job now.
- Drop the `class-`/`trait-` file-name prefixes — PSR-4 requires the file name to match the class name exactly (`Buttons.php`, not `class-pointwise-summary-buttons.php`).
- One class/trait per file.
- Folder path mirrors namespace, StudlyCase throughout: `PointwiseSummary\Frontend\ButtonRenderer` lives at `includes/Frontend/ButtonRenderer.php`.

### Folder casing — resolved

R4 briefly used lowercase namespace segments (`api\`, `frontend\`, `helpers\`) as a workaround for a case-collision problem: `includes/api/`, `includes/frontend/`, and `includes/helpers/` already existed on disk from the pre-migration codebase, this dev environment is Windows/WAMP (case-insensitive filesystem), and every `Write` to `includes/Api/...` was silently landing inside the existing lowercase folder instead of a new one. The user asked for proper PSR-4 (StudlyCase namespace matching StudlyCase folder), so the code was reverted to `PointwiseSummary\Api`, `PointwiseSummary\Frontend`, `PointwiseSummary\Helpers` everywhere.

That left a disk/git-level gap: the physical folders were still named `includes/api/`, `includes/frontend/`, `includes/helpers/` (lowercase) in the git index — only the files' own namespace declarations said `Api`/`Frontend`/`Helpers`. It worked locally purely because Windows resolves `Api` and `api` as the same folder, but would have fatal-errored on activation on any case-sensitive host (WordPress.org's Linux hosting) because the autoloader's computed path (`includes/Api/AiSettings.php`) would not have matched the git-tracked file (`includes/api/AiSettings.php`), and GitHub would keep showing the old lowercase names.

Fixed with shell access via `git rm -r --cached includes/api includes/frontend includes/helpers` followed by `git add includes/Api includes/Frontend includes/Helpers`, which made git re-detect the paths as renames with the correct case (git's default case-insensitive path matching on Windows was merging the two casings into one index entry and never updating the stored case). `includes/plugin.php`'s stray `includes/helpers/trait-pointwise-summary-singleton.php` require path was also corrected to `includes/Helpers/...`. Verify after the next commit/push that GitHub shows `Api/`, `Frontend/`, `Helpers/`, and test activation on a case-sensitive environment (Linux/WSL) before tagging a release for WordPress.org.

## Target structure

The first draft of this plan used bare/abbreviated names (`Frontend.php` inside a `Frontend\` namespace, `Fab.php`, `Seo.php`) — those stutter against their own namespace or lean on abbreviations instead of saying what the class does. Renamed below, grounded in what each class's docblock/methods actually do, checked against the current code before renaming:

```
includes/
  Plugin.php                   (was plugin.php's require/instantiate list → becomes a real bootstrap class)
  BlockRegistrar.php            (was class-pointwise-summary-blocks.php — registers the Gutenberg block)
  Api/
    Controller.php               (new — abstract base class, not a 1:1 port of anything. Holds the REST-registration/permission-check boilerplate duplicated across all 6 API classes today)
    AiSettings.php
    AdvancedSettings.php
    DisplaySettings.php
    SocialSharing.php
    Shortcodes.php
    SystemInfo.php
  Frontend/
    RenderContext.php           (was class-pointwise-summary-frontend.php — the settings/should-render gateway other Frontend classes read from; "Frontend\Frontend" was a stutter) — DONE (R4)
    Assets.php                  (was class-pointwise-summary-frontend-assets.php — parallel to Admin\Assets, namespace disambiguates the two) — DONE (R4)
    ButtonRenderer.php           (was class-pointwise-summary-buttons.php — builds the AI/social button markup) — DONE (R3)
    PromptBuilder.php            (was class-pointwise-summary-prompt.php — builds the AI prompt string) — DONE (R3)
    SeoIntegration.php           (was class-pointwise-summary-seo.php — detects active SEO plugin, checks noindex; matches its own docblock, "SEO integration helpers") — DONE (R3)
    IconLibrary.php              (was class-pointwise-summary-icons.php — icon markup lookup/registry) — DONE (R3)
    ContentInjector.php          (was class-pointwise-summary-inline.php — the_title/the_content filters that insert buttons) — DONE (R4)
    FloatingActionButton.php     (was class-pointwise-summary-fab.php — "Fab" spelled out; matches the FAB feature name used in the UI/readme) — DONE (R4)
  Admin/
    AdminMenu.php               (was class-pointwise-summary-admin-menu.php)
    Assets.php                  (was class-pointwise-summary-assets.php)
  Helpers/
    SingletonTrait.php           (was helpers/trait-pointwise-summary-singleton.php) — DONE (R2)
```

Note on `Api\AiSettings` (not `Api\AISettings`): treating acronyms as ordinary words in StudlyCase is the PER/PSR-12 coding-style convention, not an inconsistency — same reasoning applies to `Frontend\SeoIntegration` above.

### Why the `Api/` group changed from `*Controller.php` to a shared `Controller` base

The `*Controller` suffix on all six classes was redundant once every file already lives under the `Api\` namespace — `Api\AiSettingsController` says "controller" twice. Dropping the suffix (`Api\AiSettings`) reads cleanly and still says exactly what it is, because the namespace does that job.

That frees up the name `Controller` for something more useful: a real abstract base class. Right now each of the 6 `includes/api/class-pointwise-summary-*-api.php` files repeats the same shape — a `register_rest_route()` call, a permission callback, get/update/reset handlers, sanitize-then-save. Pulling that shared shape into `abstract class Controller` (with each resource extending it, e.g. `class AiSettings extends Controller`) means R2 isn't a pure rename — it's a small real refactor that removes duplication instead of just relocating it. Concretely, `Controller` would own: the common `permission_callback` (capability check), a `success_response()`/`error_response()` helper pair, and an abstract `register_routes()` method each child implements.

This adds one new file that didn't exist before (`Api/Controller.php`), so the API group goes from 6 files to 7.

18 files total to migrate (6 API, 8 frontend, 3 admin/root, 1 trait) — matches the full `require_once` list currently in `includes/plugin.php` — plus 1 new file (`Api/Controller.php`) introduced during the migration itself, for 19 files in the final `includes/` tree.

## Release calendar

| # | Target date | Theme | Migrates | Changelog |
|---|---|---|---|---|
| R1 | Aug 28 | Compliance cleanup + PSR-4 scaffolding | Done: version numbers confirmed in sync, `composer.json` PSR-4 autoload block + `includes/autoload.php` custom `spl_autoload_register` added and wired into `pointwise-summary.php` (registered but unused — old `require_once` list untouched, zero behavior change). Monaco CDN self-host: confirmed complete by the user. | Substantial — autoloader scaffolding (see readme.txt 1.2.3 entry) |
| R2 | Aug 29 | PSR-4: API layer | Done: `Api/Controller.php` abstract base + 6 resource classes (`AiSettings`, `AdvancedSettings`, `DisplaySettings`, `SocialSharing`, `Shortcodes`, `SystemInfo`) → `includes/Api/*`; new `includes/Helpers/SingletonTrait.php` (namespaced copy, used only by these 6 — see note below). `includes/plugin.php` and the 4 cross-references in `class-pointwise-summary-frontend.php` updated to the new FQCNs. **Correction to the original plan:** the *old* global trait (`includes/helpers/trait-pointwise-summary-singleton.php`) could NOT be deleted this release — 9 other not-yet-migrated classes (Admin, Blocks, all 8 Frontend classes) still `use Pointwise_Summary_Singleton;` from it. It stays until R5 deletes the last class that needs it. **Also: the 6 old `includes/api/class-*.php` files could not be physically deleted** (no shell access this session) — they're overwritten with deprecation-notice stubs (no class body, so no conflict) and nothing requires them anymore; delete them manually when convenient. | Substantial — see readme.txt 1.2.4 entry |
| R3 | Aug 29 | PSR-4: Frontend content classes | Done: `ButtonRenderer`, `PromptBuilder`, `SeoIntegration`, `IconLibrary` → `includes/Frontend/*`. `ButtonRenderer` calls `PromptBuilder`/`IconLibrary` unqualified (same namespace) and still calls the not-yet-migrated global `Pointwise_Summary_Frontend` via a leading `\`. Fixed 6 stray old-class-name references across `includes/plugin.php`, `class-pointwise-summary-fab.php` (3), `class-pointwise-summary-inline.php`, and `class-pointwise-summary-frontend.php`. Caught and fixed a namespace-resolution bug in the migrated `SeoIntegration` class (an unqualified `AIOSEO\...` reference would have resolved under the wrong namespace). Old 4 files stubbed (not deleted — no shell access, see R2 note). | Substantial — see readme.txt 1.2.5 entry |
| R4 | Aug 29 | PSR-4: Frontend orchestration classes | Done: `RenderContext`, `ContentInjector`, `FloatingActionButton`, `Assets` → `includes/Frontend/*`. Old 4 files stubbed (not deleted — no shell access, see R2 note). Initially "fixed" a case-collision bug (found affecting R2/R3 too) by lowercasing the `Api`/`Frontend`/`Helpers` namespace segments — reverted per user feedback back to proper StudlyCase PSR-4. The resulting disk/git-level casing gap was later closed — see "Folder casing — resolved" above. | Substantial — see readme.txt entry |
| R5 | Sept 7 | PSR-4: Admin/Blocks + cutover | `AdminMenu`, `Assets` → `includes/Admin/*`; `BlockRegistrar` → `includes/BlockRegistrar.php`. Old `class-*.php` files fully deleted (including the 6 R2 API stubs, still sitting as deprecation notices — see R2 note), old global `trait-pointwise-summary-singleton.php` finally deleted once this is the last release that needs it, `includes/plugin.php` replaced by `includes/Plugin.php` bootstrap class. Update `phpcs.xml` paths and `ARCHITECTURE.md`. If file deletion is still not possible in-session by then, this needs to happen manually before tagging — stub files left lying around undermines the "clean, human-readable code" point of the whole migration. | Minimum viable — one-liner ("PSR-4 migration complete") |
| R6 | Sept 9 | Full regression + hardening | No moves — full QA pass: all 4 npm lint scripts, `composer lint:php`, manual test on a clean WP install with `WP_DEBUG` on, re-verify no CDN calls, re-verify readme accuracy | Substantial — bug fixes found during QA |
| R7 | Sept 10 | Buffer / polish | Reserved for whatever R6's QA turns up. If nothing breaks: translation/docs polish, final changelog consolidation | At minimum a one-liner; substantial if R6 found bugs |

That's 7 releases, all with changelog entries, 5 of 7 substantial (exceeds the "4 minimum").

## Per-release checklist (repeat every time)

1. Bump the version in all four places together — they've drifted before, this is the #1 recurring bug risk:
   - `pointwise-summary.php` → `Version:` header
   - `pointwise-summary.php` → `POINTWISE_SUMMARY_VERSION` constant
   - `package.json` → `"version"`
   - `readme.txt` → `Stable tag:`
2. Add the changelog entry to `readme.txt` under a correctly numbered heading (double check it's not a placeholder like `1.x.0` and not reusing a version number already used).
3. Run and pass: `npm run lint:js`, `npm run lint:css`, `npm run lint:pkg-json`, `composer lint:php` (or `npm run lint:wpcs`).
4. `npm run build`, then grep `/build` for `jsdelivr`/`cdn.` to confirm nothing external crept back in.
5. For a PSR-4 migration release specifically: grep the whole repo for the *old* class name before deleting its file, to catch any stray reference (docblocks, `phpcs.xml` exclude paths, etc.) the IDE rename might miss.
6. Test manually on a clean WP install with `WP_DEBUG` true — this is WordPress.org's own checklist requirement from the earlier closure notice, worth actually doing, not just checking the box.
7. Commit to SVN trunk, cut the new tag, confirm it's live on WordPress.org.

## Risk notes

- 7 releases in ~13 days is tight. The buffer release (R7) is there on purpose — don't schedule new work into it in advance.
- Frontend classes (R3/R4) are the highest-risk migration since they're what actually renders on real posts. Test each button/platform by hand after moving these, not just "it didn't fatal error."
- Don't let PSR-4 work and WordPress.org-facing fixes collide in the same release if avoidable — R1 intentionally finishes the compliance work *before* any class-moving starts, so a review re-check isn't chasing a moving target.

# Pointwise Summary Agent Guide

> Keep this file short. For detailed standards, see [.github/copilot-instructions.md](.github/copilot-instructions.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

## Use This Repo Like This

- Prefer minimal, targeted changes. Do not touch unrelated code.
- Link to existing docs instead of duplicating them.
- Preserve existing file structure, naming, and WordPress conventions.
- Use tabs in PHP, JS, and CSS files where the codebase already does.
- Keep generated assets and WordPress core files out of scope unless the task explicitly needs them.

## Project-Specific Facts

- The plugin bootstrap is in [includes/plugin.php](includes/plugin.php).
- REST API controllers live in [includes/Api/](includes/Api/) as PSR-4 `PointwiseSummary\Api\*` classes.
- Server-side rendering helpers live in [includes/Frontend/](includes/Frontend/) as PSR-4 `PointwiseSummary\Frontend\*` classes.
- The admin app lives under [src/admin/](src/admin/).
- The help system uses Redux state in [src/admin/store/](src/admin/store/).
- The shortcode examples and system info data come from the REST API, not hardcoded UI state.

## Commands

- `npm run start` for local development.
- `npm run build` for production builds.
- `npm run lint:js` and `npm run lint:css` for validation.
- `npm run format` for formatting.
- `npm run plugin-zip` only when preparing a distribution archive.

## Common Pitfalls

- Do not add Node-only imports to browser code in [src/admin/](src/admin/).
- Keep REST response shapes aligned with the React components that consume them.
- Avoid hardcoding translated UI strings when a shared frontend helper already exists.
- Keep shortcode rendering aligned with the shared frontend button renderer so styling and JS hooks stay consistent.

## Reference Docs

- [README.md](README.md) for user-facing feature overview.
- [ARCHITECTURE.md](ARCHITECTURE.md) for the current code structure.
- [.github/copilot-instructions.md](.github/copilot-instructions.md) for the full coding standard.

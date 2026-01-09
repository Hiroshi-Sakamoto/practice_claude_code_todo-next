# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `app/`; `layout.tsx` defines the shell, `page.tsx` renders the todo view, and `globals.css` holds global styles.
- Shared UI sits in `components/` (e.g., `TodoList.tsx`) with colocated tests (`*.test.tsx`).
- Tooling/config: `tsconfig.json` (strict TS, `@/*` paths), `tailwind.config.ts` + `postcss.config.js`, `vitest.config.mjs` + `vitest.setup.ts`, and `next.config.js`.
- Static assets should go in `public/` if added; keep page-level styling lean and prefer component-level Tailwind classes.

## Build, Test, and Development Commands
- `npm run dev` — start the Next.js dev server on http://localhost:3000.
- `npm run build` — create a production build; run before deployment.
- `npm start` — serve the built app locally.
- `npm run lint` — apply Next.js ESLint rules.
- `npm test` — Vitest in watch/interactive mode with jsdom.
- `npm run test:run` — headless test run for CI; `npm run test:ui` to debug via Vitest UI.

## Coding Style & Naming Conventions
- TypeScript with React function components; follow the existing 2-space indent, single quotes, and no semicolons.
- Components and files use PascalCase; hooks/utilities use camelCase; tests mirror source filenames with `.test.tsx`.
- Keep `use client` directives only where client state/hooks are required. Import via `@/...` path aliases.
- Prefer Tailwind utility classes; add shared tokens in `globals.css` and avoid bespoke CSS unless necessary.

## Testing Guidelines
- Vitest + @testing-library/react + jsdom; DOM assertions come from `@testing-library/jest-dom` (wired in `vitest.setup.ts`).
- Keep tests beside the code they cover; name suites around user behaviors (e.g., “renders initial list”, “adds item”).
- Run `npm run test:run` before pushing; add regression tests when fixing bugs or adjusting sorting/filtering logic.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes seen in history (`test:`, `refactor:`, `chore:`); scope is optional but helpful.
- PRs should explain intent, key changes, and user-facing impact; link issues when available.
- Document validation (tests run, manual checks) and include screenshots or GIFs for UI changes.

## Safety / Approvals (untrusted)
- Do not expose or edit secrets; skip `.env` or credential files entirely.
- Avoid destructive git actions; never force-push or reset without explicit approval.
- No direct commits to `main`; open a feature branch and PR instead.
- For commands needing elevated access or network, request approval first and state why.
- Before committing, run `npm run lint` and `npm run test:run` to confirm status.

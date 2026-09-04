<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project coding conventions

- **No short or context-less variable names** — no `e`, `el`, `li`, `i`, `s`,
  `d`, etc. Name things for what they hold (`event`, `element`, `caseStudy`,
  `index`, `githubUser`...), even in small callbacks (`.map`, `.filter`,
  event handlers).
- **Avoid complex inline functions inside components.** Non-trivial logic
  (animation math, data fetching, formatting, event-name constants) belongs
  in `utils/`, grouped by what it relates to (e.g. `utils/motion.ts` for
  animation helpers, `utils/github.ts` for the GitHub API call), not written
  inline inside a component body.
- **Server data fetching uses React Query** (`@tanstack/react-query`) — no
  bare `useEffect` + `fetch` + `useState` for data that comes from a server.
  Wrap the fetcher (from `utils/`) in a `useQuery` hook under `hooks/`.

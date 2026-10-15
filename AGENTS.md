# agent-patterns-demo

Demo repo that compares three agent patterns using one task, the history of Visa, Mastercard, and Discover. It is public, so keep client names and secrets out of every file.

Pattern comparison and the rule of thumb: `docs/comparison.md`.

## Layout

| Path | What it is |
| --- | --- |
| `.claude/agents/` | `history-researcher` for subagents. Five `timeline-*` roles reused as team teammates. |
| `.claude/settings.json` | Turns on experimental agent teams for this repo. |
| `.claude/skills/keep-agentsmd-and-claudemd-updated/` | Run `/keep-agentsmd-and-claudemd-updated` after meaningful work. |
| `.github/agents/` | VS Code Copilot custom agents, `*.agent.md`. |
| `demos/01-subagents/`, `demos/02-agent-teams/`, `demos/03-custom-agents/` | Prompt and talking points per demo. |
| `src/`, `index.html`, `package.json` | The Vite + React + TypeScript timeline app (`npm install`, `npm run dev`). Components in `src/components/`, data in `src/data/timeline.json`. |
| `data/timeline.json` | 28 sourced events from a parallel research run. Demo 1 regenerates it. |

## Branches

- `main` is the starting point. Config, agents, prompts, no app.
- `solution` is a reference result. It adds the finished Vite app.

## Conventions

- Each team role owns separate files. Do not edit a file owned by another role.
- Event schema: `brand`, `year`, `title`, `summary`, `source` in `data/timeline.json`. The app adds `id`.
- `CLAUDE.md` contains only `@AGENTS.md`.
- Check library versions on the web before pinning them.

## Current focus (2026-10-14)

Both branches are built. The app uses Vite 8, React 19, and motion. Next is publishing to GitHub.

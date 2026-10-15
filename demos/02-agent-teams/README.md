# Demo 2: Team of agents

Goal: show several full sessions that share a task list and message each other. The lead assigns work, but the teammates coordinate among themselves.

Agent teams are experimental. `.claude/settings.json` sets `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` for this repo. They use many more tokens than one session, so run this once and narrate while it works.

Optional: `claude --teammate-mode auto` inside tmux or iTerm2 gives one pane per teammate. The default in-process mode works in any terminal.

## Roles

The five teammates are the subagent definitions in `.claude/agents/`. Each owns separate files, so nobody overwrites anybody.

| Teammate | Owns | Blocked on |
| --- | --- | --- |
| `timeline-architect` | `package.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/types.ts` | nothing |
| `timeline-data-curator` | `src/data/` | `src/types.ts` |
| `timeline-designer` | `src/components/`, `src/styles/` | the scaffold |
| `timeline-qa-reviewer` | nothing, read-only. Build, types, data, code. | designer and curator |
| `design-reviewer` | nothing, read-only. A generic, reusable agent. It screenshots at desktop and phone width and checks scrollbars and contrast. | designer |

The first four are specific to this build. `design-reviewer` is not. It works for any web UI, so copy it into your own projects. It also runs as a plain subagent.

## Prompt

```text
Create an agent team to build a Vite React TypeScript page with a visual,
interactive history timeline of Visa, Mastercard, and Discover. Use the
data in data/timeline.json. Spawn five teammates from these agent types:
timeline-architect, timeline-data-curator, timeline-designer,
timeline-qa-reviewer, and design-reviewer. Name them architect,
curator, designer, qa, and design. Make the architect go first. Have qa
and design send defects straight to the owner. Tell design to review
the built app at http://localhost:4173 against the brief in the designer's
agent file.
Wait for the teammates to finish before you summarize.
```

## What to point at

1. The agent panel lists five teammates. Arrow keys and Enter open any teammate's transcript.
2. Press Ctrl+T for the shared task list. Dependencies keep the designer waiting until the architect finishes.
3. Watch `qa` and `design` message the designer or curator directly. `design` screenshots the app at phone width and catches ugly default scrollbars and cramped mobile layout. In demo 1, subagents only reported to the parent.
4. Message a teammate yourself without going through the lead.

## Run it

```bash
npm install
npm run dev
```

## Known rough edges

- No session resume for in-process teammates.
- Task status sometimes lags. Tell the lead to nudge.
- One team per session, no nested teams.
- Claude may use plain subagents unless the prompt says "agent team".

The `solution` branch has the finished app from a reference run.

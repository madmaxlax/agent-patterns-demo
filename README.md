# agent-patterns-demo

Three ways to use more than one agent, shown on one task: the history of Visa, Mastercard, and Discover.

| Pattern | Reports to | Demo |
| --- | --- | --- |
| Subagent | The main agent | [demos/01-subagents](demos/01-subagents/README.md) |
| Team of agents | The lead and each other | [demos/02-agent-teams](demos/02-agent-teams/README.md) |
| Custom agent | You | [demos/03-custom-agents](demos/03-custom-agents/README.md) |

Side-by-side comparison: [docs/comparison.md](docs/comparison.md).

## Branches

- `main` is the starting point. Agents, settings, and prompts, with no app.
- `solution` is one possible result. It adds the finished Vite and React timeline app.

## Prerequisites

- [Claude Code](https://code.claude.com) for demos 1 and 2.
- VS Code with GitHub Copilot Chat for demo 3.
- Node 20 or newer for the timeline app.
- tmux or iTerm2 is optional. It gives each teammate its own pane in demo 2.

## Quick start

```bash
git clone https://github.com/madmaxlax/agent-patterns-demo
cd agent-patterns-demo
claude
```

Then paste the prompt from `demos/01-subagents/README.md`.

## Cost note

Demo 1 is cheap. Demo 2 runs five full sessions and costs several times more. Run it once.

## Keeping context files current

Run `/keep-agentsmd-and-claudemd-updated` after meaningful work. It checks that `AGENTS.md` is current and that `CLAUDE.md` only contains `@AGENTS.md`.

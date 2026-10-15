# Subagents, team of agents, custom agents

To tell them apart, ask who the agent reports to.

- Subagent: the main agent.
- Teammate: the team or the lead agent.
- Custom agent: you.

| | Subagent | Team of agents | Custom agent |
| --- | --- | --- | --- |
| What it is | A helper sent off on a task | Several sessions on one project | A saved role you chat with |
| Started by | The main agent, mid-task | You, via a lead session | You, from the Agents dropdown |
| Talks to | The main agent only | Each other, via a shared task list | You, in the chat |
| Context | Its own, and a summary comes back | One per teammate | The chat you are already in |
| Ends | When the task is done | When the team's work is done | When you switch agents |
| Where | Claude Code and Copilot | Claude Code Agent Teams, Copilot CLI `/fleet`. Both experimental | VS Code Copilot `.agent.md`, can also run as a subagent |
| Defined in | `.claude/agents/*.md` | Reuses subagent definitions, plus a spawn prompt | `.github/agents/*.agent.md` |
| Token cost | Lower, only summaries return | Highest, every teammate is a full session | Same as a normal chat |

## In this repo

| Concept | Files | Demo |
| --- | --- | --- |
| Subagent | `.claude/agents/history-researcher.md` | [01](../demos/01-subagents/README.md) |
| Team of agents | the four `timeline-*.md` files and `design-reviewer.md` in `.claude/agents/` | [02](../demos/02-agent-teams/README.md) |
| Custom agent | `.github/agents/*.agent.md` | [03](../demos/03-custom-agents/README.md) |

## When to use which

- Use a subagent when only the answer matters and the reading would clutter your window. Research, review, root-cause analysis.
- Use a team when workers need to talk to each other, challenge findings, or own separate parts of one build. Expect high token cost.
- Use a custom agent when you want to chat with a particular role, tool set, or tone. It does not run work in parallel by itself.
- Stay in one session for small fixes, tightly coupled edits, or two tasks that touch the same file.

## Sources

- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code agent teams: https://code.claude.com/docs/en/agent-teams
- VS Code custom agents: https://code.visualstudio.com/docs/agent-customization/custom-agents

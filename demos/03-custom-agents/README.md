# Demo 3: Custom agents in VS Code

Goal: show a saved role you chat with. The agent reports to you, not to another agent.

Setup: open this folder in VS Code with GitHub Copilot Chat. Agent files live in `.github/agents/` and end in `.agent.md`. Open Chat, then pick the agent from the Agent dropdown.

## Script

1. Pick **Grumpy Gus**. Ask: `What is the best way to center a div?`
   Expect a complaint instead of an answer. Same model, different role.
2. Say `Gus, drop the act` to show the escape hatch written into the agent file.
3. Switch to **Payments Historian**. Ask: `Give me a short history of Discover.`
4. Click the **Get Gus's take** handoff button under the answer. The conversation moves to Gus with the prompt prefilled.
5. Open `.github/agents/grumpy-gus.agent.md` and show that the whole persona is one Markdown file with a few lines of frontmatter.

## What to point at

- `tools: []` on Gus means no tools. He cannot help even if he wanted to.
- The historian gets read-only tools and a `handoffs` entry.
- Switching agents ends that role. Nothing runs in the background.

## Custom agent as a subagent

A custom agent can also run as a subagent when another agent delegates to it. In VS Code, turn on subagents first. Then ask the default agent:

```text
Use the Payments Historian as a subagent to summarize the history of Visa,
then ask Grumpy Gus as a subagent to critique the summary. Show me both.
```

Now neither agent talks to you directly. They report to the main agent.

## Copilot CLI

The `/fleet` command runs work in parallel in Copilot CLI. It is experimental.

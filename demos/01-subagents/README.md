# Demo 1: Subagents

Goal: show that a subagent has its own small context window and hands back only a summary. Parallel speed is the bonus.

Setup: open Claude Code in the repo root. The `history-researcher` agent in `.claude/agents/` loads automatically.

## Prompt

```text
Use the history-researcher subagent to research the corporate history of
Visa, Mastercard, and Discover. Launch one subagent per company, all three
in parallel in a single turn. Each one returns 8 to 10 sourced milestones.
When all three are back, merge them into data/timeline.json as a flat
array sorted by year, then tell me the two earliest events per company.
```

## What to point at

1. Three agent rows appear at once. This is the parallel part.
2. Each subagent runs dozens of searches and page reads. None of that shows up in the main conversation.
3. Run `/context` after it finishes. The main window holds three short JSON blobs, not 30 web pages.
4. The researcher has only `WebSearch` and `WebFetch`. It cannot write files, so the main session does the merge.

## Contrast run

Run `/clear`, then the same job with no delegation:

```text
Do not use subagents. Research the corporate history of Visa, Mastercard,
and Discover yourself, one after another, then merge the results into
data/timeline.json sorted by year.
```

Run `/context` again. Compare the context size and the wall-clock time.

## Output schema

```json
[
  { "brand": "visa", "year": 1958, "title": "...", "summary": "...", "source": "https://..." }
]
```

The repo ships a seed `data/timeline.json` so demo 2 works even if you skip this demo.

## Try next

- Ask Claude to review a diff with three parallel subagents: security, bugs, test gaps.
- Open a running subagent from the agent panel and talk to it.

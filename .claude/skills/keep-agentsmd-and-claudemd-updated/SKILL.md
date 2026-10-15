---
name: keep-agentsmd-and-claudemd-updated
description: Keep AGENTS.md accurate and make sure every CLAUDE.md only contains @AGENTS.md. Use after meaningful work, when asked to update project context, or when a new directory gets conventions of its own.
---

# Keep AGENTS.md and CLAUDE.md updated

`AGENTS.md` holds repo context for every AI tool. `CLAUDE.md` exists only so Claude Code loads it. Treat `AGENTS.md` as a table of contents. It names the purpose, current focus, key decisions, and where detail lives.

## Steps

1. Run the check.

   ```bash
   node .claude/skills/keep-agentsmd-and-claudemd-updated/scripts/check.mjs
   ```

   It flags missing files, a `CLAUDE.md` that holds more than `@AGENTS.md`, files over 150 lines, and commits that landed after `AGENTS.md` last changed.

2. For each flag, read the commits or files it names. Update the nearest `AGENTS.md`.
   - Change facts that are now wrong. Do not append a changelog.
   - Add one line for a new directory, command, or decision a fresh session would need.
   - Link to a README or doc instead of copying it.
   - Put area-specific rules in that area's own `AGENTS.md` and link to it from the root.

3. Make `CLAUDE.md` a single line next to every `AGENTS.md`.

   ```markdown
   @AGENTS.md
   ```

   If a `CLAUDE.md` has other content, move it into `AGENTS.md` first.

4. Update the date in the "Current focus" line of the root `AGENTS.md`. Get the date with `date +%Y%m%d`.

5. Run the check again. Report what changed in two or three bullets.

## Style

- Plain sentences, one clause each. No semicolons or em-dashes in prose.
- Commands, paths, and tables are exempt.
- Do not put secrets, client names, or personal data in these files. This repo is public.

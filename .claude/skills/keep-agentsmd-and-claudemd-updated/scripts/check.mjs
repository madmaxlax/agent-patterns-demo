#!/usr/bin/env node
// Reports whether AGENTS.md and CLAUDE.md files in this repo need attention.
// Usage: node check.mjs [repoRoot]
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const MAX_LINES = 150
const root = process.argv[2] ?? execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim()
const git = (cmd) => {
  try {
    return execSync(`git -C "${root}" ${cmd}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return '' // for example, a repo with no commits yet
  }
}

const agentsFiles = git('ls-files --cached --others --exclude-standard "*AGENTS.md"')
  .split('\n')
  .filter(Boolean)

if (!agentsFiles.includes('AGENTS.md')) {
  console.log('MISSING  AGENTS.md at the repo root. Create it, then add CLAUDE.md containing @AGENTS.md.')
}

for (const file of agentsFiles) {
  const dir = dirname(file)
  const lines = readFileSync(join(root, file), 'utf8').split('\n').length
  console.log(`\n${file} (${lines} lines)`)
  if (lines > MAX_LINES) console.log(`  LONG     over ${MAX_LINES} lines. Move detail into docs and link to it.`)

  const claudePath = join(root, dir, 'CLAUDE.md')
  if (!existsSync(claudePath)) {
    console.log('  MISSING  sibling CLAUDE.md. Create it containing only @AGENTS.md.')
  } else if (readFileSync(claudePath, 'utf8').trim() !== '@AGENTS.md') {
    console.log('  DRIFT    sibling CLAUDE.md should contain only @AGENTS.md. Move its content into AGENTS.md.')
  } else {
    console.log('  OK       CLAUDE.md points at AGENTS.md')
  }

  // Staleness: commits in this directory since AGENTS.md last changed.
  const scope = dir === '.' ? '.' : dir
  const last = git(`log -1 --format=%H -- "${file}"`)
  if (!last) {
    console.log('  NEW      AGENTS.md is not committed yet.')
    continue
  }
  const since = git(`log --format=%h\\ %s ${last}..HEAD -- "${scope}"`).split('\n').filter(Boolean)
  if (since.length) {
    console.log(`  STALE    ${since.length} commit(s) touched ${scope} since AGENTS.md last changed:`)
    since.slice(0, 10).forEach((c) => console.log(`           ${c}`))
  } else {
    console.log('  OK       no commits since the last AGENTS.md change')
  }
}

// Mention directories that look like they deserve their own AGENTS.md.
const hot = ['demos', 'src', '.claude', '.github']
  .filter((d) => existsSync(join(root, d)) && !agentsFiles.some((f) => f.startsWith(`${d}/`)))
console.log(`\nDirectories without their own AGENTS.md: ${hot.length ? hot.map((d) => relative('.', d)).join(', ') : 'none'}`)
console.log('Add one only where the area has conventions a fresh session would otherwise guess wrong.')

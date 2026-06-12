# grok.md

Grok project guide and instructions for the Pharmacy application.

## Project Summary

- **Framework**: Next.js (App Router in `app/`)
- **Language**: TypeScript
- **Package Manager**: Bun (see `bunfig.toml`, `bun.lock`)
- **UI**: Tailwind CSS + shadcn/ui (see `components.json`)
- **Location**: Windows (PowerShell shell)

## Core Instructions

Always follow the rules defined in [AGENTS.md](./AGENTS.md).

The `CLAUDE.md` file simply redirects to AGENTS.md for compatibility.

### Next.js Specifics
This is **NOT** the Next.js you may know from training data. APIs, conventions, and file structure may differ.
- Read relevant guides in `node_modules/next/dist/docs/` before writing code.
- Heed all deprecation notices.

## Recommended Grok Workflow

- Use **plan mode** (`enter_plan_mode`) for tasks with genuine ambiguity, multiple architectures, or high-impact changes.
- Use the built-in **todo_write** tool to track progress on any multi-step task (3+ steps).
- Prefer relative paths in tool calls.
- After making code changes:
  - Verify immediately (run `bun run build`, `bun run lint`, or relevant dev server checks).
  - Do not skip the "finish line" — always test the actual request.
- For file operations, use the specialized tools (`read_file`, `search_replace`, `list_dir`, `grep`, `write`) instead of raw shell commands when possible.
- When the task is straightforward (bug fix, small feature, obvious path), start implementing directly. Use `ask_user_question` only for narrow clarifications.

## Common Commands (Bun-first)

```bash
bun install
bun run dev
bun run build
bun run lint
```

## Session Tips

- Start fresh sessions with `/new` when context becomes too large.
- Use `@filename` or `@path` to attach files directly in prompts.
- Use `Ctrl+T` to toggle the TODO panel.
- For background work, use the `background: true` option on long-running `run_terminal_command`.

## Project Structure Highlights

```
pharmacy/
├── app/                 # Next.js App Router (layout, page, etc.)
├── src/                 # Additional source (if used)
├── public/
├── AGENTS.md            # Primary agent rules (read this)
├── grok.md              # This file (Grok-specific notes)
├── CLAUDE.md            # Compatibility redirect
├── bunfig.toml
├── package.json
└── components.json      # shadcn/ui config
```

## Additional Notes

- Git is on `master` branch by default in this workspace.
- Always prefer the most direct implementation that fulfills the user's request exactly. Avoid adding unrequested features, docs, or abstractions.
- Security: never introduce vulnerabilities (command injection, etc.). Prioritize safe, correct code.

Refer to `~/.grok/docs/user-guide/` (especially `12-project-rules.md` and `19-plan-mode.md`) for deeper Grok usage details.

---
*This file provides persistent context for Grok sessions in this directory tree.*

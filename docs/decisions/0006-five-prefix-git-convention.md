# ADR-0006: Five-prefix branch and commit naming convention

**Status:** Accepted
**Date:** 2026-05-02

## Context

Pre-rewrite, the project had no documented branch- or commit-naming convention. Branches landed under whatever names contributors picked: feature names, GitHub Issue numbers, ad-hoc descriptors. Commit titles followed no template.

Most contributors instinctively reach for some shape of Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`, `perf:`), but Conventional Commits' nine-prefix list invites bikeshedding (is this a `chore` or a `build`? a `style` or a `refactor`?) and overhead (the spec includes scopes, breaking-change markers, and a body convention that's heavier than a small volunteer team needs).

The rewrite is a moment to codify a lighter convention - wide enough to give every commit a clear home, narrow enough that the choice is obvious in 90% of cases.

## Decision

**Use five prefixes for both branch names and commit-message titles: `feat`, `fix`, `chore`, `docs`, `refactor`. Subsumes `ci`, `build`, `style`, `test` under `chore`. Optional scope after the type. Apply forward-only: existing branches and commits are grandfathered.**

Concrete rules (per [`docs/developer/git-branch-structure.md`](../developer/git-branch-structure.md)):

- Branch names: `<prefix>/<short-description>`, e.g. `refactor/views-explicit`, `feat/auth-stage1`, `docs/add-docstrings`.
- Commit-message titles: `<prefix>: <short title>` or `<prefix>(<scope>): <short title>`, e.g. `refactor: Convert single-purpose views to function-based views`.
- The five prefixes:
  - `feat` - wholly new functionality.
  - `fix` - bug fix to existing functionality.
  - `chore` - tooling, CI, build, dep bumps, lint config, formatting-only changes, test-only changes (everything that's a healthy-codebase activity but isn't user-visible).
  - `docs` - changes only to documentation files (Markdown under `docs/`, README, CONTRIBUTING) or to docstrings/comments that don't change behavior.
  - `refactor` - internal restructuring without behavior change (rename, move, split, extract).
- Scope (optional, in parens after the prefix): used when the change is local to a clear submodule (`feat(auth): ...`, `refactor(serializers): ...`).
- Enforcement: docs + PR review. No tooling enforcement (no commitlint, no commit hook).
- Forward-only: existing branches and commits in the repo's history stay as-is. Renaming live branches and rewriting commit history is more churn than the convention buys.

## Alternatives considered

- **Full Conventional Commits (9-prefix list).** The spec, with `ci`, `build`, `style`, `test`, `perf` as additional types. Discarded because (a) the additional prefixes invite bikeshedding more than they help; (b) `style:` (formatting-only) and `test:` (test-only) overlap with `chore:` enough that splitting them creates judgment-call friction without payoff; (c) the spec also includes `BREAKING CHANGE:` footers and structured bodies that we don't need.

- **No convention at all.** Keep things ad-hoc. Discarded because the rewrite work was about to add many stacked PRs against the chain, and inconsistent naming makes the chain harder to skim.

- **One-prefix-fits-all (e.g. just `feat:`).** Discarded because the prefix's value is exactly the categorization signal - collapsing it to one token loses what makes the convention useful.

- **Tooling-enforced (commitlint or a pre-commit hook).** Discarded because (a) the volunteer team is small enough that human review catches violations; (b) tooling enforcement adds a setup step for new contributors; (c) the convention is supposed to be guidance, not an obstacle.

- **Retroactively rename existing branches and rewrite commit history.** Discarded. Renaming live PR branches breaks PR URLs and forces force-pushes; rewriting history breaks anyone who has a fork or a clone with the old SHAs. Forward-only is the right cut.

## Consequences

**Accepted:**

- The boundary between `chore` and `refactor` requires judgment: a dep bump that also rearranges imports could be either. The default (per the docs) is to lead with the more visible class - if user-facing behavior changes nothing and the structural change is the headline, `refactor`; if it's a tooling/build/CI/test change, `chore`.

- Existing branches in the repo's history don't follow the convention. Anyone reading `git log` will see a mix of pre-convention and post-convention commits. Mitigated by the forward-only rule being explicit.

- No tooling means a wrong prefix can land if review misses it. Mitigated by PR-body conventions and reviewer attention.

**Won:**

- Reading `git log` after the convention lands gives a one-token classification of every commit.

- The five-prefix list is teachable in two minutes. New contributors don't have to read a spec.

- Branch names sort meaningfully in `git branch --list` output (all `refactor/*` group together, all `feat/*` group together).

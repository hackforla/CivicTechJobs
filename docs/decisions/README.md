# Decisions log

Architecture-Decision-Record (ADR) style notes for non-obvious choices made on this project. Each ADR records the call, the alternatives considered, and the trade-offs accepted, so the reasoning is recoverable if anyone (including us) questions a choice later.

These ADRs are public-facing and live in the repo. They cover decisions that contributors interact with - patterns, architecture, conventions. Internal-only or strategic notes (e.g. "we paused this branch and rebuilt later") live elsewhere and are not part of this set.

## Index

### Tooling (consolidated)

- [0001 - Tooling and dependency baseline](0001-tooling-baseline.md) - backend lint, frontend lint, test runner versions, Django/Python/Node majors, database driver, pre-commit framework

### Foundational architecture

- [0002 - Stage 1 skips PeopleDepot integration](0002-stage-1-skip-peopledepot.md)
- [0003 - Separate frontend and backend containers](0003-separate-frontend-backend-containers.md)
- [0004 - CSS Modules without a preprocessor](0004-css-modules-without-preprocessor.md)
- [0005 - Vitest replaces Jest](0005-vitest-replaces-jest.md)

### Process

- [0006 - Five-prefix branch and commit naming convention](0006-five-prefix-git-convention.md)
- [0007 - Docstring conventions](0007-docstring-conventions.md)
- [0014 - Make as the canonical task runner](0014-make-canonical-task-runner.md)

### Code patterns

- [0008 - FBVs over single-purpose generics and ReadOnlyModelViewSets](0008-fbv-over-single-purpose-generics.md)
- [0009 - Separate Read/Write serializer classes](0009-separate-read-write-serializers.md)
- [0010 - Per-resource test files with shared factory module](0010-test-shape-per-resource-files.md)
- [0011 - URL routing - kebab-case, plural, trailing slash](0011-url-routing-kebab-case-plural.md)
- [0012 - Permission class shape](0012-permission-class-shape.md)
- [0013 - Error envelope shape](0013-error-envelope-shape.md)

## Format

Each ADR has:

- **Status** - Accepted, Superseded, or Deprecated
- **Date** - when the decision was made
- **Context** - what problem we were solving
- **Decision** - what we chose
- **Alternatives considered** - what we ruled out and why
- **Consequences** - what we accepted in exchange (and what we won)

If a decision is later overturned, supersede the ADR (don't edit it in place) and link forward.

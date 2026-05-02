# Git Branch Structure

The CivicTechJobs repo uses a three-branch model: **`main`**, **`develop`**, and the archived **`ava-main-v1`**. New work happens on feature branches off `develop`; releases land on `main`. The model follows the [git-flow pattern](https://nvie.com/posts/a-successful-git-branching-model/).

## Protected branches

### `main`

Production code. Pushes to `main` trigger the deployment workflow ([.github/workflows/deploy-stage.yml](https://github.com/hackforla/CivicTechJobs/blob/main/.github/workflows/deploy-stage.yml)) which builds the container images and redeploys the stage ECS task. Direct pushes are not allowed; changes land via PR from `develop`.

### `develop`

The integration branch. Feature branches PR into `develop`; once merged, the change is part of the next release. New contributor work *always* branches off `develop`, never off `main`.

### `ava-main-v1`

Archive of the project's first iteration, before the backend was rewritten in 2024. Preserved on the upstream repo for historical reference, useful if you ever need to look at how the original team implemented a feature (e.g., the original super-linter setup). Not intended for new work.

## Feature branch workflow

1. Branch off `develop`:
    ```sh
    git checkout develop
    git pull
    git checkout -b <short-description>
    ```

2. Work, commit, and push to your fork:
    ```sh
    git push origin <short-description>
    ```

3. Open a PR against `develop` from the GitHub UI. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for review expectations and the fork-based contribution model.

4. Once merged, delete the feature branch. If the repo's "Automatically delete head branches" setting is enabled, GitHub does this on merge; otherwise delete it manually.

5. Periodically (when `develop` accumulates work that's been verified on stage), open a PR from `develop` into `main` to ship a release.

## Naming

Branch names use a `<type>/<short-description>` shape; the description is kebab-case. The type is required; pick the one that best fits the work:

| Prefix | When |
|--------|------|
| `feat/` | New feature, new endpoint, new component |
| `fix/` | Bug fix |
| `chore/` | Dependency bumps, tooling, CI, build, formatting |
| `docs/` | Documentation only |
| `refactor/` | Restructuring without behavior change |

Aim for descriptive but compact (3-5 words in the description). Long branch names get truncated in the UI.

Examples: `feat/auth-stage1`, `fix/dropdown-keyboard-nav`, `chore/bump-django`, `docs/api-reference`, `refactor/extract-skill-matrix`.

The convention applies to new branches. Branches that predate the convention are grandfathered; renaming live PRs to fit the new shape is more churn than it's worth.

## Why the three-branch model

Keeping `develop` as a separate integration branch lets the team batch verified changes for release without blocking ongoing PRs. `main` always reflects what's deployed; `develop` reflects what's being prepared. For a small team this is more ceremony than a single-trunk model would need, but it's the convention HfLA volunteers expect across projects.

## Resources

- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/), the original git-flow article
- [Git documentation: branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

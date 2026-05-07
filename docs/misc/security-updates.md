# Security Updates

CivicTechJobs subscribes to GitHub's automated security alerting (Dependabot). When a vulnerability is detected in a dependency, GitHub surfaces a banner on the repo and Dependabot may automatically open a PR with the suggested update.

## Process

1. **Triage.** When you see a security alert, check the [issues list](https://github.com/hackforla/CivicTechJobs/issues?q=is%3Aissue+label%3Asecurity) and Dependabot's PRs to see if it's already being handled. If not, file an issue describing the vulnerability, label it `security`, and link the GitHub alert.

2. **Verify before merging.** Dependabot's auto-PRs **should not be merged blind**. Pull the branch locally, run the test suite, and exercise the relevant code path to confirm the update doesn't break anything. Many vulnerability alerts are in transitive deps with no actual exploit path in our usage.

3. **Document.** When merging a security update, note in the PR description what was vulnerable, what was updated, and how you verified. This makes future audits easier and gives reviewers context.

## Coordinating with the maintainers

If a vulnerability is high-severity (CVSS 9+) or actively being exploited, ping in `#civictechjobs-dev` before opening the PR so a maintainer can prioritize review.

For lower-severity issues, the standard PR review flow applies.

# GitHub Repo Branch Structure

## Summary

There are three protected branches in our github repo: `main`, `develop`, and `ava-main-v1`.

The two core branches we will use to develop with are  `main` and `develop`. We will use a multi-branching model to collaborate effectively. You can read more about it here: [A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/).

The branch `ava-main-v1` is archived for historical purposes.

## What is the V1 branch?

To understand the branch `ava-main-v1`, we need a quick background on the history of this project for context.

Ava Li was the first Technical Project Lead of CivicTechJobs. She initiated the project and wrote all the frontend and backend code. Before she left, she migrated the entire project from plain python to poetry. This broke a lot of things in the backend.

Jimmy Juarez was the next Technical Project Lead. Since the backend wasn't working, he decided to reset the entire django backend. This split the codebase from version 1: pre backend reset, to version 2: post backend reset.

Ava and her team's pre-backend reset code is preserved in the branch `ava-main-v1`. This way their work is not lost, and if we ever need to implement a feature they already did before, we can always look back and study their code. This is the purpose of `ava-main-v1`.

For example, they had implemented a super linter for python and javascript, which does not exist in the current code base. So if we ever want to do that, we can see what they did to deliver it.

## Additional Resources

[A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/)
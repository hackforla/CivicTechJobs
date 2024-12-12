# GitHub Repo Branch Structure

## Summary

There are three protected branches in our github repo: `main`, `develop`, and `ava-main-v1`.

The two core branches we will use to develop with are  `main` and `develop`. We will use a multi-branching model to collaborate effectively. You can read more about it here: [A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/).

The branch `ava-main-v1` is archived for historical purposes.

## What are the `main` and `develop` branches?

The `main` branch is the **core branch in which production code resides**. This is the branch that houses the code that will get deployed to the production environment and delivered to real live users. It is extremely important to make sure this branch is 100% functional, tested and bug-free.

The `develop` branch is the branch we use to stage new features and changes to the code, before pushing it to production. We use this branch to test new code inside a staging environment before delivering it to production.

Developers should create feature branches off of the `develop` branch, then make a pull request from that new feature branch into the `develop` branch. For example: `feature/mybutton-component` gets branched off `develop`, worked on in a dev's local machine, then pushed up the origin repo, and finally pull requested back into the `develop` branch.

Once all the new code in the `develop` branch passed all checks and tests, it should be merged into the `main` branch. This will finally deliver the new code to end users.

If you are still confused, please read the link or watch the youtube video in Additional Resources below for more details. It explains everything much more clearly. Also feel free to ask anyone on the team how it all works.

## What is the Ava-main-V1 branch?

To understand the branch `ava-main-v1`, we need a quick background on the history of the CivicTechJobs project for context.

Ava Li was the first Technical Project Lead of CivicTechJobs. She initiated the project, and she worked with her team to write all the frontend and backend code. Before she left, she migrated the entire project from plain Python to Poetry. This broke a lot of things in the backend.

Jimmy Juarez was the next Technical Project Lead. Since the backend was non functional, Jimmy made the decision to reset the entire Django backend and rebuild it from scratch. This split the codebase from "Version 1: pre backend reset", to "Version 2: post backend reset".

Ava and her team's pre-backend reset code is preserved in the branch `ava-main-v1`. This way their work is not lost, and if we ever need to implement a feature they already did before, we can always look back and study their code. This is the purpose of `ava-main-v1`.

For example, they had implemented a super linter for Python and Javascript, which does not exist in the current code base. So if we ever want to do that, we can see what they did to deliver it.

## Additional Resources

[Getting started with branching workflows, Git Flow and GitHub Flow - YouTube](https://www.youtube.com/watch?v=gW6dFpTMk8s)<br>
[A successful Git branching model » nvie.com](https://nvie.com/posts/a-successful-git-branching-model/)<br>

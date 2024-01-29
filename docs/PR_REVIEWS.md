# *UNDER CONSTRUCTION*

# PR REVIEWS

With **GitHub Actions** and **EAS**, we can automate the PR reviews. This is especially useful to not only read code but actually test it on a real device.

## How it works

When a PR is opened, GitHub Actions will run the `eas build` command to build the app. If the build is successful, it will upload the build to EAS. EAS will then send a link to the PR with the build. The reviewer can then download the build and test it on a real device.

## How to use it


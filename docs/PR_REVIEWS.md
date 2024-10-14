# PR REVIEWS

With **GitHub Actions** and **EAS**, we can automate various aspects of the PR review process to enhance efficiency. This includes providing automated _builds_, _updates_, _linting_, and _testing_, while allowing reviewers to test the app on real devices. Additionally, _auto-labeling_ ensures that PRs are categorized effectively.

**Table of Contents**

- [Key Features of PR Reviews Automation](#key-features-of-pr-reviews-automation)
- [GitHub Actions Workflows](#github-actions-workflows)
  - [EAS Build / EAS Update Automation](#eas-build--eas-update-automation)
    - [Available Labels for Actions](#available-labels-for-actions)
  - [Auto-labeling](#auto-labeling)
    - [How It Works](#how-it-works)
  - [Code Quality Checks](#code-quality-checks)
    - [Key Benefits](#key-benefits)

## Key Features of PR Reviews Automation

- **PR Template**: Structured format to ensure all necessary information is included in the PR description.
- **EAS Build and Update**: Automates building or updating the app for testing purposes.
- **GitHub Actions**: Automates build creation, testing, linting, and type-checking workflows.
- **Auto-labeling**: Automatically categorizes PRs based on their content.
- **Slack Notifications**: Notifies relevant channels if builds or checks fail.

## GitHub Actions Workflows

### EAS Build / EAS Update Automation

When a PR is opened, **GitHub Actions** triggers a comment that suggests either building the app using **EAS build** or updating the app using **EAS update** based on the nature of the changes. The correct action is selected using labels.

> [!IMPORTANT]
> Only choose **EAS Update** if the PR does not introduce any native code changes or updates to dependencies. For instance, UI or JavaScript-only updates can use **EAS Update**. However, for PRs involving changes to native modules, third-party libraries, or configurations, you must perform a fresh **EAS Build**.

#### Available Labels for Actions

- `eas-build-android:dev`: Triggers a build for the **Android app** with **EAS Build** with the `dev` profile.
- `eas-build-ios:dev`: Triggers a build for the **iOS app** with **EAS Build** with the `dev` profile.
- `eas-build-all:dev`: Triggers a build for both **Android and iOS apps** with **EAS Build** with the `dev` profile.
- `eas-update`: Initiates an **over-the-air (OTA) update** using **EAS Update**.

> [!INFO]
> The reviewer should check the labels to determine the appropriate action to take for accessing the app for testing.

### Auto-labeling

The **auto-labeling** GitHub Action helps streamline the review process by automatically adding appropriate labels to each PR.

#### How It Works

The [PR auto-labeling workflow](/.github/workflows/pr-auto-labeling.yml) is working as follows:

- Every time a PR is opened or updated (e.g., new commits), the action parses the commit messages to apply relevant labels.
- It will scan for predefined keywords such as `feature`, `fix`, `bug`, `chore`, `test`, etc., and apply appropriate labels to the PR.

This allows both the development team and reviewers to quickly understand the scope of the PR without manually assigning labels.

### Code Quality Checks

To ensure code quality, **GitHub Actions** runs a verification process every time a PR is opened or synchronized. This process ensures that the code adheres to standards by running a series of checks, including linting, type-checking, formatting, and running tests.

The [Verify workflow](/.github/workflows/verify.yaml) is triggered on pushes to the dev branch and on pull requests targeting the dev branch.

#### Key Benefits

- **Automated Quality Assurance**: Ensures that each PR passes basic quality checks before review.
- **Early Detection of Issues**: Helps catch potential issues, such as type errors or failing tests, early in the development process.
- **Slack Notifications**: Automatically alerts the team of any failures, reducing manual monitoring of the pipeline.

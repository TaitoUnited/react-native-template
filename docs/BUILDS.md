# Builds

We use [Expo Application Services (EAS)](https://expo.dev/eas) to build the app. EAS enables us to seamlessly create builds for different environments, such as **dev**, **test**, **staging**, and **production**.

Depending on your project’s needs, there are several ways to trigger the build process.

Table of Contents

- [Building from CLI](#building-from-cli)
- [Manual GitHub Actions](#manual-github-actions)
- [Automatic EAS Github Actions](#automatic-eas-github-actions)
- [Build configuration](#build-configuration)

## Building from CLI

To trigger a build from the **CLI**, run the following custom script:

```bash
npm run eas:build
```

This script helps generate the necessary build command and triggers the build process based on the configuration defined in your project.

## Manual GitHub Actions

You can also trigger builds using **GitHub Actions** for the **Test**, **Staging**, and **Production** environments. To do so:

1. Navigate to the [GitHub Actions tab](https://github.com/TaitoUnited/react-native-template/actions).
2. Select the appropriate workflow and click the _“Run workflow”_ button.
3. Choose the branch you want to build from, the platform (iOS or Android), and whether or not to notify the client via email.

The GitHub Action workflows for building are located in `.github/workflows/build-*.yml`.

> [!NOTE]
> When building for **production**, you will also be prompted to decide whether you want to automatically submit the build to the app stores.

## Automatic EAS Github Actions

EAS also allows for automatic builds whenever code is merged into key branches (`dev`, `test`, `stag` or `prod`). This eliminates the need to manually trigger builds.

> [!NOTE]
> When code is merged into the **prod** branch, the build will automatically be submitted to the app stores (Google Play and Apple App Store).

You can update the automatic Github Actions configuration in the [EAS GitHub settings](https://expo.dev/accounts/taito-united/projects/taito-template/github).

## Build configuration

The build configuration is defined in the `eas.json` file. This file contains the specific settings and profiles for each environment.

You can customize your build settings by modifying the `eas.json` file.

For more details on how to customize your build process, refer to the [CICD documentation](./CICD.md).

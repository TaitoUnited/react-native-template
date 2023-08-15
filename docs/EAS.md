# EAS

We use EAS to build our app and distribute it to testers and to the stores.

## Prerequisites

If you are not a member of the Taito United team in EAS, please contact *julien.texier@taitounited.fi*.

Once a member, connect to [EAS dashboard](https://expo.dev/accounts/taito-united) and create an account or login.


## Setup EAS 

Go to **All Projects** then click on **Create project**. Choose the name of your project.

Run the second command suggested from Expo. It should install the EAS CLI and try to init the `eas.json` in your project. As we have already done it, it will fail.

Copy the project id from the suggested command `eas init --id <<YOUR_PROJECT_ID>>` and manually change the following in `app.config.ts` with your project id:

```
eas: {
  projectId: 'YOUR_PROJECT_ID',
},
```

Make sure that the owner of the project (if different than the default **taito-united**) is defined correctly in `app.config.ts`

### Make your first build

We are using **Github Actions** to create the builds, but we need to run the first ones using the *eas cli* to be able to generate the credentials.

Run the script `android:build:test` for android and `ios:build:test` for ios.

We **highly suggest** to let EAS generate the credentials for you. You can also do it manually by following the instructions here: https://docs.expo.dev/app-signing/local-credentials/

For **Android**, it will suggest to create a new keystore.

For **iOS**, it will ask you to login to your Apple Developer account. It will then ask you to select a team and create a new distribution certificate and provisioning profile.  Make sure you have the right permissions to create certificates and provisioning profiles.

Once the build is done, you can download the artifacts from the **Builds** tab in EAS dashboard and see the generated credentials in the **Credentials** tab.

You can now use **Github Actions** to create the future builds.

### Configure Github Actions

To get the Github Actions working, you need to add a few secrets to your repository.

All the secrets are stored in the **Shared** 1Password vault.

Go to your repository settings and click on **Secrets**. Add the following secrets:

- `EXPO_TOKEN` (the token we use to authenticate to Expo as the project owner)
- `SENDGRID_GITHUB_ACTION_API_KEY` (the api key we use to send emails to testers)
- `SLACK_WEBHOOK` (the webhook we use to send messages to Slack)

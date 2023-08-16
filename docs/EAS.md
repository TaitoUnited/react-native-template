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

For **iOS**, it will ask you to login to your Apple Developer account. It will then ask you to select a team and create a new distribution certificate and provisioning profile. If you are building using the *Taito United* team, do not create a new certificate but reuse the one they suggest. Make sure you have the right permissions to create certificates and provisioning profiles.

Once the build is done, you can download the artifacts from the **Builds** tab in EAS dashboard and see the generated credentials in the **Credentials** tab.

You can now use **Github Actions** to create the future builds.

### Configure Github Actions

To get the Github Actions working, you need to add a few secrets to your repository.

All the secrets are stored in the **Shared** 1Password vault.

Go to your repository settings and click on **Secrets**. Add the following secrets:

- `EXPO_TOKEN` (the token we use to authenticate to Expo as the project owner)
- `SENDGRID_GITHUB_ACTION_API_KEY` (the api key we use to send emails to testers)
- `SLACK_WEBHOOK` (the webhook we use to send messages to Slack)


You should change the following in `.github/workflows/common-config.yml`:

- `SLACK_CHANNEL`: the name of the channel where you want to send the slack notifications about the builds
- The list of emails of the clients/testers that should receive the email notifications about the builds whenever you select the option (so they can download the new app version from EAS) - see below

```
strategy:
      matrix:
        to-emails:
          # Add the client emails here
          - julien.texier@taitounited.fi
          - teemu.taskula@taitounited.fi
```

You can customize the email as you wish by changing the following attributes from the job named `📧 Notify client`

- `subject`: the subject of the email
- `from-email`: the email address of the sender
- `markdown-body`: the body of the email (you can use markdown)

## Add testers' devices to EAS

In order to distribute the app to testers, we need to add their devices to EAS.

Run `eas device:create` and connect to the relevant team. Select the **Website - generates a registration URL to be opened on your devices** option.

Share the QR code and/or the link to the testers/client. They will need to open the link on their device and follow the instructions to install the profile.

*Note:* Using the website portal prevents you from giving a name to the device, which can be problematic if you need to update/remove some devices later on. You can always use the `eas device:rename --udid=<<UDID>>` command to add a name manually to a specific device.

The manual way to add a device is to run `eas device:create` and select the **Input - allows you to type in UDIDs (advanced option)** option. You will need to enter the UDID of the device and a name. UDID is not very easy to get from clients, so we suggest to use the website portal instead.

You can check the list of registered devices by running `eas device:list` to make sure that the devices are correctly registered.

Once you have correctly added the devices to the team, you need to resign your latest build to include the new devices in the provisioning profile, so the app can be installed on those new devices.

You can do it by running `eas build:resign --profile (test|stag|prod)`, select iOS, the relevant team and edit the devices selection. This will create a new build with the same credentials as the previous one but with the new devices added to the provisioning profile.

**Important**

EAS CLI doesn't fetch the devices from the Apple Developer portal. EAS maintains its own list on the servers. Therefore we **do not recommand** handling devices directly in the Apple portal but instead always use `eas device:create` and resign your latest build to include the new devices in the provisioning profile (see above).

## FAQ

### Unable to install on iOS - Integrity could not be verified

If your client gets a "Unable to install <<YOUR_APP_NAME>>. This app cannot be installed because its integrity could not be verified", it means that his/her device is not registered in EAS. Make sure that the device is registered and that the profile is installed correctly (see above).

### Unable to install on Android - Unsafe app blocked

If your client gets a "Unsafe app blocked", he/she needs to click "More details" and then "Install anyway". This is because the app is not signed by Google Play Store. It is safe to install the app they received from us.

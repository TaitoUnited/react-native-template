# Publishing to stores

We use EAS to publish to the stores. You can read the [Expo documentation](https://docs.expo.dev/deploy/submit-to-app-stores/) for more information.

## Handle the app's metadata

> While it is currently possible to handle most of the app's metadata directly within our codebase with EAS metadata for iOS, it is still recommended to handle the metadata directly in the App Store Connect and Google Play Console until the feature is fully supported for both platforms.

### iOS

#### App Store Connect

You can update the app's metadata in the App Store Connect. You can find the Apple documentation [here](https://help.apple.com/app-store-connect/#/devd3f0a8e6b).

> Tip: Handling screenshots is a bit tricky as you need a lot of different sizes. It is recommended to use free screenshot generators like [this one](https://appscreens.com) (has not been tested yet).

#### EAS Metadata

> **Note:** You still need to add the screenshots manually in the App Store Connect.

EAS uses the `store.config.json` file to generate the app's metadata. You can find the Expo documentation [here](https://docs.expo.dev/eas/metadata/schema/)

The main categories to update are:

- `info`: general information about the app that will be displayed in the App Store (name, description, keywords, etc.)
- `categories`: the categories of the app
- `review`: the information that is needed for the review process (demo credentials, notes, etc.)

> Tip: You can use the [Expo VSC extension](https://github.com/expo/vscode-expo#readme) to help you with the metadata.

Once you have updated the metadata, you can run `eas metadata:push` to send it to the app stores. You can check the status of the metadata in the **Metadata** tab in EAS dashboard.

### Android

#### Google Play Console

You can update the app's metadata in the Google Play Console. You can find the Google documentation [here](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en).

#### EAS Metadata

Currently, EAS Metadata is not supported for Android. We need need to manually update the metadata in the Google Play Console.

## Submitting the app to the app stores

### iOS

> IMPORTANT: For EAS Submit to be able to submit for you, you need to create an API key for the Apple Developer Portal. Please follow the [tutorial](https://github.com/expo/fyi/blob/main/creating-asc-api-key.md) to create the API key before your first submission. Don't forget to add the API key to the project's 1Password vault.

Once the app is ready to be submitted, you can run the **submit** script by runnning `npm run eas:submit` and select the platform `iOS` to submit the app to the App Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

### Android

> NOTE: Before being able to submit your builds automatically, you have to upload your app manually at least once. This is a limitation of the Google Play Store API. Follow the instructions [here](https://github.com/expo/fyi/blob/main/first-android-submission.md) to upload your app manually.

> IMPORTANT: For EAS Submit to be able to submit for you, you need to create a Google Service Account. Please follow the [tutorial](https://github.com/expo/fyi/blob/main/creating-google-service-account.md) to create the Google Service Account before your first submission. Don't forget to add the JSON key to the project's 1Password vault.

Once the app is ready to be submitted, you can run the **submit** script by runnning `npm run eas:submit` and select the platform `Android` when requested to submit the app to the Google Play Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

### All (iOS & Android)

Once the app is ready to be submitted, you can run the **submit** script by runnning `npm run eas:submit` and select the platform option `All` to submit the app to both the App Store and the Google Play Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

## FAQ

### Unable to install on iOS - Integrity could not be verified

If your client gets a `Unable to install <<YOUR_APP_NAME>>`. This app cannot be installed because its integrity could not be verified", it means that his/her device is not registered in EAS. Make sure that the device is registered and that the profile is installed correctly (see above).

### Unable to install on Android - Unsafe app blocked

If your client gets a "Unsafe app blocked", he/she needs to click "More details" and then "Install anyway". This is because the app is not signed by Google Play Store. It is safe to install the app they received from us.

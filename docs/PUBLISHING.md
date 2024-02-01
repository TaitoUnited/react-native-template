# Publishing to stores

We use EAS to publish to the stores. You can find the Expo documentation [here](https://docs.expo.dev/archive/classic-updates/building-standalone-apps/#7-update-your-app).

## Handle the app's metadata

### iOS

EAS uses the `store.config.json` file to generate the app's metadata. You can find the Expo documentation [here](https://docs.expo.dev/eas/metadata/schema/)

The main categories to update are:

- `info`: general information about the app that will be displayed in the App Store (name, description, keywords, etc.)
- `categories`: the categories of the app
- `review`: the information that is needed for the review process (demo credentials, notes, etc.)

**Note:** You still need to add the screenshots manually in the App Store Connect.

Once you have updated the metadata, you can run `eas metadata:push` to send it to the app stores. You can check the status of the metadata in the **Metadata** tab in EAS dashboard.

### Android

Currently, EAS Metadata is not supported for Android. We need need to manually update the metadata in the Google Play Console.

## Submitting the app to the app stores

> Note: This section is under construction. We need to test the submission process with a real project.

### iOS

Once you have updated the metadata and the app is ready to be submitted, you can run `eas submit --platform ios` to submit the app to the App Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

### Android

To be able to submit, we first need to go through that tutorial: <https://github.com/expo/fyi/blob/main/creating-google-service-account.md>

Once you have updated the metadata and the app is ready to be submitted, you can run `eas submit --platform android` to submit the app to the Google Play Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

### All (iOS & Android)

Once you have updated the metadata and the app is ready to be submitted, you can run `eas submit --platform all` to submit the app to both the App Store and the Google Play Store. You can check the status of the submission in the **Submissions** tab in EAS dashboard.

## FAQ

### Unable to install on iOS - Integrity could not be verified

If your client gets a "Unable to install <<YOUR_APP_NAME>>. This app cannot be installed because its integrity could not be verified", it means that his/her device is not registered in EAS. Make sure that the device is registered and that the profile is installed correctly (see above).

### Unable to install on Android - Unsafe app blocked

If your client gets a "Unsafe app blocked", he/she needs to click "More details" and then "Install anyway". This is because the app is not signed by Google Play Store. It is safe to install the app they received from us.

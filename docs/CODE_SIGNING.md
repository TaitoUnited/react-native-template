# Code Signing

> For any projects started before 2024, it is very likely that it is not Expo based. If that is the case for you, you need to manually handle the certificates and provisioning profiles. Check the [legacy projects section](#legacy-projects) for more information.

We use EAS to build and sign the app. You can find the documentation [here](https://docs.expo.dev/deploy/build-project/#app-signing-credentials).

## New app

We **highly suggest** to let EAS generate the credentials for you. Simply run the build script and select auto-submit option or run the submit script. Both will ask you if you want to let EAS generate the credentials for you.

> Note: We let EAS automatically increment the version code and build number. If you want to do it manually, you can do it in the `app.json` (check the [documentation](https://docs.expo.dev/build-reference/app-versions/#local-version-source)).

## Existing app

If you are using EAS for the first time on an existing app, you can use the credentials in use in Google Play Console or App Store Connect. You will need to upload them manually to EAS in _Project settings_ -> _Credentials_. Follow the instructions during the upload. The credentials should be found in the password vault of the project.

> Note: We let EAS automatically increment the version code and build number. You need to run `eas build:version:set -e prod` to set the current version code and build number, matching the one in the store. That way, EAS will increment the version code and build number correctly.

## Code signing with EAS

### Android

For **Android**, it will suggest to create a new keystore.

### iOS

For **iOS**, it will ask you to login to your Apple Developer account. It will then ask you to select a team and create a new distribution certificate and provisioning profile. If you are building using the _Taito United_ team, do not create a new certificate but reuse the one they suggest. Make sure you have the right permissions to create certificates and provisioning profiles.

### Legacy projects

If you are working on a project that was started before 2024, you will need to manually handle the certificates and provisioning profiles.

## Manual code signing for iOS

> Important: it is impossible to generate iOS certificates and provisioning profiles without a Mac and an Apple Developer account.

> Note: you can find this step-by-step guide with screenshots in the [Legacy Code Signing Tutorial Screenshots](https://github.com/TaitoUnited/react-native-template/wiki/Legacy-Code-Signing-Tutorial-Screenshots) on the repo's Wiki.

1. Go to the certificates section of the [Apple Developer portal](https://developer.apple.com/account/resources/certificates/list) and click on _Create a Certificate_.

2. Select _Apple Distribution_ and click _Continue_.

3. Follow the [instructions](https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request) to create a certificate signing request (CSR) using Keychain Access on your Mac.

4. Upload the CSR to the Apple Developer portal and click _Continue_.

5. Download the certificate and double-click it to install it in your Keychain.

6. Open Keychain Access and find the certificate you just installed. Right-click it and select _Export_.

7. Save the certificate as a .p12 file and make sure to set a password. You should use the password generator from 1Password to set a strong one. Make sure to save it there as well in case we need it in the future.

8. Go to the provisioning profiles section of the [Apple Developer portal](https://developer.apple.com/account/resources/profiles/list) and click on _Create a Profile_.

9. You need an Ad Hoc profile for distributing the app to testers and a Distribution profile for submitting the app to the App Store. Select the appropriate one and click _Continue_.

10. Select the app ID and click _Continue_.

11. Select the certificate you just created and click _Continue_.

12. Name the profile and click _Continue_.

13. Download the profile and double-click it to install it in Xcode.

14. If you are using AppCenter, you need to update the branches to use the new certificates and provisioning profiles. If you haven't already, you can download the provisioning profile from the Apple Developer portal and the certificate from 1Password. The password should be there as well. Select your branch and click on the tool icon on the right. Then click on _Sign_ and upload the files. Click on _Save & build_ to make sure it works properly.

> Note: test branches (e.g. `test`, `stag`) should use the Ad Hoc profile and the production branch (e.g. `master`) should use the Distribution profile.

## Manual code signing for Android

When you upload your first release to Google Play you will see a notice about "App signing by Google Play" and "Google is protecting your app signing key". This is the default behavior and requires no action on your behalf except to press "Continue".

More information can be found [here](https://docs.expo.dev/app-signing/app-credentials/#app-signing-by-google-play).

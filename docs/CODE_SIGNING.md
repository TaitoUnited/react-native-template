# Code Signing

We use EAS to build and sign the app. You can find the documentation [here](https://docs.expo.dev/deploy/build-project/#app-signing-credentials).

We **highly suggest** to let EAS generate the credentials for you. You can also do it manually by following the instructions [here](https://docs.expo.dev/app-signing/local-credentials/)

## Code signing with EAS

### Android

For **Android**, it will suggest to create a new keystore.


### iOS

For **iOS**, it will ask you to login to your Apple Developer account. It will then ask you to select a team and create a new distribution certificate and provisioning profile. If you are building using the *Taito United* team, do not create a new certificate but reuse the one they suggest. Make sure you have the right permissions to create certificates and provisioning profiles.




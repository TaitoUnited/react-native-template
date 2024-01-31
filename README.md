<p align='center'>
  <img src="docs/banner.jpg" alt="Taito React Native Template banner image"/>
<p/>

# React Native template

Project template for mobile app projects using React Native and Expo (via [Prebuild](https://docs.expo.dev/workflow/prebuild/)).

## Prerequisites

Make sure your development environment is setup and up-to-date by following this [guide](https://reactnative.dev/docs/environment-setup).

## Starting a new project

After you have cloned this repo to start a new mobile app project go through the following steps to customize the template based on your project needs.

### Update app metadata

Update the following fields in the `config/app.config.ts`:

1. `appId` (the id of the app, usually the bundle identifier. For example: `com.mynewapp`. Keep the `appIdSuffix` logic as it is)
2. `slug` (this is really not used but Expo requires it)
3. `name` (name of the app)
4. `scheme` (the url scheme used to open the app from a link)

### Setup CICD for building and distributing the app

Follow this [CICD guide](/docs/CICD.md).

### Setup a design system

1. If you don't have a design system yet clone the [Design System Template](https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template) project in Figma.
2. Update the design tokens (colors, typography, etc.) to match your project design and branding.
3. Add your own app icon in the **App Icon & Splash** page. Use the import areas to import the iOS and Android icons (they need different sizes)
4. Run `npm run design-system:sync` in the terminal.

_A more detailed guide on how to setup a design system can be found [here](/docs/DESIGN_SYSTEM.md). For fonts & assets check [this](/docs/ASSETS.md)._

### Setup publishing to stores

Follow this [Publishing guide](/docs/PUBLISHING.md).

### Setup app reviews

> Context: to counter one 1 ⭐ rating we need 7 x 5 ⭐ to have an average of 4.5 ⭐.

If the app is customer facing and published to App Store or Google Play you should setup app reviews. This allows users to rate the app and give feedback. The reviews are then visible in the store and can be used to improve the app.

1. Setup app reviews in App Store Connect and Google Play Console.
2. Update the `(dev|test|stag|prod.config.ts` with the app store and google play urls. (only prod will allow you to actually rate the app, the rest is for testing purposes)
3. Mode the `StoreReview` component to a more appropriate place in your app.
4. Make sure to collect the user feedback in the backend or have it sent to you via email or some other channel.

> Note: It’s crucial to time well the moment when we ask a user for their feedback. It’s best to ask for a review after a positive action. For example, after completing a level, uploading a post, or making a purchase. As the template is basically a blank app, this guideline is not respected. Move the review request to a more appropriate place in your app.

**Important**: It’s also important to be mindful of how often we ask for review. The App Store only lets you do it **3 times a year**. Make sure not to exceed this limit. The current implementation makes sure we don't ask for review after the user has been to the rating modal (We cannnot know if they actually submitted their review or not). If you want to ask for review more often you need to change the logic in the `StoreReview` component.

> Note: currently we use async storage to store when the last review was done. This means that if the user uninstalls the app and reinstalls it, we will ask for review again. Ideally we would store this information in the backend.

More information on how to setup app reviews can be found [here](https://docs.expo.dev/versions/latest/sdk/storereview/).

## Project documentation

- [Development](/docs/DEVELOPMENT.md)
- [Assets (icons, fonts, etc.)](/docs/ASSETS.md)
- [Design System](/docs/DESIGN_SYSTEM.md)
- [Localization](/docs/LOCALIZATION.md)
- [PR Reviews](/docs/PR_REVIEWS.md)
- [CICD](/docs/CICD.md)
- [Code Signing](/docs/CODE_SIGNING.md)
- [Publishing to stores](/docs/PUBLISHING.md)
- [Publishing updates to stores](/docs/UPDATES.md)
- [Testing](/docs/TESTING.md)
- [Analytics](/docs/ANALYTICS.md)
- [Crash reporting](/docs/CRASH_REPORTING.md)

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
3. Add your own app icon and splash screen in the **App Icon & Splash** page.
4. Run `npm run design-system:sync` in the terminal.

*A more detailed guide on how to setup a design system can be found [here](/docs/DESIGN_SYSTEM.md). For fonts & assets check [this](/docs/ASSETS.md).*

### Setup publishing to stores

Follow this [Publishing guide](/docs/PUBLISHING.md).

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

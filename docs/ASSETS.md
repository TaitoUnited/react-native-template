# Assets

## Fonts

The fonts are generated from the Figma project.

They are stored in the `src/design-system/fonts` folder. They are loaded from the `src/utils/font.ts` file in the `useAppReady` function used in `init.ts`.

To update the fonts you need to go to the `Fonts` page in your Figma project (for example, [here](https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template?type=design&node-id=484-513&mode=design&t=nA3zndYafwTldGs8-0)). Edit the fonts there, respecting the guidelines explained in the page. Once you are done, you can simply run the script `design-system:sync` to update the fonts in the app.

## App icon & Splash screen

The app icon and splash screen are generated from the Figma project.

To update the app icon and splash screen you need to go to the `App Icon & Splash` page in your Figma project (for example, [here](https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template?type=design&node-id=484-513&mode=design&t=nA3zndYafwTldGs8-0)). Edit the assets there, respecting the guidelines explained in the page. Once you are done, you can simply run the script `design-system:sync` to update the assets in the app.

## Adding new assets

To add new assets to the app, you need to add them to the `src/assets` folder. You can then import them in your components or screens.

It is recommended to separate them in folders based on their type (e.g. `images`, `animations`, `sounds`, etc.).

### FAQ

#### How to update the splash screen on iOS Simulator?

On iOS Simulator the splash screen is cached which can cause issues when you are making modifications to the splash screen assets. In order to have the splash screen updated you need to:

1. Uninstall the app in the simulator
2. Restart the simulator (`Device` → `Restart`)

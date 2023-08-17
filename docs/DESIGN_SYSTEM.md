# Design System

We use [Figmage](https://github.com/Temzasse/figmage#readme) to generate our design system from Figma. (Developed by our one and only [Temzasse](https://github.com/Temzasse) 🎉⚡️)

## How to connect your project to Figma

1. Create a new Figma project based on the [Design System Template](https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template?type=design&node-id=0%3A1&mode=design&t=vP88jG4uILmITxAE-1) or join the existing Figma project for your app.

2. Get your Figma API token from [here](https://www.figma.com/developers/api#access-tokens).

3. Get the file id of the Figma file. You can find it in the URL of the Figma file. For example, if the URL is `https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template`, then the file id is `vEO1Adp6j0nHiiq9BiexE1`.

4. Paste the access token and the file id in the `.env.figma` file located in the `config` folder of your project.

    ```
    FIGMA_ACCESS_TOKEN="xxxxx-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"
    FIGMA_FILE_ID="xxxxxxxxxxxxxxxxxxxxxx"
    ``````

## How to generate the design system

You can generate the design system by running the script `design-system:sync` in the root of your project.

This command runs the following scripts, that you can run individually if you want to:

- `design-system:tokenize`: This script will tokenize the Figma file and generate a `tokens.json` file in the `src/design-system` folder of your project. This file contains all the tokens of the Figma file.

- `design-system:`: This script will generate the design system code based on the `tokens.json` file. It will generate files in the `src/design-system` folder of your project that you can then use in your app.

- `design-system:format`: This script will format the `design-system.ts` file using [Prettier](https://prettier.io/).


## How to use the design system

We use a [UI Kit](../src/components/uikit/index.ts) to make reusable components that we use in the app. Those UI Kit components are were most of the design system is used. It means that we should always use the UI Kit components (text, buttons etc.) so that a change in the design in Figma will be immediately available in the app after running the sync command.

### How to add a new token

1. Add the token in Figma.
2. Run the `design-system:sync` command.
3. Use the token in the UI Kit components.

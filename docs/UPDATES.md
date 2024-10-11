# Publishing updates

With **Expo Updates**, we can publish updates to the app without having to go through the app stores. This is great for quick fixes and small updates. However, if we want to publish a new version of the app, we need to go through the app stores (see the [Publishing guide](./PUBLISHING.md)).

You can find the Expo documentation [here](https://docs.expo.dev/versions/latest/sdk/updates/) for more information.

## Publishing an update

We built a custom script to make it easier to publish updates. You can run the script `eas:update` to publish an update to the app.

The script will ask you for which environment you want to publish the update to (e.g. **Testing** or **Production**) and for a description of the update (e.g. _"Fixing the login issue"_), which will be helpful to know what was changed in the update when looking at the EAS dashboard.

> Note: EAS Updates does not read EAS secrets the way EAS builds do. For that reason, the script will read your `.env` file to give the necessary information to publish the update by appending it to the command. Make sure to have the `.env` file in the root of your project with up-to-date information.

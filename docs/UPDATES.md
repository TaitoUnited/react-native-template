# Publishing updates

With **Expo Updates**, we can publish updates to the app without having to go through the app stores. This is great for quick fixes and small updates. However, if we want to publish a new version of the app, we need to go through the app stores (see the [Publishing guide](./PUBLISHING.md)).

You can find the Expo documentation [here](https://docs.expo.dev/versions/latest/sdk/updates/) for more information.

## Publishing an update

You can run 


```sh
eas update --branch [branch] --message [message]

# Example
eas update --branch preview --message "Updating the app"
```
# Configuration

This file has been copied from [REACT-NATIVE-TEMPLATE](https://github.com/TaitoUnited/REACT-NATIVE-TEMPLATE/). Keep modifications minimal and improve the [original](https://github.com/TaitoUnited/REACT-NATIVE-TEMPLATE/blob/dev/CONFIGURATION.md) instead. Note that taito-cli is optional (see [usage without taito-cli](DEVELOPMENT.md#usage-without-taito-cli)).

Table of contents:

* [Prerequisites](#prerequisites)
* [Version control settings](#version-control-settings)
* [Basic project settings](#basic-project-settings)
* [Environments](#environments)
* [Services and secrets](#services-and-secrets)
* [Apple App Store](#Apple App Store)
* [Google Play](#google-play)

## Prerequisites

* [node.js](https://nodejs.org/)
* [react-native](https://facebook.github.io/react-native/) (see the [getting-started](https://facebook.github.io/react-native/docs/getting-started.html))
* Optional: [taito-cli](https://github.com/TaitoUnited/taito-cli#readme)

## Version control settings

`dev` branch should be set as the default branch. Run `taito open vc conventions` to see organization specific conventions.

* [ ] All done

## Basic project settings

1. Modify `taito-config.sh` if you need to change some settings. The default settings are ok for most projects.
2. Run `taito project apply`
3. Commit and push changes dev branch

* [ ] All done

## Environments

Define environments with the `taito_environments` setting in `taito-config.sh`. You can create an environment by running `taito env apply:ENV`. Examples for environment names: `f-orders`, `dev`, `test`, `stag`, `canary`, `prod`.

* [ ] All done

## Services and secrets

TODO

* [ ] All done

## Apple App Store

TODO

* [ ] All done

## Google Play

TODO

* [ ] All done

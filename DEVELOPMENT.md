# Development

This file has been copied from [REACT-NATIVE-TEMPLATE](https://github.com/TaitoUnited/REACT-NATIVE-TEMPLATE/). Keep modifications minimal and improve the original instead. Project specific conventions are located in [README.md](README.md#conventions).

Table of contents:

* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Structure](#structure)
* [Version control](#version-control)
* [Releases](#releases)
* [Configuration](#configuration)

## Prerequisites

* [node.js](https://nodejs.org/)
* [react-native](https://facebook.github.io/react-native/) (see the [getting-started](https://facebook.github.io/react-native/docs/getting-started.html))
* Optional: [taito-cli](https://github.com/TaitoUnited/taito-cli#readme)

## Quick start

> Taito-cli is optional. Most of the commands you can run with `npm` instead of `taito`.

Install linters and some libraries on host (add `--clean` for clean reinstall):

    taito install

Start packager (use the `--clean` flag in case of trouble):

    taito start

Run the app in a local emulator (add `--VARIANT` to run a specific variant):

    taito run:android
    taito run:ios

Run the app on a physical device connected to computer (add `--VARIANT` to run a specific variant):

    taito run:android --device
    taito run:ios --device

Run the app on a mobile application testing platform (add `--VARIANT` to run a specific variant):

    taito run:android --testing
    taito run:ios --testing

Show user accounts and other information that you can use to log in:

    taito info
    taito info:dev
    taito info:test
    taito info:stag
    taito info:prod

Show logs:

    taito logs:android
    taito logs:ios

Run tests:

    taito unit                              # run all unit tests
    taito unit: trip                        # run the 'trip' unit test (TODO)
    taito test                              # run all integration and end-to-end tests
    taito test: billing                     # run the billing test suite (TODO)

List all project related links and open one of them in browser:

    taito open -h
    taito open NAME

Link libraries:

    taito link

Cleaning:

    taito clean                             # Clean everything

Troubleshooting:

    taito --trouble

## Structure

Project specific conventions are defined in [PROJECT.md](PROJECT.md#conventions). See [server-template wiki](https://github.com/TaitoUnited/server-template/wiki/Structure) for some tips on how to design a modular directory structure.

## Version control

Development is done in dev and feature branches. See [server-template wiki](https://github.com/TaitoUnited/server-template/wiki/Version-control) for some additional information.

All commit messages must be structured according to the [Conventional Commits](http://conventionalcommits.org/) convention as application version number and release notes are generated automatically for production release by the [semantic-release](https://github.com/semantic-release/semantic-release) library.

You can manage environment and feature branches using taito-cli commands. Run `taito vc -h` for instructions. If you use git commands or git GUI tools instead, remember to follow the version control conventions defined by `taito vc conventions`.

## Releases

You can distribute a new release to a certain group of people by merging the changes to a correct branch. For example:

* `feature/FEAT`: Push changes to `feature/FEAT` branch. The release may be distributed to a group of people depending on App Center settings.
* `dev`: Push to dev branch. The dev release may be distributed to developers depending on App Center settings.
* `test`: Merge changes to test branch using fast-forward. The test release is typically distributed to testers for general testing.
* `stag`: Merge changes to stag branch using fast-forward. The staging release is typically distributed to customer for acceptance testing.
* `prod`: Merge changes to master branch using fast-forward. The production release is distributed to end users. Version number and release notes are generated automatically. TODO more instructions.

You can use `taito vc` commands to manage branches, and `taito deployment` commands to manage builds and deployments. Run `taito vc -h` and `taito deployment -h` for instructions.

See the [environments](#environments) chapter for instructions on configuring the environments.

## Configuration

### Version control settings

`dev` branch should be set as the default branch. Run `taito open conventions` to see organization specific conventions.

### Basic project settings

1. Modify `taito-config.sh` if you need to change some settings. The default settings are ok for most projects, but you might want to define some links with `link_urls`.
2. Run `taito project apply`
3. Commit and push changes dev branch

### Environments

Define environments with the `taito_environments` setting in `taito-config.sh`. You can create an environment by running `taito env apply:ENV`. Examples for environment names: `f-orders`, `dev`, `test`, `stag`, `canary`, `prod`.

### Services and secrets

TODO

### Apple App Store

TODO

### Google Play

TODO

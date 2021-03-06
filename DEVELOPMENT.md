# Development

This file has been copied from [REACT-NATIVE-TEMPLATE](https://github.com/TaitoUnited/REACT-NATIVE-TEMPLATE/). Keep modifications minimal and improve the [original](https://github.com/TaitoUnited/REACT-NATIVE-TEMPLATE/blob/dev/DEVELOPMENT.md) instead. Project specific conventions are located in [README.md](README.md#conventions). See the [taito-cli tutorial](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/README.md) for more thorough development instructions. Note that taito-cli is optional (see [usage without taito-cli](#usage-without-taito-cli)).

Table of contents:

* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Code structure](#code-structure)
* [Version control](#version-control)
* [Releases](#releases)
* [Usage without taito-cli](#usage-without-taito-cli)

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

## Code structure

Project specific conventions are defined in [README.md](README.md#conventions). See [code structure](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/b-code-structure.md) appendix of the [taito-cli tutorial](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/README.md) for some tips on how to design a modular directory structure.

## Version control

Development is done in dev and feature branches.

All commit messages must be structured according to the [Conventional Commits](http://conventionalcommits.org/) convention as application version number and release notes are generated automatically for production release by the [semantic-release](https://github.com/semantic-release/semantic-release) library.

You can manage environment and feature branches using taito-cli commands. Run `taito vc -h` for instructions. If you use git commands or git GUI tools instead, remember to follow the version control conventions defined by `taito vc conventions`. See [version control](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/04-version-control.md) chapter of the [taito-cli tutorial](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/README.md) for some additional information.

## Releases

You can distribute a new release to a certain group of people by merging the changes to a correct branch. For example:

* `feature/FEAT`: Push changes to `feature/FEAT` branch. The release may be distributed to a group of people depending on App Center settings.
* `dev`: Push to dev branch. The dev release may be distributed to developers depending on App Center settings.
* `test`: Merge changes to test branch using fast-forward. The test release is typically distributed to testers for general testing.
* `stag`: Merge changes to stag branch using fast-forward. The staging release is typically distributed to customer for acceptance testing.
* `prod`: Merge changes to master branch using fast-forward. The production release is distributed to end users. Version number and release notes are generated automatically. TODO more instructions.

You can use `taito vc` commands to manage branches, and `taito deployment` commands to manage builds and deployments. Run `taito vc -h` and `taito deployment -h` for instructions.

See the [environments](#environments) chapter for instructions on configuring the environments.

## Usage without taito-cli

TODO

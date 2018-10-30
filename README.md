# react-native-template

[//]: # (TEMPLATE NOTE START)

React-native-template is a project template for mobile applications implemented with React Native. Visual Studio App Center is used to build, test, release, and monitor the application. You can create a new project from this template by running `taito project create: react-native-template`. You can also migrate an existing non-taito-cli project by running `taito project migrate: react-native-template` in your project root folder.

[//]: # (TEMPLATE NOTE END)

Project specific documentation is located in [PROJECT.md](PROJECT.md). Remember to update it if you make changes related to architecture, integrations, or processing of personal data (GDPR).

Table of contents:

* [Links](#links)
* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Structure](#structure)
* [Version control](#version-control)
* [Releases](#releases)
* [Configuration](#configuration)

## Links

[//]: # (GENERATED LINKS START)

LINKS WILL BE GENERATED HERE

[//]: # (GENERATED LINKS END)

> You can update this section by configuring links in `taito-config.sh` and running `taito project docs`.

## Prerequisites

* [node.js](https://nodejs.org/)
* [react-native](https://facebook.github.io/react-native/) (see the [getting-started](https://facebook.github.io/react-native/docs/getting-started.html))
* Optional: [taito-cli](https://github.com/TaitoUnited/taito-cli#readme)

## Quick start

> PLATFORM=`ios` or `android`. VARIANT=`debug`, `release`, or some custom variant. NOTE: Most of the commands shown below are defined in `package.json`. Therefore you can run most of them with `npm` instead of taito-cli, if you like.

Install linters and some libraries on host (add `--clean` for clean reinstall):

    taito install

Start packager (use the `--clean` flag in case of trouble):

    taito start

Run the app in a local emulator (add `--VARIANT` to run a specific variant):

    taito run:PLATFORM

Run the app on a physical device connected to computer (add `--VARIANT` to run a specific variant):

    taito run:PLATFORM --device

Run the app on a mobile application testing platform (add `--VARIANT` to run a specific variant):

    taito run:PLATFORM --testing

Show user accounts and other information that you can use to log in:

    taito info
    taito info:dev
    taito info:test
    taito info:stag
    taito info:prod

Show logs:

    taito logs:PLATFORM

Run tests:

    taito unit                              # run all unit tests
    taito unit: trip                        # run the 'trip' unit test
    taito test                              # run all integration and end-to-end tests
    taito test: billing                     # run the billing test suite

List all project related links and open one of them in browser:

    taito open -h
    taito open NAME

Cleaning:

    taito clean                             # Clean everything

## Structure

Project specific conventions are defined in [PROJECT.md](PROJECT.md#conventions). See the [structure](https://github.com/TaitoUnited/server-template/blob/master/README.md#structure) chapter of the server-template README.md for some tips on how to design a modular directory structure.

## Version control

Development is done in dev and feature branches.

All commit messages must be structured according to the [Conventional Commits](http://conventionalcommits.org/) convention as application version number and release notes are generated automatically for production release by the [semantic-release](https://github.com/semantic-release/semantic-release) library.

You can manage environment and feature branches using taito-cli commands. Run `taito vc -h` for instructions. You may also use git commands or git GUI tools directly, but remember to follow the version control conventions defined by `taito vc conventions`.

See the [version control](https://github.com/TaitoUnited/server-template/blob/master/README.md#version-control) chapter of the server-template README.md for some additional information.

## Releases

You make a new release distributed to a certain group of people by merging the changes to a correct branch. For example:

* `feature/FEAT`: Push changes to `feature/FEAT` branch. The release may be distributed to a group of people depending on settings.
* `dev`: Push to dev branch. The dev release may be distributed to developers depending on settings.
* `test`: Merge changes to test branch using fast-forward. The test release is typically distributed to testers for general testing.
* `stag`: Merge changes to stag branch using fast-forward. The staging release is typically distributed to customers for acceptance testing.
* `prod`: Merge changes to master branch using fast-forward. The production release is distributed to end-users. Version number and release notes are generated automatically by the CI/CD tool. TODO more instructions.

Simple projects require only two environments: `dev` and `prod`. See the [environments](#environments) chapter for instructions on configuring the environments.

You can use taito-cli to manage branches. Run `taito vc -h` for instructions.

TODO instructions for reverting a production release.

## Configuration

### GitHub settings

Recommended settings for most projects.

Options:
* Data services: Allow GitHub to perform read-only analysis: on
* Data services: Dependency graph: on
* Data services: Vulnerability alerts: on

Branches:
* Default branch: dev
* Protected branch: master (TODO: more protection settings)

Collaborators & teams:
* Teams: Select admin permission for the Admins team
* Teams: Select write permission for the Developers team
* Collaborators: Add additional collaborators if required.
* Collaborators: Remove repository creator (= yourself) from the collaborator list (NOTE: You may want to hold on to your admin rights until you have configured all GitHub settings properly and created a [server environment for development](#configuration-for-server-environments))

> On critical projects you should grant write permissions only for those, who really require write access.

### Basic project settings

1. Modify `taito-config.sh` if you need to change some settings. The default settings are ok for most projects.
2. Run `taito project apply`
3. Commit and push changes dev branch

### Apple App Store

TODO

### Google Play

TODO

### Environments

Define environments with the `taito_environments` setting in `taito-config.sh`. You can create an environment by running `taito env apply:ENV`. Examples for environment names: `feat-orders`, `dev`, `test`, `stag`, `canary`, `prod`.

### Services and secrets

TODO

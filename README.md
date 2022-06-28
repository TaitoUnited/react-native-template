> This page contains a short summary of the project itself. See [DEVELOPMENT.md](DEVELOPMENT.md) for development instructions.

[//]: # 'TEMPLATE NOTE START'

# HOW TO GET STARTED

- Run `yarn install`
- You can change all mentions of the project within files and folders in your repo by running `bash rename.sh` and following instructions.
- Please make sure to run `watchman watch-del-all` and `npm start --reset-cache` before re-running the app.

# HOW TO CHANGE ICONS

- Download your icon as SVG format on your computer and go to your figma project, duplicated from the Design System Template (`https://www.figma.com/file/vEO1Adp6j0nHiiq9BiexE1/Design-System-Template?node-id=484%3A513`).
- Go to the page "Logos/Backgrounds" and drop your logo in there. Resize it if needed then click on it and copy it (Cmd + C). On the layers panel, click "App Icon (edit this)", then "Icon (edit this)", right click "Foreground" and select "Paste to replace". Delete the original icon that you just copied.
- If the background is a simple color, adjust it by clicking on it and changing the "Fill" color on the right panel. If more complex, reproduce the previous step.
- Once you have finished to edit your icon and background, click on "Icon exporting", "Exports", "Icon (export this)", and follow the instructions in "📲 Icon exporting" (export is on the right panel).
- Replace the content of Foreground.svg and Background.svg in your repository with the values you just exported.
- At the root of the repo, run `yarn icons:generate`.
- Rebuild the app.

# HOW TO CHANGE BOOTSPLASH

- Do the same procedure than for icons, following the steps above until the export.
- Follow the instructions in in "📲 Bootsplash exporting" (export is on the right panel).
- Replace the logo.png in "assets/bootsplash" in your repo by your downloaded png file (rename it if necessary).
- At the root of the repo, run `yarn bootsplash:generate`.
- Rebuild the app.

# react-native-template

Template for mobile applications implemented with React Native and released with Visual Studio App Center. You can create a new project from this template by running `taito project create: react-native-template`. You can also migrate an existing react-native project by running `taito project migrate: react-native-template` in your project root folder.

[//]: # 'TEMPLATE NOTE END'

# Project title

Short description for the project: vision, purpose, company, etc.

Table of contents:

- [HOW TO GET STARTED](#how-to-get-started)
- [HOW TO CHANGE ICONS](#how-to-change-icons)
- [HOW TO CHANGE BOOTSPLASH](#how-to-change-bootsplash)
- [react-native-template](#react-native-template)
- [Project title](#project-title)
  - [Links](#links)
  - [Contacts](#contacts)
  - [Responsibilities](#responsibilities)
  - [Recurring issues and solutions](#recurring-issues-and-solutions)
  - [Miscellaneous notes](#miscellaneous-notes)
  - [Conventions](#conventions)
  - [Architecture Overview](#architecture-overview)
    - [Integrations](#integrations)
    - [Processes](#processes)
      - [Basic Scenario](#basic-scenario)
      - [Product Snapshots](#product-snapshots)
      - [Scheduled Jobs](#scheduled-jobs)
  - [Security](#security)
  - [GDPR](#gdpr)

## Links

Non-production basic auth credentials: CREDENTIALS

[//]: # 'GENERATED LINKS START'

LINKS WILL BE GENERATED HERE

[//]: # 'GENERATED LINKS END'

> You can update this section by configuring links in `taito-config.sh` and running `taito project docs`.

## Contacts

- Project Manager: John Doe, Company co.
- Designer: Jane Doe, Company co.

> NOTE: It is recommended to use a shared address book or CRM for keeping the contact details like email and phone number up-to-date.

## Responsibilities

Hosting, billing and control of 3rd party services, SSL/TLS certificates, etc.

## Recurring issues and solutions

See trouble.txt or run `taito --trouble`.

## Miscellaneous notes

Misc notes.

## Conventions

Project specific conventions.

## Architecture Overview

DIAGRAM: You can use [Gravizo](https://www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.

### Integrations

- Client uses Google Maps
- Server uses system X for authorization (OAUTH)
- Server fetches products from system Y (REST/json)
- Server sends email using Sendgrid (REST/json)

### Processes

Only non-trivial processes need to be described here (e.g. scheduled batch processing), though it might be a good idea to describe one or two basic scenarios also. Architecture is the main focus here. User stories should be documented elsewhere (e.g. wiki).

#### Basic Scenario

1. User performs action on UI
2. Server authorizes action by system X
3. Server reads/updates database
4. Server returns value

#### Product Snapshots

1. User performs action on UI
2. Server adds message to queue
3. ...
4. ...
5. Server sends email

#### Scheduled Jobs

- ...
- ...

## Security

See the [security](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/d-security.md) appendix of the [taito-cli tutorial](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/README.md).

## GDPR

See the [data protection and privacy](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/e-data-protection-and-privacy.md) appendix of the [taito-cli tutorial](https://github.com/TaitoUnited/taito-cli/blob/master/docs/tutorial/README.md).

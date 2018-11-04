> This page contains a short summary of the project itself. See [DEVELOPMENT.md](DEVELOPMENT.md) for development instructions.

[//]: # (TEMPLATE NOTE START)

# react-native-template

Template for mobile applications implemented with React Native and released with Visual Studio App Center. You can create a new project from this template by running `taito project create: react-native-template`. You can also migrate an existing react-native project by running `taito project migrate: react-native-template` in your project root folder.

[//]: # (TEMPLATE NOTE END)
# Project title

Short description for the project: vision, purpose, company, etc.

Table of contents:

* [Links](#links)
* [Contacts](#contacts)
* [Responsibilities](#responsibilities)
* [Recurring issues and solutions](#recurring-issues-and-solutions)
* [Miscellaneous notes](#miscellaneous-notes)
* [Conventions](#conventions)
* [Architecture Overview](#architecture-overview)
* [Security](#security)

## Links

[//]: # (GENERATED LINKS START)

LINKS WILL BE GENERATED HERE

[//]: # (GENERATED LINKS END)

> You can update this section by configuring links in `taito-config.sh` and running `taito project docs`.

## Contacts

* Project Manager: John Doe, Company co.
* Designer: Jane Doe, Company co.

> NOTE: It is recommended to use a shared address book or CRM for keeping the contact details like email and phone number up-to-date.

## Responsibilities

> Hosting, billing and control of 3rd party services, SSL/TLS certificates, etc.

## Recurring issues and solutions

See trouble.txt or run `taito --trouble`.

## Miscellaneous notes

## Conventions

> Project specific conventions.

## Architecture Overview

> TIP: You can use [Gravizo](https://www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.

TODO

### Integrations

* Client uses Google Maps
* Server uses system X for authorization (OAUTH)
* Server fetches products from system Y (REST/json)
* Server sends email using Sendgrid (REST/json)

### Processes

> NOTE: Only non-trivial processes need to be described here (e.g. scheduled batch processing), though it might be a good idea to describe one or two basic scenarios also.

#### Basic Scenario

1. User performs action on UI
2. Server authorizes action by system X
3. Server reads/updates database
4. Server returns value

#### Product Snapshots

1. User performs action on UI
2. Server adds message to queue
5. ...
6. ...
7. Server sends email

#### Scheduled Jobs

* ...
* ...

## Security

> Document security and GDPR related things here (See [template wiki](https://github.com/TaitoUnited/server-template/wiki/Security)). Remember to review these also later in case some newly developed features handle sensitive data.

Done:
* [ ] Security checklist
* [ ] Data protection checklist
* [ ] Security review

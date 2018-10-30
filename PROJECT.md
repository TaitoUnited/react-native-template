> NOTE: This article contains a short summary of the most important project details required for long-term maintenance. Provide other documentation like requirements analysis and meeting notes as additional resources (TIP: use [wiki](https://github.com/taitounited/react-native-template/wiki)).

> NOTE: If project consists of multiple git repositories, you don't have to document these matters in all of them. Choose one repository for documenting the project details and leave a reference here.

# Title

Short description: purpose, company, etc.

Table of contents:

* [Contacts](#contacts)
* [Recurring issues and solutions](#recurring-issues-and-solutions)
* [Conventions](#conventions)
* [3rd party services: billing and control](#3rd-party-services-billing-and-control)
* [Security](#security)
* [Architecture Overview](#architecture-overview)
* [Additional Resources](#additional-resources)

## Contacts

* Project Manager: John Doe, Company co.
* Designer: Jane Doe, Company co.

> NOTE: It is recommended to use a shared address book or CRM for keeping the contact details like email and phone number up-to-date.

## Recurring issues and solutions

See trouble.txt or run `taito --trouble`.

## Conventions

> Project specific conventions.

## 3rd party services: billing and control

> How billing and control of 3rd party services are distributed between us and the customer.

* ...
* ...

## Security

TODO [data-protection-and-privacy](https://github.com/TaitoUnited/server-template/blob/dev/PROJECT.md#data-protection-and-privacy)

## Architecture Overview

> TIP: You can use [Gravizo](www.gravizo.com) for making a architecture diagram if the diagram does not contain any confidential information. Note that architecture diagram is not mandatory if the architecture is very simple.

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

## Additional Resources

> NOTE: Links to additional resources.

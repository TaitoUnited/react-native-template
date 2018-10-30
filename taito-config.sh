#!/bin/bash
# shellcheck disable=SC2034
: "${taito_env:?}"
: "${taito_target_env:?}"

# Taito-cli
taito_version=1
taito_plugins="npm git appcenter links-global"

# Project
taito_organization=${template_default_organization:?}
taito_project=react-native-template
taito_company=companyname
taito_family=
taito_application=template
taito_suffix=
taito_repo_location=github-$taito_organization
taito_repo_name=$taito_project

# Environments
taito_environments="dev prod"

# Provider and namespaces
taito_namespace=$taito_project-$taito_env

# Messaging
taito_messaging_app=slack
taito_messaging_channel=companyname
taito_messaging_builds_channel=builds
taito_messaging_webhook=TODO

# Hour reporting and issue management
toggl_project_id=
toggl_tasks="" # For example "task:12345 another-task:67890"
jira_project_id=

# Assets
taito_project_icon=

# Template plugin
template_name=REACT-NATIVE-TEMPLATE
template_source_git=git@github.com:TaitoUnited

# App center plugin
appcenter_org=$taito_organization
appcenter_app=$taito_project

# --- Settings for different environments ---

case $taito_env in
  prod)
    taito_resource_namespace=$taito_company-prod
    ;;
  stag)
    taito_resource_namespace=$taito_company-prod
    ;;
  test)
    taito_resource_namespace=$taito_company-dev
    ;;
  dev|feat)
    taito_resource_namespace=$taito_company-dev
    ;;
  local)
    taito_resource_namespace=$taito_company-dev
    ;;
esac

# --- Derived values ---

# Namespaces
taito_resource_namespace_id="$taito_organization-$taito_resource_namespace"

# Link plugin
link_urls="
  * app[:ENV]=https://TODO/$taito_project-$taito_env Application running on testing platform (:ENV)
  * docs=https://github.com/$taito_organization/$taito_repo_name/wiki Project documentation
  * git=https://github.com/$taito_organization/$taito_repo_name GitHub repository
  * kanban=https://github.com/$taito_organization/$taito_repo_name/projects Kanban boards
  * services[:ENV]=https://console.cloud.google.com/apis/credentials?project=$taito_resource_namespace_id Google services (:ENV)
  * builds=https://TODO Build logs
  * logs:ENV=https://TODO Logs (:ENV)
  * errors:ENV=https://sentry.io/$taito_organization/$taito_project/?query=is%3Aunresolved+environment%3A$taito_target_env Sentry errors (:ENV)
  * styleguide=https://TODO UI/UX style guide and designs
  * wireframes=https://TODO UI/UX wireframes
  * feedback=https://TODO User feedback
  * performance=https://TODO Performance metrics
"

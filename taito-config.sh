#!/bin/bash
# shellcheck disable=SC2034
: "${taito_target_env:?}"

# Configuration instructions:
# - https://github.com/TaitoUnited/taito-cli/blob/master/docs/manual/04-configuration.md
# - https://github.com/TaitoUnited/taito-cli/blob/master/docs/plugins.md

# Taito-cli
taito_version=1
taito_plugins="npm git appcenter links-global"

# Project labeling
taito_organization=${template_default_organization:?}
taito_organization_abbr=${template_default_organization_abbr:?}
taito_project=react-native-template
taito_company=companyname
taito_family=
taito_application=template
taito_suffix=

# Assets
taito_project_icon=https://www.taitounited.fi/icons/icon-72x72.png

# Environments
taito_environments="dev test stag prod"
taito_env=$taito_target_env

# URLs
# ...

# Provider and namespaces
taito_namespace=$taito_project-$taito_env

# Repositories
taito_vc_repository=$taito_project
taito_vc_repository_base=github-${template_default_github_organization:?}

# Messaging
taito_messaging_app=slack
taito_messaging_channel=companyname
taito_messaging_builds_channel=builds
taito_messaging_monitoring_channel=monitoring
taito_messaging_webhook=https://hooks.slack.com/services/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

# ------ Plugin specific settings ------

# Hour reporting and issue management
toggl_project_id=
toggl_tasks="" # For example "task:12345 another-task:67890"
jira_project_id=

# Template plugin
template_name=REACT-NATIVE-TEMPLATE
template_source_git=git@github.com:TaitoUnited

# App center plugin
appcenter_org=Taito-United
appcenter_app=TaitoTemplate

# --- Settings for different environments ---

case $taito_env in
  prod)
    taito_resource_namespace=$taito_organization_abbr-$taito_company-prod
    ;;
  stag)
    taito_resource_namespace=$taito_organization_abbr-$taito_company-prod
    ;;
  test)
    taito_resource_namespace=$taito_organization_abbr-$taito_company-dev
    ;;
  dev|feat)
    taito_resource_namespace=$taito_organization_abbr-$taito_company-dev
    ;;
  local)
    taito_resource_namespace=$taito_organization_abbr-$taito_company-dev
    ;;
esac

# --- Derived values ---

# Namespaces
taito_resource_namespace_id=$taito_resource_namespace

# Link plugin
link_urls="
  * app[:ENV]=https://TODO/$taito_project-$taito_env Application running on testing platform (:ENV)
  * docs=https://github.com/${template_default_github_organization:?}/$taito_vc_repository/wiki Project documentation
  * git=https://github.com/${template_default_github_organization:?}/$taito_vc_repository GitHub repository
  * kanban=https://github.com/${template_default_github_organization:?}/$taito_vc_repository/projects Kanban boards
  * services[:ENV]=https://console.cloud.google.com/apis/credentials?project=$taito_resource_namespace_id Google services (:ENV)
  * builds=https://TODO Build logs
  * logs:ENV=https://TODO Logs (:ENV)
  * errors:ENV=https://sentry.io/$taito_organization/$taito_project/?query=is%3Aunresolved+environment%3A$taito_target_env Sentry errors (:ENV)
  * styleguide=https://TODO UI/UX style guide and designs
  * wireframes=https://TODO UI/UX wireframes
  * feedback=https://TODO User feedback
  * performance=https://TODO Performance metrics
"

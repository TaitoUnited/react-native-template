#!/bin/bash
: "${taito_organization:?}"
: "${taito_company:?}"
: "${taito_repo_name:?}"
: "${template_default_organization:?}"

# Set/replace some variable values in taito-config.sh
mv taito-config.sh taito-config-orig.sh
sed "s/\${template_default_organization:?}/${template_default_organization}/g" taito-config-orig.sh | \
  sed "s/export taito_company=\".*\"/export taito_company=\"${taito_company}\"/g" | \
  sed "s/export taito_family=\".*\"/export taito_family=\"${taito_family:-}\"/g" | \
  sed "s/export taito_application=\".*\"/export taito_application=\"${taito_application:-}\"/g" | \
  sed "s/export taito_suffix=\".*\"/export taito_suffix=\"${taito_suffix:-}\"/g" | \
  sed "s/export taito_repo_name=\".*\"/export taito_repo_name=\"${taito_repo_name}\"/g" | \
  sed "s/export taito_project=\".*\"/export taito_project=\"${taito_repo_name}\"/g" | \
  sed '/https:\/\/TODO/d' > taito-config.sh
rm taito-config-orig.sh

# Replace 'react-native-template' and 'companyname' strings from files
echo "Replacing project and company names in files. Please wait..."
find . -type f -exec sed -i \
  -e "s/react-native-template/${taito_repo_name}/g" 2> /dev/null {} \;
find . -type f -exec sed -i \
  -e "s/companyname/${taito_company}/g" 2> /dev/null {} \;
find . -type f -exec sed -i \
  -e "s/REACT-NATIVE-TEMPLATE/react-native-template/g" 2> /dev/null {} \;

# Remove MIT license
# TODO leave a reference to the original template?
rm LICENSE

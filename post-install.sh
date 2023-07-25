#!/usr/bin/env bash

echo "Pre-build script start"

# -----------------------------------------------------------------------------
echo "Compiling language files..."
npm run i18n:extract

if [ "$EXPO_PUBLIC_APP_ENV" == "prod" ] || [ "$EXPO_PUBLIC_APP_ENV" == "stag" ]; then
  npm run i18n:compile:strict
else
  npm run i18n:compile
fi
# -----------------------------------------------------------------------------

echo "Pre-build script end"

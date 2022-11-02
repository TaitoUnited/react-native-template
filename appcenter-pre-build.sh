#!/usr/bin/env bash

echo "Pre-build script start"

# -----------------------------------------------------------------------------
echo "Compiling language files..."
npm run i18n:extract
npm run i18n:compile
# -----------------------------------------------------------------------------

echo "Pre-build script end"

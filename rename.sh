#!/bin/bash

# Take the search string
# read -p "Enter the search string: " search

# # Take the replace string
# read -p "Enter the replace string: " replace

# find . ! -path '*/.*' -type f -exec sed -i 's/<string1>/<string2>/g' {} +
# find . ! -path '*/.*' -type f -exec sed 's/Taito Template/TaitoTemplate/g' {} +
find . -type f -name "*.xcscheme" -exec echo sed -i 's/Taito Template/TaitoTemplate/g' {} \;

# if [[ $search != "" && $replace != "" ]]; then
#   # sed -i "s/$search/$replace/gi" $1
#   echo $1
# sed -i "s/Taito Template/TaitoTemplate/gi" $1
# fi

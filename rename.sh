#!/bin/bash

# Take the search string
read -p "Enter the search string (press enter if default Taito Template): " searchString
if [ -z "$searchString" ]; then
  searchString="Taito Template"
fi

# Take the replace string
read -p "Enter the name of your project in the format 'My Project': " replaceString

searchUpp=${searchString//[[:blank:]]/}
searchLow=$(echo "$searchUpp" | tr '[:upper:]' '[:lower:]')

replaceUpp=${replaceString//[[:blank:]]/}
replaceLow=$(echo "$replaceString" | tr '[:upper:]' '[:lower:]')

grep -r -l "$searchString" . | sort | uniq | xargs perl -e "s/$searchString/$replaceString/" -pi
grep -r -l "$searchUpp" . | sort | uniq | xargs perl -e "s/$searchUpp/$replaceUpp/" -pi
grep -r -l "$searchLow" . | sort | uniq | xargs perl -e "s/$searchLow/$replaceLow/" -pi

rm -f .git/index
git reset

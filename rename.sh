#!/bin/bash

# Take the search string
# read -p "Enter the search string (press enter if default Taito Template): " searchString
# if [ -z "$searchString" ]; then
searchString="Taito Template"
# fi

# Take the replace string
read -p "Enter the name of your project in the format 'My Project': " replaceString

searchUpp=${searchString//[[:blank:]]/}
searchLow=$(echo "$searchUpp" | tr '[:upper:]' '[:lower:]')

replaceUpp=${replaceString//[[:blank:]]/}
replaceLow=$(echo "$replaceUpp" | tr '[:upper:]' '[:lower:]')

echo "Changing folder names from $searchUpp to $replaceUpp..."
npx react-native-rename $replaceUpp

echo "Changing $searchString to $replaceString in files..."
echo "Changing $searchUpp to $replaceUpp in files..."
echo "Changing $searchLow to $replaceLow in files..."

grep -r -l "$searchString" . | sort | uniq | xargs perl -e "s/$searchString/$replaceString/" -pi
grep -r -l "$searchUpp" . | sort | uniq | xargs perl -e "s/$searchUpp/$replaceUpp/" -pi
grep -r -l "$searchLow" . | sort | uniq | xargs perl -e "s/$searchLow/$replaceLow/" -pi

# Replace xcode schemes
for env in Staging Test Production; do
  touch "ios/$replaceUpp.xcodeproj/xcshareddata/xcschemes/${searchUpp}$env.xcscheme"
  mv "ios/$replaceUpp.xcodeproj/xcshareddata/xcschemes/${searchUpp}$env.xcscheme" "ios/$replaceUpp.xcodeproj/xcshareddata/xcschemes/${replaceUpp}$env.xcscheme"
done

# Reversing back the changes in that file
sed -i '' "s/$replaceString/Taito Template/" rename.sh

# Resetting git & yarn install
rm -f .git/index
rm -rf .git/hooks/
rm -rf node_modules
git reset
yarn

cd ios
pod install
cd ..

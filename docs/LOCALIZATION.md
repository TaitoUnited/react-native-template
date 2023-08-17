# Localization

## How to manage translations

### How to update an existing translation

It is recommanded to first run the script `i18n:extract` to extract the strings from the source code. This will update the `messages.po` file for each language with any new strings that need to be translated as well as their identifiers.

You can open this file in a text editor and translate the strings. For example, if you want to translate the string `Create an account` to French, you would change the `msgstr` tag and it would look like this:

````
#: src/app/(auth)/landing.tsx:74
#: src/app/(auth)/signup.tsx:55
msgid "Create an account"
msgstr "Créer un compte" <-- Your translation
````

Run the script `i18n:extract` again to make sure that the translation is valid. This will update the `messages.po` file for each language with any new strings that need to be translated.

### How to add a new string to be translated

In the code, we use the following to declare a string as translatable:

```
import { Trans } from '@lingui/macro';

<Trans>My string to translate</Trans>
```

Once you have added this code, run the script `i18n:extract` to extract the strings from the source code. This will automatically add the new string to the `messages.po` file for each language. You can now update the translation for each language in their respective `messages.po` file.

### How to add a new dynamic string to be translated

In the code, we use the following to declare a prop or variable as translatable:

```
import { t } from "@lingui/macro";

export default function ImageWithCaption() {
  return <img src="..." alt={t`Image caption`} />;
}
```

Once you have added this code, run the script `i18n:extract` to extract the strings from the source code. This will automatically add the new string to the `messages.po` file for each language. You can now update the translation for each language in their respective `messages.po` file.

### How to handle plurals

In the code, we use the following to declare a variable that have multiple translations according to its value:

```
import { plural } from "@lingui/macro";

const message = plural(numBooks, {
  one: "# Book",
  other: "# Books",
});
```

When `numBooks == 1`, this will render as `1` book and for `numBook == 2` it will be `2` books.

*For more information, refer to the official documentation: https://lingui.dev/guides/plurals*

### How to handle nested components

The `Trans` macro and `Text` component may be nested, to achieve custom styling. For example:

```
<Trans>
  <Text style={{ fontSize: 20 }}>
    <Text>Concert of </Text>
    <Text style={{ color: "green" }}>Green Day</Text>
    <Text style={{ fontWeight: "bold" }}> tonight!</Text>
  </Text>
</Trans>
```

The extracted string for translation will look like this:

`"<0><1>Concert of </1><2>Green Day</2><3> tonight!</3></0>"`

*For more information, refer to the official documentation: https://lingui.dev/tutorials/react-native#nesting-components*

## Translations for production

**Note: The translations are handled in the CI/CD pipeline. You don't need to do anything.**

*The following steps are only for information purposes.*

### How to generate the translations for test environments manually

Run the script `i18n:compile` to generate the translations for test environments manually. This will create or update files called `messages.js` for each language. These files contain all the strings that need to be translated.

### How to generate the translations for production manually

Run the script `i18n:compile:strict` to generate the translations for test environments manually. This will create or update files called `messages.js` for each language. These files contain all the strings that need to be translated.

*Note: The strict mode will fail if there are any untranslated strings. This is useful to make sure that all the strings are translated before deploying to production.*
## How to handle locales

### How to add a new language

*Note: By default, English and Finnish are already included in the project. You can skip this section if you want to add one of these languages.*

In the `package.json`, add a new entry to the `locales` object under `lingui`. For example, if you want to add French, you would add the following:

````
"lingui": {
    "locales": [
      "en",
      "fi",
      "fr" <-- Your new entry
    ],
    ...
}
````
Run the script `i18n:extract` to extract the strings from the source code. This will automatically create a new folder in `src/locales` called `fr`. This folder contains a file called `messages.po` which contains all the strings that need to be translated.

In order for your new language to be selectable in your application, you need to change the `i18n.tsx` file accordingly. 

### How to remove a language

In the `package.json`, remove the entry from the `locales` object under `lingui`. For example, if you want to remove French, you would remove the following:

````
"lingui": {
    "locales": [
      "en",
      "fi",
      "fr", <-- Remove this entry
    ],
````
Then you need to do the following:

- Run the script `i18n:extract` to extract the strings from the source code. 
- Delete the folder in `src/locales` called `fr` and all it contains.
- Update the `i18n.tsx` file accordingly.






## FAQ

Refer to the official documentation for more information: https://lingui.dev/introduction
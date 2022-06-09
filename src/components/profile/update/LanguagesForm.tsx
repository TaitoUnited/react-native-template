import { Controller } from 'react-hook-form';
import { t, Trans } from '@lingui/macro';

import { View } from 'react-native';
import ProfileInputGroupList from './ProfileInputGroupList';
import { useDatasets } from './hooks';
import type { ProfileForm, ProfileLanguageFields } from './types';
import FormTitle from './FormTitle';
import { styled } from '~styles/styled';
import { Select, Stack, Text, TextInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  languageFields: ProfileLanguageFields;
  languages: ReturnType<typeof useDatasets>['languages'];
};

export default function LanguagesForm({
  form,
  languageFields,
  languages,
}: Props) {
  const { fields, append, remove } = languageFields;

  const languageOptions = languages.map((l) => ({
    value: l.id,
    label: l.name,
  }));

  function handleAppend() {
    append({ description: '', isoCode: '', level: 3 });
  }

  return (
    <View>
      <FormTitle>
        <Trans>Tell about your level of language proficiency.</Trans>
      </FormTitle>

      <ProfileInputGroupList
        fields={fields}
        onRemoveField={remove}
        onAppendField={handleAppend}
        renderInputGroup={({ inputRef, index }) => (
          <>
            <Controller
              control={form.control}
              name={`languages.${index}.isoCode`}
              render={({ field }) => (
                <Select
                  ref={inputRef}
                  label={t`Choose language`}
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={languageOptions}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`languages.${index}.level`}
              render={({ field }) => (
                <LanguageLevelInput
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`languages.${index}.description`}
              render={({ field }) => (
                <TextInput
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`Additional info about language`}
                  placeholder={t`Describe eg. your dialect`}
                />
              )}
            />
          </>
        )}
      />
    </View>
  );
}

function LanguageLevelInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const levels = [
    { value: 1, label: t`Novice` },
    { value: 2, label: t`Fair` },
    { value: 3, label: t`Basic` },
    { value: 4, label: t`Good` },
    { value: 5, label: t`Fluent` },
    { value: 6, label: t`Native` },
  ];

  return (
    <Stack axis="x" spacing="xsmall" align="center" justify="between">
      {levels.map((level) => {
        const isSelected = value === level.value;

        return (
          <Stack
            key={level.value}
            axis="y"
            spacing="xxsmall"
            align="center"
            justify="center"
          >
            <LanguageLevelInputButton
              isSelected={isSelected}
              onPress={() => onChange(level.value)}
            >
              <Text
                variant="body"
                color={isSelected ? 'primaryText' : 'primary'}
              >
                {level.value}
              </Text>
            </LanguageLevelInputButton>

            <Text variant="caption" color="textMuted">
              {level.label}
            </Text>
          </Stack>
        );
      })}
    </Stack>
  );
}

const LanguageLevelInputButton = styled('TouchableOpacity', {
  width: 40,
  height: 40,
  flexCenter: 'row',
  borderWidth: 1,
  borderColor: '$text',
  borderRadius: '$full',
  variants: {
    isSelected: {
      true: { backgroundColor: '$primary' },
      false: { backgroundColor: '$primaryText' },
    },
  },
});

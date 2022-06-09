import { Controller } from 'react-hook-form';
import { t, Trans } from '@lingui/macro';

import { View } from 'react-native';
import ProfileInputGroupList from './ProfileInputGroupList';
import type { ProfileForm, ProfileEducationFields } from './types';
import FormTitle from './FormTitle';
import { TextInput, DateInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  eductionFields: ProfileEducationFields;
};

export default function EducationsForm({ form, eductionFields }: Props) {
  const { fields, append, remove } = eductionFields;

  function handleAppend() {
    append({
      description: '',
      schoolName: '',
      startDate: new Date(),
      endDate: undefined,
    });
  }

  return (
    <View>
      <FormTitle>
        <Trans>What is your educational background?</Trans>
      </FormTitle>
      <ProfileInputGroupList
        fields={fields}
        onRemoveField={remove}
        onAppendField={handleAppend}
        renderInputGroup={({ inputRef, index }) => (
          <>
            <Controller
              control={form.control}
              name={`educations.${index}.schoolName`}
              render={({ field }) => (
                <TextInput
                  ref={inputRef}
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`School name`}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`educations.${index}.description`}
              render={({ field }) => (
                <TextInput
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`Description`}
                  placeholder={t`Describe your studies shortly`}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`educations.${index}.startDate`}
              render={({ field }) => (
                <DateInput
                  label={t`Start date`}
                  value={field.value || undefined}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`educations.${index}.endDate`}
              render={({ field }) => (
                <DateInput
                  label={t`End date`}
                  value={field.value || undefined}
                  onChange={field.onChange}
                />
              )}
            />
          </>
        )}
      />
    </View>
  );
}

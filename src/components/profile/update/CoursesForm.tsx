import { t, Trans } from '@lingui/macro';
import { Controller } from 'react-hook-form';

import ProfileInputGroupList from './ProfileInputGroupList';
import type { ProfileForm, ProfileCoursesFields } from './types';
import FormTitle from './FormTitle';
import { Stack, TextInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  coursesFields: ProfileCoursesFields;
};

export default function CoursesForm({ form, coursesFields }: Props) {
  const { fields, append, remove } = coursesFields;

  function handleAppendCourse() {
    append({ description: '' });
  }

  return (
    <Stack axis="y" spacing="normal">
      <FormTitle>
        <Trans>Add courses that are related to your acting career.</Trans>
      </FormTitle>

      <ProfileInputGroupList
        fields={fields}
        onRemoveField={remove}
        onAppendField={handleAppendCourse}
        renderInputGroup={({ inputRef, index }) => (
          <>
            <Controller
              control={form.control}
              name={`coursesDescriptions.${index}.description`}
              render={({ field }) => (
                <TextInput
                  ref={inputRef}
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`Course description`}
                />
              )}
            />
          </>
        )}
      />
    </Stack>
  );
}

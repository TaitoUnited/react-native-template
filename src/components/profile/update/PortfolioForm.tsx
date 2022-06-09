import { t, Trans } from '@lingui/macro';
import { Controller } from 'react-hook-form';

import ProfileInputGroupList from './ProfileInputGroupList';
import type { ProfileForm, ProfileUrlFields } from './types';
import FormTitle from './FormTitle';
import { Stack, Spacer, TextInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  urlFields: ProfileUrlFields;
};

export default function PortfolioForm({ form, urlFields }: Props) {
  const { fields, append, remove } = urlFields;

  function handleAppend() {
    append({ name: '', url: 'https://' });
  }

  return (
    <Stack axis="y" spacing="normal">
      <FormTitle>
        <Trans>Fill in the url to your profile for each relevant site.</Trans>
      </FormTitle>

      <Controller
        control={form.control}
        name="showreel"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Showreel`}
            keyboardType="url"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('imdb')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="imdb"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`IMDB`}
            keyboardType="url"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('linkedin')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="linkedin"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`LinkedIn`}
            keyboardType="url"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('twitter')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="twitter"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Twitter`}
            keyboardType="url"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('tiktok')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="tiktok"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Tiktok`}
            keyboardType="url"
            returnKeyType="next"
            onSubmitEditing={() => form.setFocus('facebook')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="facebook"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Facebook`}
            keyboardType="url"
            returnKeyType="done"
          />
        )}
      />

      <Spacer axis="y" size="large" />

      <ProfileInputGroupList
        fields={fields}
        onRemoveField={remove}
        onAppendField={handleAppend}
        renderInputGroup={({ inputRef, index }) => (
          <>
            <Controller
              control={form.control}
              name={`urls.${index}.name`}
              render={({ field }) => (
                <TextInput
                  ref={inputRef}
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`Name of the website`}
                />
              )}
            />

            <Controller
              control={form.control}
              name={`urls.${index}.url`}
              render={({ field }) => (
                <TextInput
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={t`Website url`}
                  keyboardType="url"
                />
              )}
            />
          </>
        )}
      />
    </Stack>
  );
}

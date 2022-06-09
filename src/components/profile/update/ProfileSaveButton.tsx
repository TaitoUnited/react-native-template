import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { t, Trans } from '@lingui/macro';

import { ProfileForm } from './types';
import { processFormValues } from './form';
import { useUpdateProfileMutation } from '~graphql/generated';
import { FillButton, Text } from '~components/uikit';
import { showToast } from '~components/common/Toaster';

export default function ProfileSaveButton({
  id,
  form,
  isFormDirty,
}: {
  id: string;
  form: ProfileForm;
  isFormDirty: boolean;
}) {
  const [updateProfileResult, updateProfile] = useUpdateProfileMutation(); // eslint-disable-line
  const [state, setState] = useState<'initial' | 'saving' | 'saved'>('initial');

  async function handleSave() {
    const isValid = await form.trigger();

    if (state === 'initial') {
      if (!isValid) {
        console.log('> Failed to save profile. Form is not valid.');
        showToast({
          title: t`Form is not valid`,
          subtitle: t`Please check the form and try again.`,
          type: 'error',
        });
      } else {
        Keyboard.dismiss();
        setState('saving');

        const input = processFormValues(form.getValues());
        const result = await updateProfile({
          input: { id, ...input },
        });

        if (!result.error) {
          form.reset(form.getValues()); // clear dirty state
          setState('saved');
        } else {
          console.log('> Failed to save profile', result.error);
          setState('initial');
          showToast({
            title: t`Could not save profile`,
            subtitle: t`Please try again`,
            type: 'error',
          });
        }
      }
    }
  }

  // Reset button state when user makes edits
  useEffect(() => {
    if (state === 'saved' && isFormDirty) {
      setState('initial');
    }
  }, [isFormDirty, state]);

  if (state === 'saved') {
    return (
      <Text variant="bodyExtraSmall" color="textMuted">
        <Trans>Saved!</Trans>
      </Text>
    );
  }

  return (
    <FillButton
      variant="primary"
      size="small"
      loading={state === 'saving'}
      onPress={handleSave}
    >
      {state === 'saving' ? null : <Trans>Save</Trans>}
    </FillButton>
  );
}

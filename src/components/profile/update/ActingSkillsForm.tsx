import { t, Trans } from '@lingui/macro';
import { Controller } from 'react-hook-form';

import type { ProfileForm } from './types';
import { useActingSkillsOptions } from './hooks';
import FormTitle from './FormTitle';
import { Stack, TextInput, Checkbox, Select } from '~components/uikit';

type Props = {
  form: ProfileForm;
};

export default function ActingSkillsForm({ form }: Props) {
  const { actorTypes } = useActingSkillsOptions();

  return (
    <Stack axis="y" spacing="normal">
      <FormTitle>
        <Trans>Awesome! Tell about your experience as an actor.</Trans>
      </FormTitle>
      <Controller
        control={form.control}
        name="memberOfActorUnion"
        render={({ field }) => (
          // NOTE: checkboxes should have string value but here we don't have
          // one so we just use 'true' / 'false' as placeholders
          <Checkbox
            checked={!!field.value}
            value={field.value ? 'true' : 'false'}
            onChange={(v) => field.onChange(v !== 'true')}
            label={t`I'm a member of the Actor Union`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="actorType"
        render={({ field }) => (
          <Select
            label={t`What kind of actor are you?`}
            value={field.value || ''}
            onChange={field.onChange}
            options={actorTypes}
          />
        )}
      />

      <Controller
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Occupation`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="experienceYears"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value ? field.value.toString() : ''}
            label={t`Acting experience in years`}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={form.control}
        name="skills"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`What unique skills do you have?`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="workingDescription"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`What have you worked on?`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="knownForDescription"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`What are you known for?`}
          />
        )}
      />
    </Stack>
  );
}

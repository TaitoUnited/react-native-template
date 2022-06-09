import { useEffect } from 'react';
import { t, Trans } from '@lingui/macro';
import { Controller } from 'react-hook-form';

import type { Datasets, ProfileForm } from './types';
import FormTitle from './FormTitle';
import { useProfilePreferencesOptions } from './hooks';
import { Select, Stack, TextInput, DateInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  countries: Datasets['countries'];
  municipalities: Datasets['municipalities'];
};

export default function BasicInfoForm({
  form,
  countries,
  municipalities,
}: Props) {
  const { watch } = form;
  const residenceCountry = watch('residenceCountry');

  const countryOptions = countries.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const municipalityOptions = municipalities.map((m) => ({
    value: `${m.id}`,
    label: m.name,
  }));

  const preferencesOptions = useProfilePreferencesOptions();

  // NOTE: municipality code needs to be cleared manually even though the input
  // unmounts when user changes the country to something else than Finland
  useEffect(() => {
    if (residenceCountry !== 'fin') {
      form.setValue('municipalityCode', null);
    }
  }, [residenceCountry]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack axis="y" spacing="normal">
      <FormTitle>
        <Trans>Fill out the basic information of the profile.</Trans>
      </FormTitle>
      <Controller
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`First name`}
            isRequired
          />
        )}
      />

      <Controller
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Last name`}
            isRequired
          />
        )}
      />

      <Controller
        name="email"
        control={form.control}
        rules={{
          validate: {
            validEmail: (v) => {
              if (!v) return true;

              const re = /\S+@\S+\.\S+/;
              return re.test(v);
            },
          },
        }}
        render={({ field, fieldState }) => {
          const message =
            fieldState.error?.type === 'validEmail'
              ? t`Email invalid`
              : fieldState.error?.type === 'required'
              ? t`Email required`
              : undefined;

          return (
            <TextInput
              {...field}
              value={field.value || ''}
              label={t`Email`}
              message={message}
              isValid={!message}
              keyboardType="email-address"
              autoCapitalize="none"
              isRequired
            />
          );
        }}
      />

      <Controller
        name="phoneNumber"
        control={form.control}
        render={({ field, fieldState }) => {
          const message =
            fieldState.error?.message || t`Preferred format: +358400123456`;

          return (
            <TextInput
              {...field}
              value={field.value || ''}
              label={t`Phone number`}
              message={message}
              isValid={!fieldState.error}
              keyboardType="phone-pad"
              isRequired
            />
          );
        }}
      />

      <Controller
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <DateInput
            label={t`Date of birth`}
            value={field.value || undefined}
            onChange={field.onChange}
            isRequired
          />
        )}
      />

      <Controller
        control={form.control}
        name="residenceCountry"
        render={({ field }) => (
          <Select
            label={t`Residence country`}
            value={field.value || ''}
            onChange={field.onChange}
            options={countryOptions}
          />
        )}
      />

      {residenceCountry === 'fin' && (
        <Controller
          control={form.control}
          name="municipalityCode"
          render={({ field }) => (
            <Select
              label={t`Residence municipality`}
              value={field.value || ''}
              onChange={field.onChange}
              options={municipalityOptions}
            />
          )}
        />
      )}

      <Controller
        control={form.control}
        name="municipalitiesOfInterest"
        render={({ field }) => (
          <Select
            multiple
            label={t`Where can you work?`}
            value={field.value || ''}
            onChange={field.onChange}
            options={municipalityOptions}
            message={t`Select all the municipalities you can work in`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="preferredRoleTypes"
        render={({ field }) => (
          <Select
            multiple
            label={t`What type of roles interest you?`}
            value={field.value || ''}
            onChange={field.onChange}
            options={preferencesOptions.roleTypes}
            message={t`Select all the type of roles that interest you`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="preferredProjectTypes"
        render={({ field }) => (
          <Select
            multiple
            label={t`What type of projects interest you?`}
            value={field.value || ''}
            onChange={field.onChange}
            options={preferencesOptions.projectTypes}
            message={t`Select all the type of projects that interest you`}
          />
        )}
      />
    </Stack>
  );
}

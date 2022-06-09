import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { t, Trans } from '@lingui/macro';

import type { ProfileForm, Datasets } from './types';
import { useAppearanceOptions } from './hooks';
import FormTitle from './FormTitle';
import { Gender } from '~graphql/generated';
import { Checkbox, Select, Spacer, Stack, TextInput } from '~components/uikit';

type Props = {
  form: ProfileForm;
  countries: Datasets['countries'];
  hasChildrenSize: boolean;
  onHasChildrenSizeChange: () => void;
};

export default function AppearanceForm({
  form,
  countries,
  hasChildrenSize,
  onHasChildrenSizeChange,
}: Props) {
  const {
    genders,
    skinColors,
    hairColors,
    hairStyles,
    buildTypes,
    attributes,
    clothingSizes,
  } = useAppearanceOptions();

  const countryOptions = countries.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const [gender, genderDescription] = form.watch([
    'gender',
    'genderDescription',
  ]);

  useEffect(() => {
    // Clear gender description if the user changes the gender
    // otherwise the `genderDescription` value will persist even though the input
    // is unmounted (form has `shouldUnregister: false`)
    if (gender !== Gender.Other && genderDescription) {
      form.setValue('genderDescription', null);
    }
  }, [gender, genderDescription, form]);

  return (
    <Stack axis="y" spacing="normal">
      <FormTitle>
        <Trans>Next, tell a little about your appearance.</Trans>
      </FormTitle>
      <Controller
        control={form.control}
        name="gender"
        render={({ field }) => (
          <Select
            label={t`Gender`}
            value={field.value || ''}
            onChange={field.onChange}
            options={genders}
          />
        )}
      />

      {gender === Gender.Other && (
        <Controller
          control={form.control}
          name="genderDescription"
          render={({ field }) => (
            <TextInput
              {...field}
              value={field.value || ''}
              label={t`Gender description`}
            />
          )}
        />
      )}

      <Controller
        control={form.control}
        name="actingGenders"
        render={({ field }) => (
          <Select
            multiple
            label={t`Acting gender`}
            value={field.value || ''}
            onChange={field.onChange}
            options={genders}
            message={t`Which genders do you want to act?`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="skinColor"
        render={({ field }) => (
          <Select
            label={t`Skin color`}
            value={field.value || ''}
            onChange={field.onChange}
            options={skinColors}
          />
        )}
      />

      <Controller
        control={form.control}
        name="ethnicity"
        render={({ field }) => (
          <Select
            multiple
            label={t`Ethnicity`}
            value={field.value || ''}
            onChange={field.onChange}
            options={countryOptions}
            message={t`Pick countries that match your ethnicity`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="hairColor"
        render={({ field }) => (
          <Select
            label={t`Hair color`}
            value={field.value || ''}
            onChange={field.onChange}
            options={hairColors}
          />
        )}
      />

      <Spacer axis="y" size="medium" />

      <Controller
        control={form.control}
        name="hairDyed"
        render={({ field }) => (
          // NOTE: checkboxes should have string value but here we don't have
          // one so we just use 'true' / 'false' as placeholders
          <Checkbox
            checked={!!field.value}
            value={field.value ? 'true' : 'false'}
            onChange={(v) => field.onChange(v !== 'true')}
            label={t`My hair is dyed`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="hairDescription"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Additional details about hair color`}
          />
        )}
      />

      <Controller
        control={form.control}
        name="hairStyle"
        render={({ field }) => (
          <Select
            multiple
            label={t`Hair style`}
            value={field.value || ''}
            onChange={field.onChange}
            options={hairStyles}
          />
        )}
      />

      <Controller
        control={form.control}
        name="builds"
        render={({ field }) => (
          <Select
            multiple
            label={t`Body build`}
            value={field.value || ''}
            onChange={field.onChange}
            options={buildTypes}
          />
        )}
      />

      <Controller
        control={form.control}
        name="attributes"
        render={({ field }) => (
          <Select
            multiple
            label={t`Unique attributes`}
            value={field.value || ''}
            onChange={field.onChange}
            options={attributes}
          />
        )}
      />

      <Controller
        control={form.control}
        name="attributesDescription"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value || ''}
            label={t`Additional attributes`}
            message={t`Describe your other unique attributes`}
          />
        )}
      />

      <Spacer axis="y" size="medium" />

      <Stack axis="y" spacing="normal">
        <Checkbox
          label={t`Use childrens clothing sizes`}
          value={hasChildrenSize ? 'true' : 'false'}
          checked={hasChildrenSize}
          onChange={onHasChildrenSizeChange}
        />
        {hasChildrenSize ? (
          <Controller
            control={form.control}
            name="childrenSizeCm"
            shouldUnregister
            render={({ field }) => (
              <TextInput
                {...field}
                value={field.value ? field.value.toString() : ''}
                label={t`Children clothing size (cm)`}
                keyboardType="numeric"
              />
            )}
          />
        ) : (
          <>
            <Controller
              control={form.control}
              name="clothingSizeUpperBody"
              shouldUnregister
              render={({ field }) => (
                <Select
                  label={t`Clothing size (upper body)`}
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={clothingSizes}
                />
              )}
            />

            <Controller
              control={form.control}
              name="clothingSizeLowerBody"
              shouldUnregister
              render={({ field }) => (
                <Select
                  label={t`Clothing size (lower body)`}
                  value={field.value || ''}
                  onChange={field.onChange}
                  options={clothingSizes}
                />
              )}
            />
          </>
        )}
      </Stack>

      <Controller
        control={form.control}
        name="heightCm"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value ? field.value.toString() : ''}
            label={t`Height (cm)`}
            keyboardType="numeric"
          />
        )}
      />

      <Controller
        control={form.control}
        name="shoeSizeEu"
        render={({ field }) => (
          <TextInput
            {...field}
            value={field.value ? field.value.toString() : ''}
            label={t`Shoe size (EU)`}
            keyboardType="number-pad"
          />
        )}
      />
    </Stack>
  );
}

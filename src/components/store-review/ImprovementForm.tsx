import { useState } from 'react';
import { ScrollView } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Trans, t } from '@lingui/macro';
import { Controller, useForm } from 'react-hook-form';

import { FillButton, IconButton, Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import { sleep } from '~utils/common';
import { showToast } from '~components/common/Toaster';

type ImprovementFormType = {
  onCancel: () => void;
  onDone: () => void;
};

export default function ImprovementForm({
  onCancel,
  onDone,
}: ImprovementFormType) {
  const form = useForm({
    defaultValues: {
      feedback: '',
    },
  });
  const [isFocused, setFocused] = useState(false);

  async function onSubmitFeedback() {
    try {
      await sleep(2000);
      showToast({
        title: t`Feedback sent!`,
        subtitle: t`Thank you`,
        type: 'success',
      });
    } catch (error) {
      console.log('> Error sending feedback to server: ', error);
    } finally {
      onDone();
    }
  }

  return (
    <Stack
      axis="y"
      spacing="large"
      align="center"
      justify="between"
      style={{ height: '100%' }}
    >
      <BackButton icon="x" onPress={onCancel} />

      <Text variant="title3">
        <Trans>How can we improve?</Trans>
      </Text>
      <ScrollView
        style={{ width: '100%' }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <Stack axis="y" spacing="large" align="center" justify="between">
          <Controller
            name="feedback"
            control={form.control}
            rules={{ required: t`Feedback is required` }}
            render={({ field }) => {
              return (
                <InputWrapper focused={isFocused}>
                  <Input
                    {...field}
                    multiline
                    autoCapitalize="sentences"
                    numberOfLines={3}
                    maxLength={200}
                    onChangeText={field.onChange}
                    value={field.value}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                </InputWrapper>
              );
            }}
          />

          <FillButton
            variant="primary"
            onPress={form.handleSubmit(onSubmitFeedback)}
            style={{ width: '100%' }}
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            <Trans>Submit feedback</Trans>
          </FillButton>
        </Stack>
      </ScrollView>
    </Stack>
  );
}

const BackButton = styled(IconButton, {
  position: 'absolute',
  top: -10,
  right: 10,
});

const InputWrapper = styled('View', {
  alignItems: 'flex-end',
  position: 'relative',
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderTopRightRadius: '$normal',
  borderTopLeftRadius: '$normal',
  variants: {
    focused: {
      true: { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
      false: { backgroundColor: 'transparent' },
    },
    valid: {
      true: { borderColor: '$text' },
      false: { borderColor: '$error' },
    },
  },
  width: '100%',
});

const Input = styled(BottomSheetTextInput, {
  minHeight: 60,
  typography: 'body',
  color: '$text',
  flexGrow: 1,
  paddingHorizontal: '$small',
  paddingBottom: 10,
  paddingTop: '$medium',
});

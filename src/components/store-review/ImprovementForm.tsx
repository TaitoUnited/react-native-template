import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Trans, t } from '@lingui/macro';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { showToast } from '~components/common/Toaster';
import { Button, IconButton, Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import { sleep } from '~utils/common';

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
      <BackButton icon="close" onPress={onCancel} />

      <Text variant="headingS">
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

          <Button
            variant="filled"
            onPress={form.handleSubmit(onSubmitFeedback)}
            style={{ width: '100%' }}
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            <Trans>Submit feedback</Trans>
          </Button>
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
  borderTopRightRadius: '$regular',
  borderTopLeftRadius: '$regular',
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

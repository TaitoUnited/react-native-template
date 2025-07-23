import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Trans, useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { showToast } from '~components/common/Toaster';
import { Button, IconButton, Stack, Text } from '~components/uikit';
import { sleep } from '~utils/common';

type ImprovementFormType = {
  onCancel: () => void;
  onDone: () => void;
};

export default function ImprovementForm({
  onCancel,
  onDone,
}: ImprovementFormType) {
  const { t } = useLingui();
  const form = useForm({
    defaultValues: {
      feedback: '',
    },
  });
  const [isFocused, setFocused] = useState(false);

  // Controls the visual styles based on the input state
  styles.useVariants({
    focused: isFocused,
  });

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
      <IconButton style={styles.backButton} icon="close" onPress={onCancel} />

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
                <View style={styles.inputWrapper}>
                  <BottomSheetTextInput
                    style={styles.input}
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
                </View>
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

const styles = StyleSheet.create((theme) => ({
  backButton: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  inputWrapper: {
    alignItems: 'flex-end',
    position: 'relative',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopRightRadius: theme.radii.regular,
    borderTopLeftRadius: theme.radii.regular,
    width: '100%',
    variants: {
      focused: {
        true: { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
        false: { backgroundColor: 'transparent' },
      },
    },
  },
  input: {
    minHeight: 60,
    ...theme.typography.body,
    color: theme.colors.text,
    flexGrow: 1,
    paddingHorizontal: theme.space.small,
    paddingBottom: 10,
    paddingTop: theme.space.medium,
  },
}));

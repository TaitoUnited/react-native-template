import { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { t, Trans } from '@lingui/macro';

import type { ProfileForm, ProfilePhase, ProfilePhaseItems } from './types';
import ProfileSaveButton from './ProfileSaveButton';
import { OutlineButton, Text, Stack } from '~components/uikit';
import { useNavigation } from '~screens/utils';
import { styled } from '~styles/styled';

export function useProfileFormHeader({
  phases,
  currentPhase,
  form,
  profileId,
}: {
  phases: ProfilePhaseItems;
  currentPhase: ProfilePhase;
  form: ProfileForm;
  profileId: string;
}) {
  const navigation = useNavigation();
  const phase = phases.find((p) => p.id === currentPhase);
  const [isSaveVisible, setSaveVisible] = useState(false);

  // NOTE: the `isDirty` value needs to read here for it to cause rerenders
  // https://react-hook-form.com/api/useform/formstate/#rules
  const {
    formState: { isDirty },
  } = form;

  const renderHeaderRight = useCallback(() => {
    if (!isSaveVisible) return <View />; // NOTE: `null` causes a crash

    return (
      <View>
        <ProfileSaveButton form={form} isFormDirty={isDirty} id={profileId} />
      </View>
    );
  }, [isSaveVisible, isDirty]); // eslint-disable-line

  const onClose = (showAlert: boolean) => {
    if (showAlert) {
      Alert.alert(
        t`You have some unsaved changes that will be lost.`,
        t`Are you sure you want to close the form?`,
        [
          { text: t`Cancel`, style: 'cancel' },
          { text: t`Close form`, onPress: () => navigation.goBack() },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  const renderHeaderLeft = useCallback(() => {
    return (
      <OutlineButton
        variant="primary"
        size="small"
        onPress={() => onClose(isDirty)}
      >
        <Trans>Close</Trans>
      </OutlineButton>
    );
  }, [navigation, isDirty]);

  const renderHeaderTitle = useCallback(() => {
    return phase ? <HeaderTitle phase={phase} /> : <View />;
  }, [phase?.id]); // eslint-disable-line

  useEffect(() => {
    // Initially save button is not visible but after the form becomes dirty we
    // will show it and from then on it will be visible even if the form's dirty
    // state is reset -> it will just show "Saved!" label
    if (!isSaveVisible && isDirty) {
      setSaveVisible(true);
    }
  }, [isDirty, isSaveVisible]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: renderHeaderTitle,
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
    });
  }, [navigation, renderHeaderTitle, renderHeaderLeft, renderHeaderRight]);
}

function HeaderTitle({ phase }: { phase: ProfilePhaseItems[number] }) {
  return (
    <HeaderWrapper axis="y" spacing="none" align="center" justify="end">
      <Text variant="body">{phase.title}</Text>

      {/* {phase.isRequired && (
        <Stack axis="x" spacing="xxsmall">
          <Text variant="caption" color="textMuted">
            <Trans>Required</Trans>
          </Text>

          <Text variant="bodyBold" color="error">
            *
          </Text>
        </Stack>
      )} */}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled(Stack, {
  paddingTop: '$xxsmall',
});

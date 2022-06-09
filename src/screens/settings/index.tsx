import { t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingScreen from '../../components/common/LoadingScreen';
import { showToast } from '../../components/common/Toaster';
import LanguageSelect from '../../components/settings/LanguageSelect';
import {
  OutlineButton,
  Spacer,
  Stack,
  Text,
  TextInput,
} from '../../components/uikit';
import {
  useCurrentUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../graphql/generated';
import { useAuthStore } from '../../services/auth';
import { styled } from '../../styles';

type SettingsState = 'Saving' | 'Deleting' | undefined;

export default function Settings() {
  const [currentUserResult] = useCurrentUserQuery();
  const { data, fetching } = currentUserResult;
  const { control, getValues } = useForm({
    defaultValues: {
      firstName: data?.currentUser?.firstName,
      lastName: data?.currentUser?.lastName,
      phoneNumber: data?.currentUser?.phoneNumber,
    },
  });

  const [state, setState] = useState<SettingsState>();
  const logout = useAuthStore((s) => s.logout);
  const [, updateUserMutation] = useUpdateUserMutation();
  const [, deleteUserMutation] = useDeleteUserMutation();

  const save = async () => {
    setState('Saving');
    const values = getValues();
    await updateUserMutation({
      input: {
        id: data?.currentUser?.id ?? '',
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
      },
    });
    toastAccountSaved();
    setState(undefined);
  };

  const deleteAndLogout = async () => {
    const { error } = await deleteUserMutation({
      id: data?.currentUser?.id ?? '',
    });
    if (error) return toastDeleteFailed();
    toastDeleteSuccess();
    logout();
  };

  const deleteUser = async () => {
    confirmAccountDelete(deleteAndLogout);
  };

  if (fetching) return <LoadingScreen />;
  if (!data) return <LoadingScreen />;

  const user = data.currentUser;

  return (
    <Wrapper>
      <Scroller>
        <Stack axis="y" spacing="small">
          <Text variant="title2">
            <Trans>App settings</Trans>
          </Text>
          <LanguageSelect />

          <Spacer size="large" />
          <Text variant="title2">
            <Trans>Account information</Trans>
          </Text>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                defaultValue={user.firstName}
                value={field.value ?? ''}
                label={t`First name`}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                defaultValue={user.lastName}
                value={field.value ?? ''}
                label={t`Last name`}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextInput
                defaultValue={user.phoneNumber}
                value={field.value ?? ''}
                label={t`Phone number`}
                onChange={field.onChange}
              />
            )}
          />
        </Stack>
        <PushContent />
        <SettingsButtons state={state} save={save} deleteUser={deleteUser} />
      </Scroller>
    </Wrapper>
  );
}

interface SettingsButtonsProps {
  state: SettingsState;
  save: () => void;
  deleteUser: () => void;
}

function SettingsButtons({ state, save, deleteUser }: SettingsButtonsProps) {
  return (
    <>
      <OutlineButton onPress={save}>
        {state === 'Saving' ? <Trans>Saving...</Trans> : <Trans>Save</Trans>}
      </OutlineButton>
      <Spacer size="medium" />
      <OutlineButton variant="danger" onPress={deleteUser}>
        <Trans>Delete Account</Trans>
      </OutlineButton>
    </>
  );
}

function confirmAccountDelete(deleteAndLogout: () => Promise<void>) {
  Alert.alert(
    t`Are you sure you want to delete your account?`,
    t`Your account and all of your profiles will be deleted immediately. This cannot be undone.`,
    [
      { text: t`Cancel`, style: 'cancel' },
      { text: t`Delete`, onPress: deleteAndLogout },
    ],
  );
}

/*********
 * TOASTS
 *********/

function toastAccountSaved() {
  showToast({
    title: t`Profile saved`,
    subtitle: t`Your profile has been saved`,
    type: 'success',
  });
}

function toastDeleteSuccess() {
  showToast({
    title: t`Account deleted`,
    subtitle: t`Your account has been deleted`,
    type: 'success',
  });
}

function toastDeleteFailed() {
  showToast({
    title: t`Account deletion failed`,
    subtitle: t`Account deletion failed. Try again later.`,
    type: 'error',
  });
}

/*********
 * STYLES
 *********/

const Wrapper = styled('ScrollView', {
  flex: 1,
  backgroundColor: '$background',
}).attrs((p) => ({
  contentContainerStyle: {
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: p.theme.space.normal,
  },
}));

const PushContent = styled('View', {
  flexGrow: 1,
  marginTop: '$medium',
});

const Scroller = styled(KeyboardAwareScrollView, {
  flex: 1,
}).attrs((p) => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
    padding: p.theme.space.normal,
  },
}));

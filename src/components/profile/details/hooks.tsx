import { useEffect } from 'react';
import { Alert } from 'react-native';
import { t, Trans } from '@lingui/macro';

import {
  CreateProfileInput,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useProfileListQuery,
} from '~graphql/generated';

import { useNavigation } from '~screens/utils';
import { showToast } from '~components/common/Toaster';
import { FillButton, OutlineButton } from '~components/uikit';

export function useCreateProfile() {
  const navigation = useNavigation();
  const [createProfileResult, createProfile] = useCreateProfileMutation();

  async function handleCreateProfile(opts: CreateProfileInput = {}) {
    try {
      const result = await createProfile({
        input: opts,
      });
      const profile = result.data?.createProfile;

      if (profile) {
        // Wait a bit so user sees that the new profile is appended to the list'

        setTimeout(() => {
          navigation.navigate('ProfileUpdate', { profile });
        }, 500);
      }
    } catch (error) {
      console.log('> Failed to create profile', error);

      showToast({
        title: t`Could not create profile`,
        subtitle: t`Please try again`,
        type: 'error',
      });
    }
  }

  return [createProfileResult, handleCreateProfile] as const;
}

export function useDeleteProfile() {
  const navigation = useNavigation();
  const [deleteProfileResult, deleteProfile] = useDeleteProfileMutation();

  function confirmDeleteProfile(id: string) {
    Alert.alert(t`Are you sure you want to delete this profile?`, '', [
      { text: t`Cancel`, style: 'cancel' },
      {
        text: t`Yes, delete`,
        style: 'destructive',
        onPress: () => handleDeleteProfile(id),
      },
    ]);
  }

  async function handleDeleteProfile(id: string) {
    try {
      const result = await deleteProfile({ id });

      if (result.data?.deleteProfile) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('> Failed to delete profile', error);

      showToast({
        title: t`Could not delete profile`,
        subtitle: t`Please try again`,
        type: 'error',
      });
    }
  }

  return [deleteProfileResult, confirmDeleteProfile] as const;
}

type Profiles = NonNullable<
  ReturnType<typeof useProfileListQuery>['0']['data']
>['currentUser']['profiles']['data'];

export function useProfileSummaryHeader(profiles?: Profiles) {
  const navigation = useNavigation();
  const [createProfileResult, createProfile] = useCreateProfile();

  useEffect(() => {
    const profilesCount = profiles?.length ?? 0;

    function renderHeaderLeft() {
      if (!profiles || profilesCount !== 1) return null;

      return (
        <OutlineButton
          variant="primary"
          size="small"
          onPress={() =>
            navigation.navigate('ProfileUpdate', { profile: profiles[0] })
          }
        >
          <Trans>Edit</Trans>
        </OutlineButton>
      );
    }

    function renderHeaderRight() {
      if (!profiles || profilesCount === 0) return null;

      return (
        <FillButton
          variant="primary"
          size="small"
          onPress={() =>
            createProfile({
              firstName: t`Profile` + profilesCount + 1,
              lastName: '',
            })
          }
          icon="plus"
          iconPlacement="right"
          loading={createProfileResult.fetching}
        >
          <Trans>New</Trans>
        </FillButton>
      );
    }

    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: profiles && profiles.length > 1 ? t`Profiles` : t`Profile`,
    });
  }, [navigation, profiles, createProfileResult]); // eslint-disable-line react-hooks/exhaustive-deps
}

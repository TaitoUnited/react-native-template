import { Trans } from '@lingui/macro';

import { useCreateProfile } from './hooks';
import { useCurrentUserQuery } from '../../../graphql/generated';
import { FillButton, Stack, Text } from '~components/uikit';

export default function ProfilesEmpty() {
  const [createProfileResult, createProfile] = useCreateProfile();

  // Fill basic information for the first profile
  const [currentUserResult] = useCurrentUserQuery();
  const user = currentUserResult.data?.currentUser;
  const profileTemplate = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  };

  return (
    <Stack axis="y" spacing="normal">
      <Text variant="title2">
        <Trans>No profiles yet</Trans>
      </Text>

      <Text variant="body" applyLineHeight>
        <Trans>
          In order to apply to projects you need to have at least one profile.
        </Trans>
      </Text>

      <Text variant="body" applyLineHeight>
        <Trans>Let&lsquo;s create your first profile.</Trans>
      </Text>

      <FillButton
        variant="primary"
        onPress={() => createProfile(profileTemplate)}
        loading={createProfileResult.fetching}
      >
        {createProfileResult.fetching ? (
          <Trans>Creating...</Trans>
        ) : (
          <Trans>Create profile</Trans>
        )}
      </FillButton>
    </Stack>
  );
}

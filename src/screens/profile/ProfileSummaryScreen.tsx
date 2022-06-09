import { Trans } from '@lingui/macro';

import SettingsButton from '../../components/settings/SettingsButton';
import { styled } from '~styles';
import { LocalizedProfile, useProfileListQuery } from '~graphql/generated';
import { FillButton, Stack, Text } from '~components/uikit';
import { useProfileSummaryHeader } from '~components/profile/details/hooks';
import LoadingScreen from '~components/common/LoadingScreen';
import LogoutButton from '~components/auth/LogoutButton';
import ProfileList from '~components/profile/details/ProfileList';
import ProfileDetails from '~components/profile/details/ProfileDetails';
import ProfilesEmpty from '~components/profile/details/ProfilesEmpty';

export default function ProfileSummaryScreen() {
  const [{ data, error, fetching }, refetch] = useProfileListQuery();
  const profiles = data?.currentUser.profiles.data as Omit<
    LocalizedProfile,
    'user'
  >[];

  useProfileSummaryHeader(profiles);

  if (fetching) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <ProfileContent>
        {error ? (
          <ProfileError onRetry={() => refetch()} />
        ) : profiles && profiles.length > 0 ? (
          profiles.length > 1 ? (
            <ProfileList profiles={profiles} />
          ) : (
            <ProfileDetails profile={profiles[0]} />
          )
        ) : (
          <ProfilesEmpty />
        )}
      </ProfileContent>

      <Footer spacing="small">
        <SettingsButton />
        <LogoutButton />
      </Footer>
    </Wrapper>
  );
}

function ProfileError({ onRetry }: { onRetry: () => void }) {
  return (
    <ProfileErrorWrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="body">
          <Trans>Could not fetch profiles</Trans>
        </Text>

        <FillButton variant="primary" onPress={onRetry}>
          <Trans>Retry</Trans>
        </FillButton>
      </Stack>
    </ProfileErrorWrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
  backgroundColor: '$background',
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
    flexGrow: 1,
  },
}));

const ProfileErrorWrapper = styled('View', {
  padding: '$large',
  flexCenter: 'row',
});

const ProfileContent = styled('View', {
  flexGrow: 1,
});

const Footer = styled(Stack, {
  borderTopWidth: 1,
  borderColor: '$border',
  marginTop: '$medium',
  marginHorizontal: '-$normal',
  paddingTop: '$normal',
  paddingHorizontal: '$normal',
});

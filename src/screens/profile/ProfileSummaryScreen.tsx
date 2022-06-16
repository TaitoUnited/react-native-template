import { Trans } from '@lingui/macro';

import { View } from 'react-native';
import { styled } from '~styles';
import { useProfileListQuery } from '~graphql/generated';
import { FillButton, Stack, Text } from '~components/uikit';
import LoadingScreen from '~components/common/LoadingScreen';
import LogoutButton from '~components/auth/LogoutButton';

export default function ProfileSummaryScreen() {
  const [{ error, fetching }, refetch] = useProfileListQuery();

  if (fetching) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <ProfileContent>
        {error ? (
          <ProfileError onRetry={() => refetch()} />
        ) : (
          <View>
            <Text>NO PROFILE</Text>
          </View>
        )}
      </ProfileContent>

      <Footer spacing="small">
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

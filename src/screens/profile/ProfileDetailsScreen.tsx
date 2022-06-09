import { useEffect } from 'react';
import { Trans } from '@lingui/macro';

import type { StackScreenProps } from '~screens/types';
import { styled } from '~styles';
import { OutlineButton } from '~components/uikit';
import ProfileDetails from '~components/profile/details/ProfileDetails';

export default function ProfileDetailsScreen({
  route,
  navigation,
}: StackScreenProps<'ProfileDetails'>) {
  const { profile } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OutlineButton
          variant="primary"
          size="small"
          onPress={() => navigation.navigate('ProfileUpdate', { profile })}
        >
          <Trans>Edit</Trans>
        </OutlineButton>
      ),
    });
  }, [navigation, profile]);

  return (
    <Wrapper>
      <ProfileDetails profile={profile} />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
  backgroundColor: '$background',
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

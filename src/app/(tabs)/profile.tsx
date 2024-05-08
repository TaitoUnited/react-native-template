import { Trans } from '@lingui/macro';
import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function Profile() {
  return (
    <Wrapper testID="profileScreen">
      <Text variant="body">
        <Trans>Profile</Trans>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));

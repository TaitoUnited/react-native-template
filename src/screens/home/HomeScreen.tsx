import { Trans } from '@lingui/macro';
import { styled } from '~styles';
import { ScreenProps } from '~screens/types';
import { Text } from '~components/uikit';

export default function HomeScreen(_: ScreenProps<'Home'>) {
  return (
    <Wrapper>
      <Text variant="body">
        <Trans>Home</Trans>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

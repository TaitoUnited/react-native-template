import { Trans } from '@lingui/macro';

import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function Home() {
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

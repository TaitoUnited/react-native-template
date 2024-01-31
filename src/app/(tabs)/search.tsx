import { Trans } from '@lingui/macro';

import animation from '~assets/animations/search.json';
import AnimatedLottie from '~components/common/AnimatedLottie';
import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function Search() {
  return (
    <Wrapper testID="searchScreen">
      <Text variant="body">
        <Trans>Search</Trans>
      </Text>
      <AnimatedLottie animation={animation} />
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

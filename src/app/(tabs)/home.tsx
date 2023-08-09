import { Trans } from '@lingui/macro';
import capitalize from 'lodash/capitalize';
import * as Updates from 'expo-updates';

import { Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import config from '~constants/config';

export default function Home() {
  const runTypeMessage = Updates.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="body">
          <Trans>Home</Trans>
        </Text>

        <Text variant="body">
          <Trans>Environment: {capitalize(config.appEnv)}</Trans>
        </Text>

        <Text variant="body">{runTypeMessage}</Text>
      </Stack>
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

import { Trans } from '@lingui/macro';

import { FillButton, Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import * as Updates from 'expo-updates';
import { Button } from 'react-native';
import { capitalize } from 'lodash';
import config from '~constants/config';

export default function Home() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      console.log(`>> Here is the update: ${JSON.stringify(update)}`);
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="body">
          <Trans>Home</Trans>
        </Text>

        <Text variant="body">
          <Trans>Environment: {capitalize(config.appEnv)}</Trans>
        </Text>
        <Button title="Fetch update" onPress={onFetchUpdateAsync} />
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

import { StatusBar } from 'react-native';
import { Trans } from '@lingui/macro';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import appConfig from '../../../config/app.config';
import { styled } from '~styles';
import { Stack, FillButton, Text } from '~components/uikit';
import { StackScreenProps } from '~screens/types';
import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';

export default function LandingScreen({
  navigation,
}: StackScreenProps<'Landing'>) {
  const { colorMode } = useColorMode();
  const { toggleLocale, locale } = useI18n();

  function requestPerm() {
    request(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)'
            );
            break;
          case RESULTS.DENIED:
            console.log(
              '> The permission has not been requested / is denied but requestable'
            );
            break;
          case RESULTS.LIMITED:
            console.log(
              '> The permission is limited: some actions are possible'
            );
            break;
          case RESULTS.GRANTED:
            console.log('> The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log(
              '> The permission is denied and not requestable anymore'
            );
            break;
        }
      })
      .catch((error) => {
        console.log('> Failed to check permission', error);
      });
  }

  return (
    <>
      <Wrapper>
        <SafeArea>
          <Stack axis="y" spacing="large">
            <Text variant="title1">{appConfig.name}</Text>

            <Stack axis="x" spacing="normal" justify="center">
              <FillButton onPress={() => navigation.navigate('Login')}>
                <Trans>Login</Trans>
              </FillButton>

              <FillButton onPress={() => navigation.navigate('Signup')}>
                <Trans>Signup</Trans>
              </FillButton>
            </Stack>
          </Stack>

          <FillButton onPress={requestPerm}>
            <Trans>Request perm</Trans>
          </FillButton>

          <FillButton onPress={toggleLocale}>{locale}</FillButton>
        </SafeArea>
      </Wrapper>

      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
    </>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  padding: '$large',
  flexCenter: 'column',
});

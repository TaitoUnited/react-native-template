import { StatusBar } from 'react-native';
import { Trans } from '@lingui/macro';

import { styled } from '~styles';
import { Stack, FillButton } from '~components/uikit';
import { StackScreenProps } from '~screens/types';
import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';

export default function LandingScreen({
  navigation,
}: StackScreenProps<'Landing'>) {
  const { colorMode } = useColorMode();
  const { toggleLocale, locale } = useI18n();

  return (
    <>
      <Wrapper>
        <SafeArea>
          <Stack axis="y" spacing="normal">
            <FillButton onPress={() => navigation.navigate('Login')}>
              <Trans>Login</Trans>
            </FillButton>
            <FillButton onPress={() => navigation.navigate('Signup')}>
              <Trans>Signup</Trans>
            </FillButton>
            <FillButton onPress={toggleLocale}>{locale}</FillButton>
          </Stack>
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

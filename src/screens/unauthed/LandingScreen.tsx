import { Trans } from '@lingui/macro';

import { styled } from '~styles';
import { Stack, FillButton } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { useI18n } from '~services/i18n';

export default function LandingScreen({ navigation }: ScreenProps<'Landing'>) {
  const { toggleLocale, locale } = useI18n();

  return (
    <Wrapper>
      <SafeArea>
        <Stack axis="y" spacing="normal">
          <FillButton
            variant="neutral"
            onPress={() => navigation.navigate('Login')}
          >
            <Trans>Login</Trans>
          </FillButton>
          <FillButton
            variant="neutral"
            onPress={() => navigation.navigate('Signup')}
          >
            <Trans>Signup</Trans>
          </FillButton>
          <FillButton variant="neutral" onPress={toggleLocale}>
            {locale}
          </FillButton>
        </Stack>
      </SafeArea>
    </Wrapper>
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

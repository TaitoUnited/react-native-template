import { StatusBar, useWindowDimensions } from 'react-native';
import { Trans } from '@lingui/macro';

import { styled } from '~styles';
import { Stack, Text, ScaledImage } from '~components/uikit';
import { StackScreenProps } from '~screens/types';
import { LanguageIconButton } from '~components/landing/LanguageIconButton';

export default function LandingScreen({
  navigation,
}: StackScreenProps<'Landing'>) {
  const dimensions = useWindowDimensions();

  return (
    <>
      <Background source={require('../../images/login_background.jpg')}>
        <SafeArea>
          <Stack axis="y" spacing="xxxlarge">
            <Logo
              source={require('../../images/logo_text.png')}
              size={{ width: dimensions.width * 0.55 }}
            />

            <Stack axis="y" spacing="normal">
              <Button onPress={() => navigation.navigate('Login')}>
                <ButtonText variant="bodyBold" uppercase>
                  <Trans>Login</Trans>
                </ButtonText>
              </Button>

              <Button onPress={() => navigation.navigate('Signup')}>
                <ButtonText variant="bodyBold" uppercase>
                  <Trans>Signup</Trans>
                </ButtonText>
              </Button>
            </Stack>
          </Stack>
          <LanguageWrapper>
            <LanguageIconButton />
          </LanguageWrapper>
        </SafeArea>
      </Background>

      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </>
  );
}

const Background = styled('ImageBackground', {
  flex: 1,
});

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  padding: '$large',
  flexCenter: 'column',
  backgroundColor: 'rgba(0,0,0,0.65)',
});

const Logo = styled(ScaledImage, {
  alignSelf: 'center',
});

// NOTE: don't use UI kit button since this view shouldn't react to light/dark mode
const Button = styled('TouchableHighlight', {
  backgroundColor: '#fff',
  width: '100%',
  minHeight: 60,
  paddingHorizontal: '$large',
  flexCenter: 'row',
  borderRadius: '$full',
}).attrs(() => ({
  underlayColor: '#dddddd',
}));

// NOTE: use fixed text color to avoid text color change when changing light/dark mode
const ButtonText = styled(Text, {
  color: '#2b2b2b',
});

const LanguageWrapper = styled('View', {
  position: 'absolute',
  bottom: 20,
  right: 20,
});

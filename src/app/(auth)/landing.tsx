import { Trans, msg } from '@lingui/macro';
import { Link } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as DropdownMenu from 'zeego/dropdown-menu';

import StatusBar from '~components/common/StatusBar';
import { IconButton, Stack, Text } from '~components/uikit';
import { useI18n } from '~services/i18n';
import { styled, useTheme } from '~styles';

export default function Landing() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Wrapper>
      <ImageBackground source={require('~assets/landing_background.jpg')}>
        <TopSection
          style={{ paddingTop: Math.max(insets.top, theme.space.regular) }}
        >
          <TopSectionHeader>
            <LanguageSelector />
          </TopSectionHeader>

          <TopSectionBody>
            <Stack axis="y" spacing="medium">
              <BlackText variant="headingS" align="center" withLineHeight>
                <Trans>Welcome to</Trans>
              </BlackText>
              <BlackText variant="headingXl" align="center">
                <Trans>Taito Template</Trans>
              </BlackText>

              <BlackText
                variant="headingS"
                align="center"
                withLineHeight
                style={{ marginLeft: 16 }}
              >
                <Trans>By Taito United</Trans> 💚
              </BlackText>
            </Stack>
          </TopSectionBody>
        </TopSection>

        <BottomSection style={{ minHeight: height * 0.4 }}>
          <Stack axis="y" spacing="regular">
            <WhiteText variant="body" align="center" withLineHeight>
              ✨ <Trans>Start your journey</Trans> ✨
            </WhiteText>
            <Link href="/(auth)/login" asChild>
              <Button testID="loginButton">
                <WhiteText variant="bodyBold">
                  <Trans>Sign in</Trans>
                </WhiteText>
              </Button>
            </Link>

            <Stack
              axis="x"
              spacing="xs"
              align="center"
              style={{ alignSelf: 'center' }}
            >
              <Line />
              <WhiteText variant="overlineSmall">
                <Trans>Or</Trans>
              </WhiteText>
              <Line />
            </Stack>

            <Link href="/(auth)/signup" asChild>
              <Button testID="signInButton">
                <WhiteText variant="bodyBold">
                  <Trans>Create an account</Trans>
                </WhiteText>
              </Button>
            </Link>
          </Stack>
        </BottomSection>
      </ImageBackground>

      <StatusBar transparent />
    </Wrapper>
  );
}

function LanguageSelector() {
  const { _, setLocale } = useI18n();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton icon="globe" color="neutral" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="fi" onSelect={() => setLocale('fi')}>
          <DropdownMenu.ItemTitle>{_(msg`Finnish`)}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="en" onSelect={() => setLocale('en')}>
          <DropdownMenu.ItemTitle>{_(msg`English`)}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

// NOTE: it's often the case that the landing screen is very custom and doesn't
// adhere to the design system 100%. In that case, it's ok to use custom styles
// that are out of the design system like here we are using hard coded white color.

const Wrapper = styled('View', {
  position: 'relative',
  flex: 1,
  backgroundColor: '#000',
});

const ImageBackground = styled('ImageBackground', {
  flex: 1,
  justifyContent: 'flex-end',
  paddingHorizontal: '$xxs',
});

const BlackText = styled(Text, {
  color: 'rgba(0, 0, 0, 0.8)',
});

const WhiteText = styled(Text, {
  color: '#fff',
});

const TopSection = styled('View', {
  flex: 1,
});

const TopSectionHeader = styled('View', {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingHorizontal: '$regular',
});

const TopSectionBody = styled('View', {
  flex: 1,
  flexCenter: 'column',
  padding: '$large',
});

const BottomSection = styled('View', {
  padding: '$regular',
  paddingTop: '$large',
  backgroundColor: 'rgba(0, 0, 0, 0.65)',
  borderRadius: '$large',
});

const Button = styled('TouchableHighlight', {
  padding: '$medium',
  borderRadius: '$full',
  backgroundColor: 'rgba(0, 0, 0, 1)',
  flexCenter: 'row',
}).attrs(() => ({
  underlayColor: 'rgba(0, 0, 0, 0.6)',
}));

const Line = styled('View', {
  height: 1,
  width: 72,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
});

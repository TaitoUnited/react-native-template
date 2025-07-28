import { Trans, useLingui } from '@lingui/react/macro';
import { Link } from 'expo-router';
import {
  AccessibilityInfo,
  ImageBackground,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import * as DropdownMenu from 'zeego/dropdown-menu';

import LandingImage from '~assets/landing_background.jpg';
import StatusBar from '~components/common/StatusBar';
import { IconButton, Stack, Text } from '~components/uikit';
import { useI18n } from '~services/i18n';

export default function Landing() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useLingui();

  return (
    <View style={styles.wrapper}>
      <ImageBackground style={styles.imageBackground} source={LandingImage}>
        <View style={styles.topSection(insets.top)}>
          <View style={styles.topSectionHeader}>
            <LanguageSelector />
          </View>

          <Stack
            style={styles.topSectionBody}
            axis="y"
            spacing="medium"
            justify="center"
          >
            <Text style={styles.blackText} variant="headingS" align="center">
              <Trans>Welcome to</Trans>
            </Text>
            <Text style={styles.blackText} variant="headingXl" align="center">
              <Trans>Taito Template</Trans>
            </Text>
            <Text style={styles.blackText} variant="headingS" align="center">
              <Trans>By Taito United</Trans>
            </Text>
          </Stack>
        </View>

        <View style={styles.bottomSection(height)}>
          <Stack axis="y" spacing="regular" align="center">
            <Text color="surface" variant="body" align="center">
              ✨ <Trans>Start your journey</Trans> ✨
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(0, 0, 0, 0.6)"
                testID="loginButton"
                accessibilityHint={t`Navigates to the sign-in screen`}
              >
                <Text color="surface" variant="bodyBold">
                  <Trans>Sign in</Trans>
                </Text>
              </TouchableHighlight>
            </Link>

            <View style={styles.line} />
            <Text color="surface" variant="overlineSmall">
              <Trans>Or</Trans>
            </Text>
            <View style={styles.line} />

            <Link href="/(auth)/signup" asChild>
              <TouchableHighlight
                style={styles.button}
                underlayColor="rgba(0, 0, 0, 0.6)"
                testID="signInButton"
                accessibilityHint={t`Navigates to the sign-up screen`}
              >
                <Text color="surface" variant="bodyBold">
                  <Trans>Create an account</Trans>
                </Text>
              </TouchableHighlight>
            </Link>
          </Stack>
        </View>
      </ImageBackground>

      <StatusBar transparent />
    </View>
  );
}

function LanguageSelector() {
  const { changeLocale } = useI18n();
  const { t } = useLingui();

  return (
    // Note: This is not a11y optimized. It would only say "Button" when focused while using a screen reader.
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton icon="globe" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="fi"
          onSelect={() => {
            changeLocale('fi');
            AccessibilityInfo.announceForAccessibility(
              t`Language set to Finnish`
            );
          }}
        >
          <DropdownMenu.ItemTitle>{t`Finnish`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          key="en"
          onSelect={() => {
            changeLocale('en');
            AccessibilityInfo.announceForAccessibility(
              t`Language set to English`
            );
          }}
        >
          <DropdownMenu.ItemTitle>{t`English`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

// NOTE: it's often the case that the landing screen is very custom and doesn't
// adhere to the design system 100%. In that case, it's ok to use custom styles
// that are out of the design system like here we are using hard coded white color.

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: theme.space.xxs,
  },
  imageStyle: {
    height: '100%',
  },
  blackText: {
    color: 'rgba(0, 0, 0, 0.8)',
  },
  topSection: (paddingTop: number) => ({
    flex: 1,
    paddingTop,
  }),
  topSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.space.regular,
  },
  topSectionBody: {
    flex: 1,
    padding: theme.space.large,
  },
  bottomSection: (insetTop: number) => ({
    minHeight: Math.max(insetTop, theme.space.regular) * 0.4,
    padding: theme.space.regular,
    paddingTop: theme.space.large,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: theme.space.large,
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    marginBottom: theme.space.large,
  }),
  button: {
    padding: theme.space.medium,
    borderRadius: theme.radii.full,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  line: {
    height: 1,
    width: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
}));

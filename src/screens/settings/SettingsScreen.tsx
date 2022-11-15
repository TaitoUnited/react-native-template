import { Trans } from '@lingui/macro';

import { styled } from '~styles';
import { FillButton, Stack } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { useI18n } from '~services/i18n';
import { useColorMode } from '~services/color-mode';
import LogoutButton from '~components/auth/LogoutButton';
import { usePlaygroundStore } from '~screens/playground/helpers';

export default function SettingsScreen(_: ScreenProps<'Settings'>) {
  const { toggleLocale, locale } = useI18n();
  const { toggleColorMode, colorMode } = useColorMode();
  const setPlaygroundVisible = usePlaygroundStore(
    (s) => s.setPlaygroundVisible
  );

  const colorModeLabel =
    colorMode === 'light' ? <Trans>dark</Trans> : <Trans>light</Trans>;

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <FillButton variant="neutral" onPress={toggleLocale}>
          <Trans>Change language to</Trans>{' '}
          {locale === 'en' ? 'Finnish' : 'englanti'}
        </FillButton>
        <FillButton variant="neutral" onPress={toggleColorMode}>
          <Trans>Change theme to {colorModeLabel} mode</Trans>
        </FillButton>
        <FillButton
          variant="neutral"
          onPress={() => setPlaygroundVisible(true)}
        >
          <Trans>Open playground</Trans>
        </FillButton>
        <LogoutButton />
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

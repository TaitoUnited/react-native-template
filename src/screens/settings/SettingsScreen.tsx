import { t, Trans } from '@lingui/macro';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { styled } from '~styles';
import { FillButton, IconButton, Stack } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { useI18n } from '~services/i18n';
import { useColorMode } from '~services/color-mode';
import LogoutButton from '~components/auth/LogoutButton';
import { navigate, useHeaderOptions } from '~screens/utils';
import config from '~constants/config';

export default function SettingsScreen(_: ScreenProps<'Settings'>) {
  const { toggleLocale, locale } = useI18n();
  const { toggleColorMode, colorMode } = useColorMode();

  const colorModeLabel =
    colorMode === 'light' ? <Trans>dark</Trans> : <Trans>light</Trans>;

  useHeaderPlaygroundButton();

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
        <LogoutButton />
      </Stack>
    </Wrapper>
  );
}

function useHeaderPlaygroundButton() {
  useHeaderOptions({
    headerRight: () => {
      return config.appEnv !== 'prod' ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton icon="ellipsisVertical" size="medium" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              key="playground"
              onSelect={() => navigate('PlaygroundStack')}
            >
              <DropdownMenu.ItemTitle>
                {t`Open playground`}
              </DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon
                iosIconName="character.book.closed"
                androidIconName="library_books"
              />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : null;
    },
  });
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

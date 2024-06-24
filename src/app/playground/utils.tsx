import { msg } from '@lingui/macro';
import { router } from 'expo-router';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { IconButton } from '~components/uikit';
import config from '~constants/config';
import { useI18n } from '~services/i18n';
import { useTheme } from '~styles';
import { useHeaderOptions } from '~utils/navigation';

export function useHeaderPlaygroundButton() {
  const { _ } = useI18n();
  const theme = useTheme();

  useHeaderOptions({
    headerRight: () => {
      return config.appEnv !== 'prod' ? (
        <DropdownMenu.Root style={{ marginHorizontal: theme.space.regular }}>
          <DropdownMenu.Trigger>
            <IconButton icon="moreVert" size="normal" color="neutral" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              key="playground"
              onSelect={() => router.navigate('playground')}
            >
              <DropdownMenu.ItemTitle>
                {_(msg`Open playground`)}
              </DropdownMenu.ItemTitle>
              <DropdownMenu.ItemIcon
                ios={{ name: 'character.book.closed' }}
                androidIconName="library_books"
              />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : null;
    },
  });
}

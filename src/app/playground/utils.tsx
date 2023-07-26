import { t } from '@lingui/macro';
import { router } from 'expo-router';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { IconButton } from '~components/uikit';
import config from '~constants/config';
import { useHeaderOptions } from '~utils/navigation';

export function useHeaderPlaygroundButton() {
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
              onSelect={() => router.push('playground')}
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

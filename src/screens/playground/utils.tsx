import { t } from '@lingui/macro';
import { useNavigation } from '@react-navigation/native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { useHeaderOptions } from '~screens/utils';
import { IconButton } from '~components/uikit';
import config from '~constants/config';

export function useHeaderPlaygroundButton() {
  const navigation = useNavigation();

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
              onSelect={() => navigation.navigate('PlaygroundStack')}
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

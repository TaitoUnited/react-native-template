import { router } from 'expo-router';
import { View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { IconButton } from '~components/uikit';
import config from '~constants/config';
import { useTheme } from '~styles';
import { useHeaderOptions } from '~utils/navigation';

export function useHeaderPlaygroundButton() {
  const theme = useTheme();

  useHeaderOptions({
    headerRight: () => {
      return config.appEnv !== 'production' ? (
        <View style={{ marginHorizontal: theme.space.regular }}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton icon="moreVert" size="normal" color="neutral" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                key="playground"
                onSelect={() => router.navigate('/playground')}
              >
                <DropdownMenu.ItemTitle>Playground</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{ name: 'character.book.closed' }}
                  androidIconName="library_books"
                />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </View>
      ) : null;
    },
  });
}

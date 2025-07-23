import { router } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import * as DropdownMenu from 'zeego/dropdown-menu';

import { IconButton } from '~components/uikit';
import config from '~constants/config';
import { useHeaderOptions } from '~utils/navigation';

export function useHeaderPlaygroundButton() {
  useHeaderOptions({
    headerRight: () => {
      return config.appEnv !== 'production' ? (
        <View style={styles.wrapper}>
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

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    marginHorizontal: theme.space.regular,
  },
}));

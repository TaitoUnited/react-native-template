import { Stack as ExpoStack, router } from 'expo-router';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import MenuList, { Item } from '~components/common/MenuList';
import { IconButton, Stack, Text } from '~components/uikit';

export default function PlaygroundPage() {
  const items: Item[] = [
    { id: 'design-system', target: '/playground/design-system', label: 'Design System' }, // prettier-ignore
    { id: 'icons', target: '/playground/icons', label: 'Icons' },
    { id: 'inputs', target: '/playground/inputs', label: 'Inputs' },
    { id: 'buttons', target: '/playground/buttons', label: 'Buttons' },
    { id: 'bottom', target: '/playground/bottom-sheet', label: 'Bottom Sheet' },
    { id: 'layout', target: '/playground/layout', label: 'Layout' },
    { id: 'accordion', target: '/playground/accordion', label: 'Accordion' },
    { id: 'progress', target: '/playground/progress', label: 'Progress' },
    { id: 'image', target: '/playground/image', label: 'Image' },
    { id: 'toast', target: '/playground/toast', label: 'Toast' },
  ];

  if (__DEV__) items.push({ id: 'sandbox', target: '/playground/sandbox', label: 'Sandbox' }); // prettier-ignore

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExpoStack.Screen
        options={{
          title: 'Playground',
          headerLeft: () => (
            <IconButton
              icon="close"
              onPress={() => router.navigate('/settings')}
              color="neutral"
            />
          ),
        }}
      />
      <MenuList
        items={items.map((item) => ({
          id: item.id,
          label: item.label,
          target: item.target,
          leftSlot: (
            <Stack axis="x" spacing="none" style={styles.menuListItemLeftSlot}>
              <Text variant="bodyLargeBold" color="infoContrast">
                {item.label.slice(0, 2)}
              </Text>
            </Stack>
          ),
        }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
  menuListItemLeftSlot: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.regular,
    backgroundColor: theme.colors.infoMuted,
    ...theme.utils.flexCenter,
  },
}));

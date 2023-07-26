import { Stack } from 'expo-router';
import { FillButton } from '~components/uikit';
import { useColorMode } from '~services/color-mode';
import { useDefaultStackScreenOptions } from '~utils/navigation';

export default function PlaygroundLayout() {
  const screenOptions = useDefaultStackScreenOptions();
  const { colorScheme, setColorMode } = useColorMode();

  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        headerRight: () => (
          <FillButton
            variant="neutral"
            size="small"
            onPress={() => {
              setColorMode(colorScheme === 'light' ? 'dark' : 'light');
            }}
          >
            {colorScheme === 'light' ? 'Dark' : 'Light'}
          </FillButton>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Playground' }} />
      <Stack.Screen name="sandbox" options={{ title: 'Sandbox' }} />
      <Stack.Screen name="buttons" options={{ title: 'Buttons' }} />
      <Stack.Screen name="design-system" options={{ title: 'Design System' }} />
      <Stack.Screen name="icons" options={{ title: 'Icons' }} />
      <Stack.Screen name="inputs" options={{ title: 'Inputs' }} />
      <Stack.Screen name="layout" options={{ title: 'Layout' }} />
      <Stack.Screen name="toast" options={{ title: 'Toast' }} />
    </Stack>
  );
}

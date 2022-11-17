import { createStackNavigator } from '@react-navigation/stack';

import PlaygroundScreen from './PlaygroundScreen';
import SandboxScreen from './SandboxScreen';
import ButtonsScreen from './ButtonsScreen';
import DesignSystemScreen from './DesignSystemScreen';
import IconsScreen from './IconsScreen';
import InputsScreen from './InputsScreen';
import LayoutScreen from './LayoutScreen';
import ToastScreen from './ToastScreen';
import { FillButton } from '~components/uikit';
import { useColorMode } from '~services/color-mode';
import { useDefaultStackScreenOptions } from '~screens/utils';
import { ParamList } from '~screens/types';

const Stack = createStackNavigator<ParamList>();

export default function PlaygroundNavigator() {
  const screenOptions = useDefaultStackScreenOptions();
  const { colorScheme, setColorMode } = useColorMode();

  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Playground"
        options={{ title: 'Playground' }}
        component={PlaygroundScreen}
      />
      <Stack.Screen
        name="Sandbox"
        options={{ title: 'Sandbox' }}
        component={SandboxScreen}
      />
      <Stack.Screen
        name="Buttons"
        options={{ title: 'Buttons' }}
        component={ButtonsScreen}
      />
      <Stack.Screen
        name="DesignSystem"
        options={{ title: 'Design System' }}
        component={DesignSystemScreen}
      />
      <Stack.Screen
        name="Icons"
        options={{ title: 'Icons' }}
        component={IconsScreen}
      />
      <Stack.Screen
        name="Inputs"
        options={{ title: 'Inputs' }}
        component={InputsScreen}
      />
      <Stack.Screen
        name="Layout"
        options={{ title: 'Layout' }}
        component={LayoutScreen}
      />
      <Stack.Screen
        name="Toast"
        options={{ title: 'Toast' }}
        component={ToastScreen}
      />
    </Stack.Navigator>
  );
}

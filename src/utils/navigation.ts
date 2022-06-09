import { NavigationProp } from '@react-navigation/native';

export function getCurrentScreen(
  navigation: NavigationProp<any>,
): string | undefined {
  const { routes, index } = navigation.getState();
  let current: any = routes[index];

  // Go through the route tree until we find the current screen
  while (true) {
    const { state } = current;
    if (!state || !state.routes || state.index === undefined) break;

    const route = state.routes[state.index];
    if (!route) break;

    current = route;
  }

  return current?.name;
}

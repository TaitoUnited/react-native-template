import * as Stories from '../../components/uikit/index.stories';
import { DrawerOptions } from '~screens/root/DrawerNavigator';

export const drawerOptions: DrawerOptions = Object.keys(Stories).map((key) => {
  return {
    label: key
      .replace('Wrapper', '')
      .split(/(?=[A-Z])/)
      .join(' '),
    component: Stories[key as keyof typeof Stories],
  };
});

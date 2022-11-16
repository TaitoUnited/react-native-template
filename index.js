import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import { preventAutoHideAsync } from 'expo-splash-screen';
import App from './src/App';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// Instruct SplashScreen not to hide yet, we want to do this manually
preventAutoHideAsync().catch(() => {
  // Reloading the app might trigger some race conditions, ignore them
});

registerRootComponent(App);

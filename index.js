import 'react-native-reanimated';
import { registerRootComponent } from 'expo';
import { preventAutoHideAsync } from 'expo-splash-screen';
import App from './src/App';

// Instruct SplashScreen not to hide yet, we want to do this manually
preventAutoHideAsync().catch(() => {
  // Reloading the app might trigger some race conditions, ignore them
});

registerRootComponent(App);

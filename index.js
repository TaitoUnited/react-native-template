import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle', '[react-native-gesture-handler]']);

AppRegistry.registerComponent(appName, () => App);

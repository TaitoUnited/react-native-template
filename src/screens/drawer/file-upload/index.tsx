import { createStackNavigator } from '@react-navigation/stack';
import { t } from '@lingui/macro';

import FileUploadScreen from './FileUploadScreen';
import { useDefaultStackScreenInDrawerOptions } from '~screens/utils';

const FileUploadStack = createStackNavigator();

export default function FileUploadNavigator() {
  const screenOptions = useDefaultStackScreenInDrawerOptions();

  return (
    <FileUploadStack.Navigator screenOptions={screenOptions}>
      <FileUploadStack.Screen
        name="FileUpload"
        options={{ title: t`FileUpload` }}
        component={FileUploadScreen}
      />
    </FileUploadStack.Navigator>
  );
}

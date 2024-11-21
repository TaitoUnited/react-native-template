import { Alert, Platform } from 'react-native';

const alertPolyfill = (
  title: string,
  description: string,
  options: {
    text: string;
    onPress: () => void;
    style?: string;
  }[]
) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join('\n')
  );

  if (result) {
    const confirmOption = options.find(({ style }) => style !== 'cancel');
    if (confirmOption) confirmOption.onPress();
  } else {
    const cancelOption = options.find(({ style }) => style === 'cancel');
    if (cancelOption) cancelOption.onPress();
  }
};

export const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert;

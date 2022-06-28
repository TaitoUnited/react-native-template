import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AppState, AppStateStatus, BackHandler, Keyboard } from 'react-native';

export function useKeyboardVisibility() {
  const [isKeyboardOpen, setKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyboardDidShow = () => setKeyboardOpen(true);
    const onKeyboardDidHide = () => setKeyboardOpen(false);

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardOpen;
}

export function useAppForegroundEffect(callback: () => void) {
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callback();
      }

      appState.current = nextAppState;
    };

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [callback]);
}

export function useBackHandler(callback: () => any) {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        callback();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused, callback]);
}

import { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AppState, AppStateStatus, BackHandler, Keyboard } from 'react-native';

export function useKeyboardVisibility() {
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const onKeyboardDidShow = () => setKeyboardOpen(true);
    const onKeyboardDidHide = () => setKeyboardOpen(false);

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardOpen;
}

export function useAppForegroundEffect(callback: () => void) {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        callback();
      }

      appState.current = nextAppState;
    };

    const handler = AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      handler.remove();
    };
  }, [callback]);
}

export function useBackHandler(callback: () => any) {
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        callback();
        return true;
      }
      return false;
    };

    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => handler.remove();
  }, [isFocused, callback]);
}

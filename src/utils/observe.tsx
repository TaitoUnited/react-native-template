import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, BackHandler, Keyboard } from 'react-native';

import { useEffectEvent } from './common';

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

export function useAppState(callbacks: {
  onActive?: () => any;
  onInactive?: () => any;
}) {
  const appState = useRef(AppState.currentState);

  const onAppStateChange = useEffectEvent((nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      callbacks.onActive?.();
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      callbacks.onInactive?.();
    }

    appState.current = nextAppState;
  });

  useEffect(() => {
    callbacks.onActive?.();
    const sub = AppState.addEventListener('change', onAppStateChange);
    return () => sub.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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

import type { ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

import ErrorBoundary from '~components/common/ErrorBoundary';
import NavigationThemeProvider from '~components/common/NavigationThemeProvider';
import Toaster from '~components/common/Toaster';
import { I18nProvider } from '~services/i18n';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nProvider>
        <ErrorBoundary>
          <NavigationThemeProvider>
            <KeyboardProvider>
              <View style={styles.appWrapper}>
                {children}
                <Toaster />
              </View>
            </KeyboardProvider>
          </NavigationThemeProvider>
        </ErrorBoundary>
      </I18nProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme) => ({
  appWrapper: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
}));

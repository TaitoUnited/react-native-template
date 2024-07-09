import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import ErrorBoundary from '~components/common/ErrorBoundary';
import NavigationThemeProvider from '~components/common/NavigationThemeProvider';
import Toaster from '~components/common/Toaster';
import { ColorModeProvider } from '~services/color-mode';
import { I18nProvider } from '~services/i18n';
import { styled } from '~styles';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nProvider>
        <ColorModeProvider>
          <ErrorBoundary>
            <NavigationThemeProvider>
              <KeyboardProvider>
                <AppWrapper>
                  {children}
                  <Toaster />
                </AppWrapper>
              </KeyboardProvider>
            </NavigationThemeProvider>
          </ErrorBoundary>
        </ColorModeProvider>
      </I18nProvider>
    </GestureHandlerRootView>
  );
}

const AppWrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

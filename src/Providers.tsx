import type { ReactNode } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import ErrorBoundary from '~components/common/ErrorBoundary';
import NavigationThemeProvider from '~components/common/NavigationThemeProvider';
import Toaster from '~components/common/Toaster';
import { ColorModeProvider } from '~services/color-mode';
import { I18nProvider } from '~services/i18n';
import { styled } from '~styles';

export default function Providers({ children }: { children: ReactNode }) {
  return (
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
  );
}

const AppWrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

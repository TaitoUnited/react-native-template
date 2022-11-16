import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { styled } from '~styles';
import { ColorModeProvider } from '~services/color-mode';
import { I18nProvider } from '~services/i18n';
import Toaster from '~components/common/Toaster';
import ErrorBoundary from '~components/common/ErrorBoundary';
import NavigationProvider from '~components/common/NavigationProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <ColorModeProvider>
        <ErrorBoundary>
          <NavigationProvider>
            <AppWrapper>
              <I18nProvider>
                {children}
                <Toaster />
              </I18nProvider>
            </AppWrapper>
          </NavigationProvider>
        </ErrorBoundary>
      </ColorModeProvider>
    </SafeAreaProvider>
  );
}

const AppWrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

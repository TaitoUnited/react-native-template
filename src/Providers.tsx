import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ColorModeProvider } from '~services/color-mode';
import { I18nProvider } from '~services/i18n';
import Toaster from '~components/common/Toaster';
import ErrorBoundary from '~components/common/ErrorBoundary';
import NavigationProvider from '~components/common/NavigationProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ColorModeProvider>
          <ErrorBoundary>
            <NavigationProvider>
              {children}
              <Toaster />
            </NavigationProvider>
          </ErrorBoundary>
        </ColorModeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}

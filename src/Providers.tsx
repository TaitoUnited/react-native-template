import type { ReactNode } from 'react';

import { styled } from '~styles';
import { ColorModeProvider } from '~services/color-mode';
import { I18nProvider } from '~services/i18n';
import Toaster from '~components/common/Toaster';
import ErrorBoundary from '~components/common/ErrorBoundary';
import { AuthProvider } from '~context/auth';
import NavigationThemeProvider from '~components/common/NavigationThemeProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ColorModeProvider>
        <ErrorBoundary>
          <NavigationThemeProvider>
            <AppWrapper>
              <AuthProvider>
                {children}
                <Toaster />
              </AuthProvider>
            </AppWrapper>
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

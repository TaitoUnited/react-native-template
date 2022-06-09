import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { I18nProvider } from '~services/i18n';
import { ColorModeProvider } from '~services/theming';
import { ClientProvider } from '~graphql';
import ErrorBoundary from '~components/common/ErrorBoundary';
import Toaster from '~components/common/Toaster';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <ColorModeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ErrorBoundary>
              <ClientProvider>
                <NavigationContainer>
                  {children}
                  <Toaster />
                </NavigationContainer>
              </ClientProvider>
            </ErrorBoundary>
          </GestureHandlerRootView>
        </ColorModeProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}

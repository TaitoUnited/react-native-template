import { Trans } from '@lingui/react/macro';
import { Component, type ReactNode } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Stack, Text } from '~components/uikit';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

// NOTE: error boundaries have to use class components for some reason...
export default class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
  };

  componentDidCatch(error: Error) {
    console.log('> ErrorBoundary error', error);
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    return error ? <ErrorView /> : children;
  }
}

function ErrorView() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Stack axis="y" spacing="regular" align="center">
          <Text variant="bodyLargeBold" align="center">
            <Trans>Something went wrong</Trans>
          </Text>
          <Text variant="body" align="center">
            <Trans>Please try restarting the application.</Trans>
          </Text>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

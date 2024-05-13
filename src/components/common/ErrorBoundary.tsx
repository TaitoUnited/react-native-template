import { Trans } from '@lingui/macro';
import { Component, ReactNode } from 'react';

import { Stack, Text } from '~components/uikit';
import { styled } from '~styles';

interface Props {
  children: ReactNode;
}

interface State {
  error: any;
}

// NOTE: error boundaries have to use class components for some reason...
export default class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
  };

  componentDidCatch(error: any) {
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
    <SafeArea>
      <Scroller>
        <Stack axis="y" spacing="regular" align="center">
          <Text variant="bodyLargeBold" align="center">
            <Trans>Something went wrong</Trans>
          </Text>
          <Text variant="body" align="center">
            <Trans>Please try restarting the application.</Trans>
          </Text>
        </Stack>
      </Scroller>
    </SafeArea>
  );
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  backgroundColor: '$background',
});

const Scroller = styled('ScrollView', {
  flex: 1,
}).attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

import { ActivityIndicator } from 'react-native';

import { styled, useTheme } from '~styles';

export default function LoadingScreen() {
  const theme = useTheme();

  return (
    <Wrapper>
      <ActivityIndicator size="large" color={theme.colors.text} />
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  flexCenter: 'column',
  backgroundColor: '$background',
});

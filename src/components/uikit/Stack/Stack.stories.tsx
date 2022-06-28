import { View } from 'react-native';
import { Stack } from './Stack';
import { range } from '../utils';
import { Text } from '../Text/Text';
import { StoryWrapper } from '../StoriesUtils';
import { styled } from '~styles/styled';

export function Horizontal() {
  return (
    <Wrapper>
      <Title variant="title3">HORIZONTAL</Title>
      <Stack axis="x" spacing="normal">
        {range(5).map((i) => (
          <View
            key={i}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgba(150, 150, 150, 0.5)',
            }}
          />
        ))}
      </Stack>
    </Wrapper>
  );
}

export function Vertical() {
  return (
    <Wrapper>
      <Title variant="title3">VERTICAL</Title>
      <Stack axis="y" spacing="normal">
        {range(5).map((i) => (
          <View
            key={i}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgba(150, 150, 150, 0.5)',
            }}
          />
        ))}
      </Stack>
    </Wrapper>
  );
}

export function StackWrapper() {
  return (
    <StoryWrapper>
      <Stack spacing="normal">
        <Horizontal />
        <Vertical />
      </Stack>
    </StoryWrapper>
  );
}

const Wrapper = styled(View, {
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$medium',
});

const Title = styled(Text, {
  marginBottom: '$medium',
});

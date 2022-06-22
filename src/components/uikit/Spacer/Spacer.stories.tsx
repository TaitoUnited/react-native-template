import { View } from 'react-native';
import { Spacer } from './Spacer';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { StoryWrapper } from '../StoriesUtils';
import { styled } from '~styles/styled';

export function Horizontal() {
  return (
    <Wrapper>
      <Title variant="title3">HORIZONTAL</Title>
      <Stack axis="x" spacing="normal">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
        <Spacer axis="x" size="large" />
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
      </Stack>
    </Wrapper>
  );
}

export function Vertical() {
  return (
    <Wrapper>
      <Title variant="title3">VERTICAL</Title>
      <Stack axis="y" spacing="normal">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
        <Spacer axis="y" size="large" />
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
          }}
        />
      </Stack>
    </Wrapper>
  );
}

export function SpacerWrapper() {
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

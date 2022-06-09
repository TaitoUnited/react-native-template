import React from 'react';
import { styled } from '~styles';
import { Text } from '~components/uikit';

export default function CoursesScreen() {
  return (
    <Wrapper>
      <Text>Courses Screen</Text>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function TimerScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a timer here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

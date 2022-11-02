import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function HomeScreen() {
  return (
    <Wrapper>
      <Text variant="body">Upcoming events</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

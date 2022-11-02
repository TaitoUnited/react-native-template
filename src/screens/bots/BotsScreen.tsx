import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function BotsScreen() {
  return (
    <Wrapper>
      <Text variant="body">Pizza</Text>
      <Text variant="body">Music</Text>
      <Text variant="body">Lunch</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

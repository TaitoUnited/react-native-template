import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function FrisbeeScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a Frisbee here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

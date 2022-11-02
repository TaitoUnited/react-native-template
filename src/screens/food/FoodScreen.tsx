import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function FoodScreen() {
  return (
    <Wrapper>
      <Text variant="body">What Food is missing at the office?</Text>
      <Text variant="body">Add a form</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

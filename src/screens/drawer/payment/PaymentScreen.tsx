import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function PaymentScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a payment form here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

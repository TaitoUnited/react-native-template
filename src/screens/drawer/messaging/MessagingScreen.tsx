import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function MessagingScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a Messaging here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

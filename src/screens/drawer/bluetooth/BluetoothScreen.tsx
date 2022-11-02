import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function BluetoothScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a bluetooth here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

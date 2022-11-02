import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function QrScannerScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a qr scanner here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

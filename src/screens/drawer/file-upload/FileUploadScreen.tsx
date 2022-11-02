import { Text } from '~components/uikit';
import { styled } from '~styles';

export default function FileUploadScreen() {
  return (
    <Wrapper>
      <Text variant="body">Add a FileUpload here</Text>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

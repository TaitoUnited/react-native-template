import { styled } from '~styles';
import { Text } from '~components/uikit';
import { ScreenProps } from '~screens/types';

export default function InputsScreen(_: ScreenProps<'Inputs'>) {
  return (
    <Wrapper>
      <Text variant="body">Inputs</Text>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

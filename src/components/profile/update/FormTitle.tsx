import { styled } from '../../../styles';
import { Text } from '~components/uikit';

export default function FormTitle({ children }: { children: React.ReactNode }) {
  return <Title variant="title2">{children}</Title>;
}

const Title = styled(Text, {
  marginTop: '$medium',
  marginBottom: '$small',
});

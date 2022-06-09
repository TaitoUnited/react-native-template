import { Text } from '../Text';

export default function RequiredAsterisk({ visible }: { visible: boolean }) {
  return (
    <Text color="error" variant="bodyBold">
      {visible ? '*' : ''}
    </Text>
  );
}

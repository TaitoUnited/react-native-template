import { Button, Card, IconButton, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function Buttons() {
  function handlePress() {
    console.log('Pressed');
  }

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Card>
          <Stack axis="y" spacing="small">
            <Text variant="headingS">Sizes</Text>

            <Button variant="filled" size="large" onPress={handlePress}>
              Large
            </Button>
            <Button variant="filled" size="normal" onPress={handlePress}>
              Medium
            </Button>
            <Button variant="filled" size="small" onPress={handlePress}>
              Small
            </Button>
          </Stack>
        </Card>
        <Card>
          <Stack axis="y" spacing="small">
            <Text variant="headingS">Variants</Text>
            <Button variant="filled" onPress={handlePress}>
              Filled button
            </Button>
            <Button variant="soft" onPress={handlePress}>
              Soft button
            </Button>
            <Button variant="outlined" onPress={handlePress}>
              Outline button
            </Button>
            <Button variant="plain" onPress={handlePress}>
              Plain button
            </Button>
          </Stack>
        </Card>

        <Card>
          <Stack axis="y" spacing="small">
            <Text variant="headingS">Colors</Text>
            <Button variant="filled" color="primary" onPress={handlePress}>
              Primary button
            </Button>
            <Button variant="filled" color="success" onPress={handlePress}>
              Success button
            </Button>
            <Button variant="filled" color="error" onPress={handlePress}>
              Error button
            </Button>
          </Stack>
        </Card>
        <Card>
          <Stack axis="y" spacing="small">
            <Text variant="headingS">With icon</Text>

            <Button
              variant="outlined"
              iconLeading="camera"
              onPress={handlePress}
            >
              Leading icon
            </Button>
            <Button
              variant="outlined"
              iconTrailing="chevronRight"
              onPress={handlePress}
            >
              Trailing icon
            </Button>
          </Stack>
        </Card>
        <Card>
          <Stack axis="y" spacing="regular">
            <Text variant="headingS">Icon buttons</Text>

            <Stack axis="x" spacing="medium">
              <IconButton size="large" icon="globe" color="neutral" />
              <IconButton size="large" icon="eye" color="primary" />
              <IconButton size="large" icon="fingerprint" color="success" />
              <IconButton size="large" icon="close" color="error" />
            </Stack>

            <Stack axis="x" spacing="medium">
              <IconButton icon="globe" color="neutral" />
              <IconButton icon="eye" color="primary" />
              <IconButton icon="fingerprint" color="success" />
              <IconButton icon="close" color="error" />
            </Stack>

            <Stack axis="x" spacing="medium">
              <IconButton size="small" icon="globe" color="neutral" />
              <IconButton size="small" icon="eye" color="primary" />
              <IconButton size="small" icon="fingerprint" color="success" />
              <IconButton size="small" icon="close" color="error" />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
    paddingBottom: 100,
  },
}));

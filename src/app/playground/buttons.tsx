import {
  FillButton,
  IconButton,
  OutlineButton,
  Stack,
  Text,
} from '~components/uikit';
import { styled } from '~styles';

export default function Buttons() {
  function handlePress() {
    console.log('Pressed');
  }

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="small">
          <Text variant="headingS">Sizes</Text>

          <FillButton variant="neutral" size="large" onPress={handlePress}>
            Large
          </FillButton>
          <FillButton variant="neutral" size="medium" onPress={handlePress}>
            Medium
          </FillButton>
          <FillButton variant="neutral" size="small" onPress={handlePress}>
            Small
          </FillButton>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="headingS">Types</Text>
          <FillButton variant="neutral" onPress={handlePress}>
            Fill button
          </FillButton>
          <OutlineButton variant="neutral" onPress={handlePress}>
            Outline button
          </OutlineButton>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="headingS">Variants</Text>

          <FillButton variant="neutral" onPress={handlePress}>
            Neutral
          </FillButton>
          <OutlineButton variant="neutral" onPress={handlePress}>
            Neutral
          </OutlineButton>
          <FillButton variant="primary" onPress={handlePress}>
            Primary
          </FillButton>
          <OutlineButton variant="primary" onPress={handlePress}>
            Primary
          </OutlineButton>
          <FillButton variant="info" onPress={handlePress}>
            Info
          </FillButton>
          <OutlineButton variant="info" onPress={handlePress}>
            Info
          </OutlineButton>
          <FillButton variant="warn" onPress={handlePress}>
            Warning
          </FillButton>
          <OutlineButton variant="warn" onPress={handlePress}>
            Warning
          </OutlineButton>
          <FillButton variant="danger" onPress={handlePress}>
            Danger
          </FillButton>
          <OutlineButton variant="danger" onPress={handlePress}>
            Danger
          </OutlineButton>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="headingS">With icon</Text>

          <FillButton variant="neutral" icon="camera" onPress={handlePress}>
            Next to label
          </FillButton>
          <OutlineButton
            variant="neutral"
            icon="download"
            iconSide="start"
            onPress={handlePress}
          >
            Next to label
          </OutlineButton>
          <FillButton
            variant="neutral"
            icon="calendarMonth"
            iconPosition="edge"
            onPress={handlePress}
          >
            At the edge
          </FillButton>
          <OutlineButton
            variant="neutral"
            icon="camera"
            iconSide="start"
            iconPosition="edge"
            onPress={handlePress}
          >
            At the edge
          </OutlineButton>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Icon buttons</Text>

          <Stack axis="x" spacing="medium">
            <IconButton size="large" icon="globe" color="text" />
            <IconButton size="large" icon="eye" color="primary" />
            <IconButton size="large" icon="fingerprint" color="info" />
            <IconButton size="large" icon="close" color="error" />
            <IconButton size="large" icon="bell" color="warn" />
          </Stack>

          <Stack axis="x" spacing="medium">
            <IconButton icon="globe" color="text" />
            <IconButton icon="eye" color="primary" />
            <IconButton icon="fingerprint" color="info" />
            <IconButton icon="close" color="error" />
            <IconButton icon="bell" color="warn" />
          </Stack>

          <Stack axis="x" spacing="medium">
            <IconButton size="small" icon="globe" color="text" />
            <IconButton size="small" icon="eye" color="primary" />
            <IconButton size="small" icon="fingerprint" color="info" />
            <IconButton size="small" icon="close" color="error" />
            <IconButton size="small" icon="bell" color="warn" />
          </Stack>
        </Stack>
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

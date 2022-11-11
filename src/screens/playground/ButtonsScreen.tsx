import { styled } from '~styles';
import { ScreenProps } from '~screens/types';

import {
  FillButton,
  IconButton,
  OutlineButton,
  Stack,
  Text,
} from '~components/uikit';

export default function ButtonsScreen(_: ScreenProps<'Buttons'>) {
  function handlePress() {
    console.log('Pressed');
  }

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="small">
          <Text variant="overline">Button sizes</Text>
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
          <Text variant="overline">Button types</Text>
          <FillButton variant="neutral" onPress={handlePress}>
            Fill button
          </FillButton>
          <OutlineButton variant="neutral" onPress={handlePress}>
            Outline button
          </OutlineButton>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="overline">Button variants</Text>
          <FillButton variant="neutral" onPress={handlePress}>
            Neutral
          </FillButton>
          <FillButton variant="primary" onPress={handlePress}>
            Primary
          </FillButton>
          <FillButton variant="info" onPress={handlePress}>
            Info
          </FillButton>
          <FillButton variant="warn" onPress={handlePress}>
            Warning
          </FillButton>
          <FillButton variant="danger" onPress={handlePress}>
            Danger
          </FillButton>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="overline">Button icons</Text>
          <FillButton variant="neutral" icon="camera" onPress={handlePress}>
            Next to label
          </FillButton>
          <FillButton
            variant="neutral"
            icon="download"
            iconSide="start"
            onPress={handlePress}
          >
            Next to label
          </FillButton>
          <FillButton
            variant="neutral"
            icon="calendar"
            iconPosition="edge"
            onPress={handlePress}
          >
            At the edge
          </FillButton>
          <FillButton
            variant="neutral"
            icon="bluetoothFilled"
            iconSide="start"
            iconPosition="edge"
            onPress={handlePress}
          >
            At the edge
          </FillButton>
        </Stack>

        <Stack axis="y" spacing="normal">
          <Text variant="overline">Icon buttons</Text>
          <Stack axis="x" spacing="medium">
            <IconButton icon="languageGlobe" color="text" />
            <IconButton icon="eyeFilled" color="primary" />
            <IconButton icon="fingerPrint" color="info" />
            <IconButton icon="x" color="error" />
            <IconButton icon="bell" color="warnText" />
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
    padding: p.theme.space.normal,
    paddingBottom: 200,
  },
}));

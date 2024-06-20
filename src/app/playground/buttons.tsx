import { Button, Card, IconButton, Stack, Text } from '~components/uikit';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  IconButtonProps,
} from '~components/uikit/buttons/types';
import { styled } from '~styles';

export default function Buttons() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <ButtonExamples />
        <IconButtonExamples title="Icon buttons" />
        <IconButtonExamples title="Loading Icon buttons" loading />
        <IconButtonExamples title="Disabled Icon buttons" disabled />
      </Stack>
    </Wrapper>
  );
}

function handlePress() {
  console.log('Pressed');
}

function getButtonText(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <Stack axis="y" spacing="small">
        <Text variant="headingS">{title}</Text>
        {children}
      </Stack>
    </Card>
  );
}

function ButtonExamples() {
  const sizes: ButtonSize[] = ['large', 'normal', 'small'];
  const variants: ButtonVariant[] = ['filled', 'soft', 'outlined', 'plain'];
  const colors: ButtonColor[] = ['primary', 'success', 'error'];

  return (
    <Stack axis="y" spacing="large">
      <Section title="Sizes">
        {sizes.map((size) => (
          <Button key={size} variant="filled" size={size} onPress={handlePress}>
            {getButtonText(size)}
          </Button>
        ))}
      </Section>

      <Section title="Variants">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} onPress={handlePress}>
            {getButtonText(variant)} button
          </Button>
        ))}
      </Section>

      <Section title="Colors">
        {colors.map((color) => (
          <Button
            key={color}
            variant="filled"
            color={color}
            onPress={handlePress}
          >
            {getButtonText(color)} button
          </Button>
        ))}
      </Section>

      <Section title="Loading">
        {variants.map((variant) => (
          <Button key={variant} variant={variant} onPress={handlePress} loading>
            {getButtonText(variant)} Loading
          </Button>
        ))}
      </Section>

      <Section title="Disabled">
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            onPress={handlePress}
            disabled
          >
            {getButtonText(variant)} disabled
          </Button>
        ))}
      </Section>

      <Section title="With icon">
        <Button variant="outlined" icon="camera" onPress={handlePress}>
          Leading icon
        </Button>
        <Button
          variant="outlined"
          icon="chevronRight"
          iconPlacement="end"
          onPress={handlePress}
        >
          Trailing icon
        </Button>
      </Section>
    </Stack>
  );
}

function IconButtonExamples({
  title,
  loading = false,
  disabled = false,
}: {
  title: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  const sizes: ButtonSize[] = ['large', 'normal', 'small'];
  const colors: IconButtonProps['color'][] = [
    'neutral',
    'primary',
    'success',
    'error',
  ];

  return (
    <Section title={title}>
      {sizes.map((size, sizeIndex) => (
        <Stack key={sizeIndex} axis="x" spacing="medium">
          {colors.map((color) => (
            <IconButton
              key={color}
              size={size}
              icon="globe"
              color={color}
              loading={loading}
              disabled={disabled}
            />
          ))}
        </Stack>
      ))}
    </Section>
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

import { Accordion, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function Accordions() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="2xl">
        <Stack axis="y" spacing="small">
          <Text variant="headingS">Accordion</Text>
          <Accordion initialOpen title="Accordion Heading">
            <AccordionContent />
          </Accordion>
        </Stack>

        <Stack axis="y" spacing="small">
          <Text variant="headingS">Accordion with icon</Text>
          <Accordion
            initialOpen
            title="Accordion Heading"
            icon="checkCircle"
            iconColor="success"
          >
            <AccordionContent />
          </Accordion>
        </Stack>
      </Stack>
    </Wrapper>
  );
}

function AccordionContent() {
  return (
    <Stack axis="y" spacing="small">
      <Text>Accordion Content</Text>
    </Stack>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));

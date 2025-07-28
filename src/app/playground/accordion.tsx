import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Accordion, Stack, Text } from '~components/uikit';

export default function Accordions() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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
    </ScrollView>
  );
}

function AccordionContent() {
  return (
    <Stack axis="y" spacing="small">
      <Text>Accordion Content</Text>
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
}));

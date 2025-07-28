import { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  Checkbox,
  DateInput,
  Radio,
  SearchInput,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
} from '~components/uikit';

export default function Inputs() {
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [selectedSingle, setSelectedSingle] = useState('');
  const [text, setText] = useState('');
  const [radio, setRadio] = useState('1');
  const [checked, setChecked] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('bar');
  const [date, setDate] = useState(new Date());

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="xl">
        <SearchInput
          label="Search input"
          value={text}
          onChange={setText}
          message="Find your favorite fruit"
          suggestions={['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry']}
        />
        <TextInput label="Text input" value={text} onChange={setText} />
        <TextInput
          label="Secure input"
          value={text}
          onChange={setText}
          secureTextEntry
        />
        <TextInput
          label="Limited characters input"
          value={text}
          onChange={setText}
          showCharacterLimit
          maxLength={10}
          message="Max 10 characters"
        />
        <TextInput
          label="Mandatory Text input"
          showRequiredAsterisk
          isRequired
          value={text}
          onChange={setText}
          message="This field is mandatory"
        />
        <TextInput
          label="Text input with label icon"
          labelIcon="personEdit"
          value={text}
          onChange={setText}
        />
        <TextInput
          label="Disabled input"
          value={text}
          onChange={setText}
          isDisabled
        />
        <TextInput
          label="Invalid input"
          value={text}
          onChange={setText}
          isValid={false}
          message="This is an error message"
        />

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Date Input</Text>
          <DateInput
            value={date}
            onChange={setDate}
            label="Birthday"
            mode="date"
          />
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Select</Text>

          <Select
            label="Single value"
            value={selectedSingle}
            onChange={setSelectedSingle}
            options={Array.from({ length: 10 }).map((_, i) => ({
              label: `Option ${i + 1}`,
              value: `${i + 1}`,
            }))}
          />

          <Select
            label="Multiple values"
            multiple
            value={selectedMultiple}
            onChange={setSelectedMultiple}
            options={Array.from({ length: 100 }).map((_, i) => ({
              label: `Option ${i + 1}`,
              value: `${i + 1}`,
            }))}
          />
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Checkbox</Text>

          <Checkbox
            label="Check me"
            value="abc"
            checked={checked}
            onChange={() => setChecked((p) => !p)}
          />
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Radio</Text>

          <Radio
            label="Radio 1"
            value="1"
            checked={radio === '1'}
            onChange={() => setRadio('1')}
          />

          <Radio
            label="Radio 2"
            value="2"
            checked={radio === '2'}
            onChange={() => setRadio('2')}
          />

          <Radio
            label="Radio 3"
            value="3"
            checked={radio === '3'}
            onChange={() => setRadio('3')}
          />
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Segmented Control</Text>

          <SegmentedControl
            onSelect={setSelectedSegment}
            selected={selectedSegment}
            segments={[
              { label: 'Foo', value: 'foo' },
              { label: 'Bar', value: 'bar' },
              { label: 'Baz', value: 'baz' },
              { label: 'Dax', value: 'dax' },
            ]}
          />
        </Stack>
      </Stack>
    </ScrollView>
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

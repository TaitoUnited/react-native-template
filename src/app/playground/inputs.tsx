import { useState } from 'react';

import { styled } from '~styles';
import {
  Checkbox,
  DateInput,
  Radio,
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
    <Wrapper>
      <Stack axis="y" spacing="xl">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Text Input</Text>
          <TextInput label="Text input" value={text} onChange={setText} />
        </Stack>

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

import { useState } from 'react';

import { styled } from '~styles';
import { ScreenProps } from '~screens/types';
import { Checkbox, Radio, Select, Stack, TextInput } from '~components/uikit';

export default function InputsScreen(_: ScreenProps<'Inputs'>) {
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [selectedSingle, setSelectedSingle] = useState('');
  const [text, setText] = useState('');
  const [radio, setRadio] = useState('1');
  const [checked, setChecked] = useState(false);

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <TextInput label="Text input" value={text} onChange={setText} />

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

        <Checkbox
          label="Check me"
          value="abc"
          checked={checked}
          onChange={() => setChecked((p) => !p)}
        />
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
    paddingBottom: 100,
  },
}));

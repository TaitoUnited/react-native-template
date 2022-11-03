import { useState } from 'react';
import { styled } from '~styles';

import {
  Checkbox,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
} from '~components/uikit';

export default function HomeScreen() {
  // const [value, setValue] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');
  const [radio, setRadio] = useState('1');
  const [check, setCheck] = useState('n');

  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="small">
          <Text variant="title1">Home</Text>
          <Text variant="bodyLargeBold">UI kit components</Text>
        </Stack>

        <Select
          label="Test"
          value={selected}
          onChange={setSelected}
          options={Array.from({ length: 100 }).map((_, i) => ({
            label: `Option ${i + 1}`,
            value: `${i + 1}`,
          }))}
        />

        <TextInput label="Text input" value={text} onChange={setText} />

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
          value="y"
          checked={check === 'y'}
          onChange={() => setCheck((p) => (p === 'y' ? 'n' : 'y'))}
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
  },
}));

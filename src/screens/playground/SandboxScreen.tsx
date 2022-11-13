import { useState } from 'react';

import type { ScreenProps } from '~screens/types';
import { styled } from '~styles';
import { Text, Stack, SegmentedControl } from '~components/uikit';

export default function SandboxScreen(_: ScreenProps<'Sandbox'>) {
  const [selectedSegment, setSelectedSegment] = useState('bar');

  return (
    <Wrapper>
      <Stack axis="y" spacing="medium">
        <Text variant="body" withLineHeight>
          You can play around with various components here if you don&lsquo;t
          want to add a new screen for it in the playground.
        </Text>

        <Stack axis="y" spacing="medium">
          <Text variant="title2">Segment Control</Text>

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
    padding: p.theme.space.normal,
    paddingBottom: 100,
  },
}));

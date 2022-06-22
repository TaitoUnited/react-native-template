import { t } from '@lingui/macro';
import { useState } from 'react';
import { FillButton, Select, Stack, Spacer } from '..';
import { StoryWrapper } from '../StoriesUtils';
import { capitalize } from '~components/uikit/utils';
import type { ButtonProps } from '~components/uikit/Buttons/types';

const buttons: NonNullable<ButtonProps['variant']>[] = ['primary', 'danger'];

const sizes: NonNullable<ButtonProps['size']>[] = ['small', 'medium', 'large'];

function AllVariants() {
  return (
    <Stack axis="y" spacing="large" align="center">
      {buttons.map((variant) => (
        <Stack key={variant} axis="y" spacing="large" align="center">
          {sizes.map((size) => (
            <FillButton
              key={`${variant}-${size}`}
              variant={variant}
              size={size}
              onPress={() => console.log('Filled')}
            >
              {`${capitalize(size)} ${variant} `}
            </FillButton>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

function AllStates() {
  return (
    <Stack axis="y" spacing="large" align="center">
      <Stack axis="y" spacing="normal" align="center">
        {sizes.map((size) => (
          <FillButton
            key={`loading-${size}`}
            size={size}
            variant="primary"
            loading
            onPress={() => console.log('Filled')}
          >
            Loading...
          </FillButton>
        ))}
      </Stack>

      <Stack axis="y" spacing="normal" align="center">
        {sizes.map((size) => (
          <FillButton
            key={`loading-${size}`}
            size={size}
            variant="primary"
            disabled
            onPress={() => console.log('Filled')}
          >
            Disabled
          </FillButton>
        ))}
      </Stack>
    </Stack>
  );
}

function WithIcon() {
  return (
    <Stack axis="y" spacing="large" align="center">
      <Stack axis="y" spacing="normal" align="center">
        {sizes.map((size) => (
          <FillButton
            key={`icon-${size}`}
            size={size}
            variant="primary"
            icon="bell"
            onPress={() => console.log('Filled')}
          >
            Icon on right
          </FillButton>
        ))}
      </Stack>

      <Stack axis="y" spacing="normal" align="center">
        {sizes.map((size) => (
          <FillButton
            key={`icon-${size}`}
            size={size}
            variant="primary"
            icon="bell"
            iconPlacement="left"
            onPress={() => console.log('Filled')}
          >
            Icon on left
          </FillButton>
        ))}
      </Stack>
    </Stack>
  );
}

type Options = {
  value: string;
  label: string;
  component?: React.FC;
}[];

export function FillButtonWrapper() {
  const options: Options = [
    {
      value: '0',
      label: 'Variants',
      component: AllVariants,
    },
    { value: '1', label: 'States', component: AllStates },
    { value: '2', label: 'With icon', component: WithIcon },
  ];
  const [state, setState] = useState(options[0].value);

  const Component = options[+state].component as React.FC;

  return (
    <StoryWrapper>
      <Select
        label={t`Select state`}
        value={state}
        onChange={(newValue) => setState(newValue as Options[0]['value'])}
        options={options}
      />
      <Spacer size="medium" />
      <Component />
    </StoryWrapper>
  );
}

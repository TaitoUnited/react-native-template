import React, { useState } from 'react';

import { t } from '@lingui/macro';
import * as Stories from '../../components/uikit/index.stories';
import { styled } from '~styles/styled';
import { Select, Spacer } from '~components/uikit';

type Options = {
  label: string;
  component: React.FC;
}[];

export default function DevScreen() {
  const options: Options = [
    {
      label: 'OutlineButton',
      component: Stories.OutlineButtonWrapper,
    },
    {
      label: 'FillButton',
      component: Stories.FillButtonWrapper,
    },
    {
      label: 'IconButton',
      component: Stories.IconButtonWrapper,
    },
    {
      label: 'Checkbox',
      component: Stories.CheckBoxWrapper,
    },
    {
      label: 'DateInput',
      component: Stories.DateInputWrapper,
    },
    {
      label: 'Select',
      component: Stories.SelectWrapper,
    },
    {
      label: 'Modals',
      component: Stories.ModalsWrapper,
    },
    {
      label: 'Icon',
      component: Stories.IconWrapper,
    },
    {
      label: 'Text',
      component: Stories.TextWrapper,
    },
    {
      label: 'TextInput',
      component: Stories.TextInputWrapper,
    },
    {
      label: 'Spacer',
      component: Stories.SpacerWrapper,
    },
    {
      label: 'Stack',
      component: Stories.StackWrapper,
    },
  ];

  const [selectedComponent, setSelectedComponent] = useState<Options[0]>(
    options[0],
  );

  const Component = selectedComponent.component as React.FC;

  return (
    <Wrapper>
      <SelectWrapper>
        <Select
          label={t`Select component`}
          value={selectedComponent.label}
          onChange={(newComponent) =>
            setSelectedComponent(
              options.find((op) => op.label === newComponent) as Options[0],
            )
          }
          options={options.map((option) => ({
            value: option.label,
            label: option.label,
          }))}
        />
      </SelectWrapper>
      <Spacer size="medium" />
      <Component />
    </Wrapper>
  );
}

/*********
 * STYLES
 *********/

const Wrapper = styled('View', {
  flex: 1,
  padding: '$large',
});

const SelectWrapper = styled('View', {
  backgroundColor: '#ccc',
  padding: '$medium',
  borderRadius: '$small',
});
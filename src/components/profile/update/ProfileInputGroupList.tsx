import { Trans } from '@lingui/macro';
import { useEffect, useRef, useState } from 'react';
import { FieldArrayWithId } from 'react-hook-form';

import { ProfileFormValues } from './types';
import { styled } from '~styles/styled';
import { FillButton, Stack, Icon } from '~components/uikit';

type Props = {
  fields: FieldArrayWithId<ProfileFormValues, any, 'id'>[];
  renderInputGroup: (opts: { inputRef: any; index: number }) => JSX.Element;
  onAppendField: () => void;
  onRemoveField: (index: number) => void;
};

export default function ProfileInputGroupList({
  fields,
  renderInputGroup,
  onRemoveField,
  onAppendField,
}: Props) {
  const [canAutoFocus, setCanAutoFocus] = useState(false);

  // Don't auto-focus language select in case this component was just mounted
  // (i.e. the user hasn't added any languages yet or switches between tabs)
  useEffect(() => {
    setCanAutoFocus(true);
  }, []);

  return (
    <Stack axis="y" spacing="medium">
      {fields.map((field, index) => (
        <Fields
          key={field.id}
          index={index}
          canAutoFocus={canAutoFocus}
          renderInputGroup={renderInputGroup}
          onRemove={() => onRemoveField(index)}
        />
      ))}

      {fields.length < 5 && (
        <FillButton
          variant="primary"
          size="medium"
          icon="plus"
          iconPlacement="right"
          style={{ alignSelf: 'center' }}
          onPress={onAppendField}
        >
          <Trans>Add new</Trans>
        </FillButton>
      )}
    </Stack>
  );
}

function Fields({
  index,
  renderInputGroup,
  onRemove,
}: {
  index: number;
  canAutoFocus: boolean;
  renderInputGroup: Props['renderInputGroup'];
  onRemove: () => void;
}) {
  const inputRef = useRef<any>();

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        {renderInputGroup({ inputRef, index })}
      </Stack>

      <RemoveButton onPress={onRemove}>
        <Icon name="x" color="text" size={14} />
      </RemoveButton>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  paddingHorizontal: '$small',
  paddingTop: '$xsmall',
  paddingBottom: '$small',
  borderRadius: '$normal',
  borderWidth: 1,
  borderColor: '$primary',
});

const RemoveButton = styled('TouchableHighlight', {
  position: 'absolute',
  right: -6,
  top: -6,
  width: 24,
  height: 24,
  flexCenter: 'row',
  shadow: 'small',
  borderRadius: '$full',
  borderWidth: 1,
  borderColor: '$primary',
  backgroundColor: '$background',
  zIndex: 1,
}).attrs((p) => ({
  underlayColor: p.theme.colors.muted5,
  hitSlop: { top: 6, right: 6, bottom: 6, left: 6 },
}));

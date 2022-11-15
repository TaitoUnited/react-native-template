import { memo, ReactNode, useState } from 'react';
import { Modal, Platform, StatusBar } from 'react-native';
import { Trans } from '@lingui/macro';
import { FlashList } from '@shopify/flash-list';

import { Text } from './Text';
import { Stack } from './layout/Stack';
import { Spacer } from './layout/Spacer';
import { Radio } from './inputsx/Radio';
import { Checkbox } from './inputsx/Checkbox';
import { SearchInput } from './inputsx/SearchInput';
import { styled } from '~styles';
import { useEvent } from '~utils/common';

type Option = {
  label: string;
  value: string;
};

type BaseProps = {
  label: string;
  emptyContent?: ReactNode;
  options: Option[];
  isVisible: boolean;
  onClose: () => void;
};

type SingleValueProps = {
  multiple?: false;
  selected: string;
  onConfirm: (option: string) => void;
};

type MultipleValueProps = {
  multiple: true;
  selected: string[];
  onConfirm: (option: string[]) => void;
};

type Props = BaseProps & (SingleValueProps | MultipleValueProps);

// Use this picker for picking options from a LONG list of options that need filtering capabilities

export function PickerSheet({
  label,
  emptyContent,
  options,
  isVisible,
  selected,
  multiple,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <ModalContent
        label={label}
        emptyContent={emptyContent}
        options={options}
        selected={selected}
        multiple={multiple}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </Modal>
  );
}

function ModalContent({
  label,
  emptyContent,
  options,
  selected: _selected,
  multiple = false,
  onClose,
  onConfirm,
}: Omit<Props, 'isVisible'>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(_selected);

  const visibleOptions = options.filter((option) =>
    searchTerm
      ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  function handleDone() {
    onConfirm(selected as any);
    requestAnimationFrame(() => {
      onClose();
    });
  }

  const handleOptionSelect = useEvent((value: string) => {
    if (multiple) {
      const current = selected as string[];
      const isChecked = current.includes(value);
      const newSelected = isChecked
        ? current.filter((o) => o !== value)
        : [...current, value];

      setSelected(newSelected);
    } else {
      setSelected(value);
      setTimeout(() => {
        handleDone();
      }, 200);
    }
  });

  function handleOptionClear() {
    setSelected(multiple ? [] : '');
  }

  return (
    <SafeArea>
      <ListHeader
        label={label}
        searchTerm={searchTerm}
        numSelected={selected.length}
        onSearch={setSearchTerm}
        onClearOption={handleOptionClear}
      />
      <FlashList
        data={visibleOptions}
        estimatedItemSize={25}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(option: Option) => option.value}
        ItemSeparatorComponent={ListSeparator}
        ListEmptyComponent={<ListEmpty>{emptyContent}</ListEmpty>}
        scrollIndicatorInsets={{ top: 100 }} // approximation of header height
        renderItem={({ item }) => {
          return (
            <ListItem
              multiple={multiple}
              checked={selected.includes(item.value)}
              onOptionSelect={handleOptionSelect}
              value={item.value}
              label={item.label}
            />
          );
        }}
      />

      <Footer>
        <ActionButton onPress={onClose}>
          <Text variant={multiple ? 'body' : 'bodyBold'}>
            {multiple ? <Trans>Cancel</Trans> : <Trans>Close</Trans>}
          </Text>
        </ActionButton>

        {multiple && (
          <ActionButton onPress={handleDone}>
            <Text variant="bodyBold">
              <Trans>Done</Trans>
            </Text>
          </ActionButton>
        )}
      </Footer>

      {/* On iOS the modal effect will reveal the black root background */}
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
    </SafeArea>
  );
}

type ListItemProps = {
  label: string;
  value: string;
  multiple: boolean;
  checked: boolean;
  onOptionSelect: (value: string) => void;
};

const ListItem = memo(
  ({ multiple, label, value, checked, onOptionSelect }: ListItemProps) => {
    return (
      <ListItemWrapper>
        {multiple ? (
          <Checkbox
            label={label}
            checked={checked}
            value={value}
            onChange={() => onOptionSelect(value)}
          />
        ) : (
          <Radio
            label={label}
            checked={checked}
            value={value}
            onChange={() => onOptionSelect(value)}
          />
        )}
      </ListItemWrapper>
    );
  }
);

ListItem.displayName = 'ListItem';

function ListHeader({
  label,
  searchTerm,
  numSelected,
  onSearch,
  onClearOption,
}: {
  label: string;
  searchTerm: string;
  numSelected: number;
  onSearch: (s: string) => void;
  onClearOption: () => void;
}) {
  return (
    <ListHeaderWrapper>
      <Stack axis="y" spacing="small">
        <SearchInput value={searchTerm} onChange={onSearch} />

        <Stack axis="x" spacing="small" align="center" justify="between">
          <Text
            variant="bodySmall"
            color="textMuted"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {label}
          </Text>

          {numSelected > 1 && (
            <ClearButton onPress={onClearOption}>
              <Text variant="bodySmallBold" color="textMuted">
                Clear selected ({numSelected})
              </Text>
            </ClearButton>
          )}
        </Stack>
      </Stack>
    </ListHeaderWrapper>
  );
}

function ListEmpty({ children }: { children?: ReactNode }) {
  return (
    <ListEmptyWrapper>
      {children || (
        <Stack axis="y" spacing="normal">
          <Text align="center">
            <Trans>No results found.</Trans>
          </Text>
          <Text align="center">
            <Trans>Try changing your search term.</Trans>
          </Text>
        </Stack>
      )}
    </ListEmptyWrapper>
  );
}

function ListSeparator() {
  return <Spacer axis="y" size="normal" />;
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  backgroundColor: '$elevated',
});

const ListEmptyWrapper = styled('View', {
  padding: '$large',
  flexCenter: 'row',
});

const ListHeaderWrapper = styled('View', {
  marginBottom: '$small',
  padding: '$normal',
  backgroundColor: '$elevated',
  borderBottomWidth: 1,
  borderColor: '$border',
});

const ClearButton = styled('TouchableOpacity', {
  alignSelf: 'flex-end',
});

const ListItemWrapper = styled('View', {
  paddingHorizontal: '$small',
});

const Footer = styled('View', {
  width: '100%',
  borderTopWidth: 1,
  borderColor: '$border',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const ActionButton = styled('TouchableOpacity', {
  padding: '$normal',
  flexCenter: 'row',
});

import { useState } from 'react';
import { Modal } from 'react-native';
import { Trans } from '@lingui/macro';

import { Text } from './Text';
import { Stack } from './Stack';
import { Spacer } from './Spacer';
import { Radio } from './Inputs/Radio';
import { Checkbox } from './Inputs/Checkbox';
import { SearchInput } from './Inputs/SearchInput';
import { styled } from '~styles';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  selected?: string | string[];
  isVisible: boolean;
  multiple?: boolean;
  onClose: () => void;
  onOptionSelect: (option?: string | string[]) => void;
};

// Use this picker for picking a single option from a LONG list of options that need filtering capabilities

export function PickerSheet({
  label,
  options,
  isVisible,
  selected,
  multiple = false,
  onClose,
  onOptionSelect,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedOptions = selected
    ? Array.isArray(selected)
      ? selected
      : [selected]
    : [];

  const visibleOptions = options.filter((option) =>
    searchTerm
      ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
      : true,
  );

  function handleClose() {
    onClose();
    if (searchTerm) setSearchTerm('');
  }

  function handleOptionSelect(value: string) {
    if (multiple) {
      const isChecked = selectedOptions.includes(value);
      const newOptions = isChecked
        ? selectedOptions.filter((o) => o !== value)
        : [...selectedOptions, value];
      onOptionSelect(newOptions);
    } else {
      onOptionSelect(value);
      // Add a small delay so that the user can see the selected option
      setTimeout(() => handleClose(), 200);
    }
  }

  function handleOptionClear() {
    if (multiple) {
      onOptionSelect([]);
    } else {
      onOptionSelect(undefined);
    }
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <SafeArea>
        <OptionList
          data={visibleOptions}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(option: Option) => option.value}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={<ListEmpty />}
          scrollIndicatorInsets={{ top: 100 }} // approximation of header height
          ListHeaderComponent={
            <ListHeader
              label={label}
              searchTerm={searchTerm}
              numSelected={selectedOptions.length}
              onSearch={setSearchTerm}
              onClearOption={handleOptionClear}
            />
          }
          renderItem={({ item }) => {
            const option = item as Option;
            return (
              <ListItem
                multiple={multiple}
                selectedOptions={selectedOptions}
                onOptionSelect={handleOptionSelect}
                value={option.value}
                label={option.label}
              />
            );
          }}
        />

        <CloseButton onPress={handleClose}>
          <Text variant="bodyBold">
            <Trans>Close</Trans>
          </Text>
        </CloseButton>
      </SafeArea>
    </Modal>
  );
}

type ListItemProps = {
  label: string;
  value: string;
  multiple: boolean;
  selectedOptions: string[];
  onOptionSelect: (value: string) => void;
};

function ListItem({
  multiple,
  label,
  value,
  selectedOptions,
  onOptionSelect,
}: ListItemProps) {
  return (
    <ListItemWrapper>
      {multiple ? (
        <Checkbox
          key={value}
          label={label}
          checked={selectedOptions.includes(value)}
          value={value}
          onChange={() => onOptionSelect(value)}
        />
      ) : (
        <Radio
          key={value}
          label={label}
          checked={selectedOptions.includes(value)}
          value={value}
          onChange={() => onOptionSelect(value)}
        />
      )}
    </ListItemWrapper>
  );
}

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
          <Text variant="bodyExtraSmall" numberOfLines={1} style={{ flex: 1 }}>
            {label}
          </Text>

          {numSelected > 1 && (
            <ClearButton onPress={onClearOption}>
              <Text variant="bodyExtraSmallBold" color="textMuted">
                Clear selected ({numSelected})
              </Text>
            </ClearButton>
          )}
        </Stack>
      </Stack>
    </ListHeaderWrapper>
  );
}

function ListEmpty() {
  return (
    <ListEmptyWrapper>
      <Text variant="body">
        <Trans>No results</Trans>
      </Text>
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

const OptionList = styled('FlatList', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    paddingBottom: p.theme.space.normal,
  },
}));

const ListEmptyWrapper = styled('View', {
  padding: '$large',
  flexCenter: 'row',
});

const ListHeaderWrapper = styled('View', {
  marginBottom: '$small',
  paddingTop: '$normal',
  paddingBottom: '$small',
  paddingHorizontal: '$small',
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

const CloseButton = styled('TouchableOpacity', {
  width: '100%',
  padding: '$normal',
  flexCenter: 'row',
  borderTopWidth: 1,
  borderColor: '$border',
});

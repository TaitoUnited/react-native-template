import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { t, Trans } from '@lingui/macro';

import { Text } from './Text';
import { Stack } from './Stack';
import { Spacer } from './Spacer';
import { Radio } from './Inputs/Radio';
import { SearchInput } from './Inputs/SearchInput';
import { styled } from '~styles';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  emptyLabel: string;
  options: Option[];
  initial?: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (selected: string) => void;
};

// Use this picker for picking a single option from a LONG list of options that need filtering capabilities

export function PickerSheet({
  label,
  emptyLabel,
  options,
  isVisible,
  initial,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState(initial);
  const [searchTerm, setSearchTerm] = useState('');
  const searchVisible = options.length > 15;
  const hasSelected = !!selected;

  const visibleOptions = options.filter((option) =>
    searchTerm
      ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  function handleClose() {
    onClose();
  }

  function handleConfirm() {
    if (selected) {
      onConfirm(selected);
      onClose();
    }
  }

  function handleOptionSelect(value: string) {
    setSelected(value);
  }

  useEffect(() => {
    if (isVisible) {
      setSelected(initial);
    } else {
      setSelected(undefined);
      setSearchTerm('');
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

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
          scrollIndicatorInsets={{ top: searchVisible ? 100 : 0 }} // approximation of header height
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={
            <ListEmpty>{emptyLabel || t`No results`}</ListEmpty>
          }
          ListHeaderComponent={
            <ListHeader
              title={label}
              searchTerm={searchTerm}
              searchVisible={searchVisible}
              onSearch={setSearchTerm}
            />
          }
          renderItem={({ item }) => {
            const option = item as Option;
            return (
              <ListItem
                selectedOption={selected}
                onOptionSelect={handleOptionSelect}
                value={option.value}
                label={option.label}
              />
            );
          }}
        />

        <Footer>
          <ActionButton onPress={handleClose}>
            <Text variant="bodyBold">
              {selected ? <Trans>Cancel</Trans> : <Trans>Close</Trans>}
            </Text>
          </ActionButton>

          {hasSelected && (
            <ActionButton onPress={handleConfirm}>
              <Text variant="bodyBold" color="primary">
                <Trans>Done</Trans>
              </Text>
            </ActionButton>
          )}
        </Footer>
      </SafeArea>
    </Modal>
  );
}

type ListItemProps = {
  label: string;
  value: string;
  selectedOption: string | undefined;
  onOptionSelect: (value: string) => void;
};

function ListItem({
  label,
  value,
  selectedOption,
  onOptionSelect,
}: ListItemProps) {
  return (
    <ListItemWrapper>
      <Radio
        key={value}
        label={label}
        checked={selectedOption === value}
        value={value}
        onChange={() => onOptionSelect(value)}
      />
    </ListItemWrapper>
  );
}

function ListHeader({
  title,
  searchTerm,
  searchVisible,
  onSearch,
}: {
  title: string;
  searchTerm: string;
  searchVisible: boolean;
  onSearch: (s: string) => void;
}) {
  return (
    <ListHeaderWrapper>
      <Stack axis="y" spacing="small">
        {searchVisible && (
          <SearchInput value={searchTerm} onChange={onSearch} />
        )}

        <Text
          variant="body"
          color="textMuted"
          numberOfLines={1}
          style={{ flex: 1 }}
        >
          {title}
        </Text>
      </Stack>
    </ListHeaderWrapper>
  );
}

function ListEmpty({ children }: { children: string }) {
  return (
    <ListEmptyWrapper>
      <Text variant="body">{children}</Text>
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
  paddingTop: '$small',
  paddingBottom: '$small',
  paddingHorizontal: '$small',
  backgroundColor: '$elevated',
  borderBottomWidth: 1,
  borderColor: '$border',
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

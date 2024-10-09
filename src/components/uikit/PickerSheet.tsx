import { Trans, msg } from '@lingui/macro';
import { FlashList } from '@shopify/flash-list';
import { ReactNode, memo, useState } from 'react';
import { Modal, Platform } from 'react-native';

import StatusBar from '~components/common/StatusBar';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';
import { useEffectEvent } from '~utils/common';

import { Text } from './Text';
import { Checkbox } from './inputs/Checkbox';
import { Radio } from './inputs/Radio';
import { SearchInput } from './inputs/SearchInput';
import { Spacer } from './layout/Spacer';
import { Stack } from './layout/Stack';

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

/** Use this picker for picking options from a LONG list of options that need filtering capabilities */
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
  const { _ } = useI18n();
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

  const handleOptionSelect = useEffectEvent((value: string) => {
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
        numSelected={multiple ? selected?.length : selected ? 1 : 0}
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
              checked={selected?.includes(item.value)}
              onOptionSelect={handleOptionSelect}
              value={item.value}
              label={item.label}
            />
          );
        }}
      />

      <Footer>
        <ActionButton
          onPress={onClose}
          accessibilityLabel={_(msg`Close the picker`)}
          accessibilityHint={_(
            msg`Close the picker without selecting any option`
          )}
        >
          <Text variant={multiple ? 'body' : 'bodyBold'}>
            {multiple ? <Trans>Cancel</Trans> : <Trans>Close</Trans>}
          </Text>
        </ActionButton>

        {multiple && (
          <ActionButton
            onPress={handleDone}
            accessibilityLabel={_(
              msg`Confirm selected options and close the picker`
            )}
          >
            <Text variant="bodyBold">
              <Trans>Done</Trans>
            </Text>
          </ActionButton>
        )}
      </Footer>

      {/* On iOS the modal effect will reveal the black root background */}
      {Platform.OS === 'ios' && <StatusBar />}
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

// eslint-disable-next-line lingui/no-unlocalized-strings
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
  const { _ } = useI18n();
  return (
    <ListHeaderWrapper>
      <Stack axis="y" spacing="regular">
        <SearchInput
          value={searchTerm}
          onChange={onSearch}
          accessibilityLabel={_(msg`Search options`)}
          accessibilityHint={_(msg`Type to search and filter options`)}
        />

        <Stack axis="x" spacing="small" align="center" justify="between">
          <Text
            variant="bodySmallSemiBold"
            color="text"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {label}
          </Text>

          {numSelected > 1 && (
            <ClearButton
              onPress={onClearOption}
              accessibilityLabel={_(msg`Clear selected options`)}
              accessibilityHint={_(msg`Double tap to clear selected options`)}
            >
              <Text variant="bodyExtraSmall" color="textMuted">
                <Trans>Clear selected ({numSelected})</Trans>
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
        <Stack axis="y" spacing="regular">
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
  return <Spacer axis="y" size="regular" />;
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
  backgroundColor: '$surface',
});

const ListEmptyWrapper = styled('View', {
  padding: '$large',
  flexCenter: 'row',
});

const ListHeaderWrapper = styled('View', {
  marginBottom: '$small',
  padding: '$regular',
  backgroundColor: '$surface',
  borderBottomWidth: 1,
  borderColor: '$line3',
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
  borderColor: '$line3',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const ActionButton = styled('TouchableOpacity', {
  padding: '$regular',
  flexCenter: 'row',
});

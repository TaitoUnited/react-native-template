import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from '../../styles';
import { useAdvertsFilters } from './filters.store';
import { SearchInput, Stack } from '~components/uikit';

export default function AdvertsFilters() {
  const { searchTerm, setSearchTerm } = useAdvertsFilters();
  const insets = useSafeAreaInsets();

  return (
    <HeaderStack spacing="small" style={{ paddingTop: insets.top }}>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
    </HeaderStack>
  );
}

const HeaderStack = styled(Stack, {
  backgroundColor: '$background',
  paddingHorizontal: '$medium',
  paddingBottom: '$small',
  borderBottomWidth: 1,
});

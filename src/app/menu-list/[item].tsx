import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

import { useMenuListItem } from '~components/settings/hooks';
import { styled } from '~styles';

export default function MenuListItem() {
  const { item } = useLocalSearchParams<{ item: string }>();
  const { target, label } = useMenuListItem({ targetName: item as string });

  const Target = target;

  // NOTE: in case navigation state persistence is added the `target` component
  // will not be present in the navigation params since it's not serializable.
  useEffect(() => {
    if (!Target && router.canGoBack()) router.back();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Target) return null;
  return (
    <Wrapper>
      <Stack.Screen options={{ title: label }} />
      <Target />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
  },
}));

import { useEffect } from 'react';
import { styled } from '~styles';
import { ScreenProps } from '~screens/types';

export default function MenuListScreen({
  route,
  navigation,
}: ScreenProps<'MenuList'>) {
  const Target = route.params.target;

  // NOTE: in case navigation state persistence is added the `target` component
  // will not be present in the navigation params since it's not serializable.
  useEffect(() => {
    if (!Target && navigation.canGoBack()) navigation.goBack();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!Target) return null;

  return (
    <Wrapper>
      <Target />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

import { Trans } from '@lingui/macro';
import React from 'react';
import AdvertDetails from '~components/adverts/details/AdvertDetails';
import { FillButton } from '~components/uikit';
import { StackScreenProps } from '~screens/types';
import { styled } from '~styles';

export default function AdvertDetailsScreen({
  route,
}: StackScreenProps<'AdvertDetails'>) {
  const { advert } = route.params;

  function seekRole() {
    // TODO: Seek role for advert
  }

  return (
    <SafeArea>
      <Wrapper>
        <AdvertDetails advert={advert} />
      </Wrapper>

      <Footer>
        <FillButton variant="primary" size="large" onPress={seekRole}>
          <Trans>Seek role</Trans>
        </FillButton>
      </Footer>
    </SafeArea>
  );
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
});

const Wrapper = styled('ScrollView', {
  flex: 1,
  backgroundColor: '$background',
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

const Footer = styled('View', {
  borderTopWidth: 1,
  borderColor: '$border',
  paddingTop: '$normal',
  paddingHorizontal: '$normal',
  backgroundColor: '$background',
});

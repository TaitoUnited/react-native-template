import React from 'react';
import { Trans } from '@lingui/macro';
import { useColorMode } from '../../services/theming';
import { Spacer, Text } from '~components/uikit';
import { styled } from '~styles';

const IMAGE_DARK = require('../../images/icon-adverts-dark.png');
const IMAGE_LIGHT = require('../../images/icon-adverts.png');

export default function AdvertsScreenPlaceholder() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Wrapper>
      <PlaceholderImage source={isDark ? IMAGE_DARK : IMAGE_LIGHT} />
      <Spacer size="normal" />
      <Text align="center" variant="title1">
        <Trans>Coming soon...</Trans>
      </Text>
      <Spacer size="normal" />
      <Text align="center">
        <Trans>In the future, you can browse different roles here</Trans>
      </Text>
    </Wrapper>
  );
}

const PlaceholderImage = styled('Image', {
  width: '100%',
  resizeMode: 'contain',
});

const Wrapper = styled('ScrollView', {
  padding: '$xxlarge',
  flex: 1,
}).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

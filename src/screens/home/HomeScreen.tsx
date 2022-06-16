import { t, Trans } from '@lingui/macro';
import React from 'react';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useCurrentUserQuery } from '../../graphql/generated';
import { useColorMode } from '../../services/theming';
import { styled } from '~styles';
import { Spacer, Text, ScaledImage } from '~components/uikit';

const IMAGE_DARK = require('../../images/icon.png');
const IMAGE_LIGHT = require('../../images/icon.png');
// const IMAGE_DARK = require('../../images/icon-home-dark.png');
// const IMAGE_LIGHT = require('../../images/icon-home.png');

export default function HomeScreen() {
  const [currentUserResult] = useCurrentUserQuery();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const { data, fetching } = currentUserResult;

  if (fetching) return <LoadingScreen />;

  const firstName = data ? data.currentUser.firstName : t`there`;

  return (
    <Wrapper>
      <PlaceholderImage
        size={{ height: 150 }}
        source={isDark ? IMAGE_DARK : IMAGE_LIGHT}
      />
      <Spacer size="normal" />
      <Text variant="title1">
        <Trans>Hi</Trans>
        {` ${firstName}!`}
      </Text>
      <Spacer size="medium" />
      <Text variant="title2" align="center">
        <Trans>Welcome to Taito React Native Template!</Trans>
      </Text>
      <Spacer size="medium" />
      <Text align="center">
        <Trans>
          This React app contains the necessary building blocks that you need to
          get your project started. You can freely alter any aspect of the
          template to fit your needs better.
        </Trans>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
  padding: '$xxlarge',
}).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const PlaceholderImage = styled(ScaledImage, {
  width: '100%',
  resizeMode: 'contain',
});

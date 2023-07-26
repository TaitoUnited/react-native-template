import { useMemo } from 'react';
import { Animated } from 'react-native';
import { useAssets } from 'expo-asset';

import config from '~constants/config';
import { styled } from '~styles';

if (config.splash.image !== './src/design-system/assets/splash.png') {
  throw Error(
    'Unexpected splash screen image, expected "./design-system/assets/splash.png"'
  );
}

export default function SplashScreen() {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [assets, error] = useAssets([
    require('../../design-system/assets/splash.png'),
  ]);

  if (!assets) return null;

  // If the splash image fails to load, show the app anyway
  if (error) {
    return <Wrapper />;
  }

  const imageSource = { uri: assets[0].localUri || '' };

  return (
    <Wrapper>
      <SplashContent
        pointerEvents="none"
        style={[
          {
            backgroundColor: config.splash.backgroundColor,
            opacity: animation,
          },
        ]}
      >
        <SplashImage source={imageSource} fadeDuration={0} />
      </SplashContent>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const SplashContent = Animated.createAnimatedComponent(
  styled('View', {
    absoluteFill: true,
  })
);

const SplashImage = styled('Image', {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
});

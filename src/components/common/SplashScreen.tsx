import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Animated } from 'react-native';
import { hideAsync } from 'expo-splash-screen';
import { useAssets } from 'expo-asset';

import config from '~constants/config';
import { styled } from '~styles';

if (config.splash.image !== './src/design-system/assets/splash.png') {
  throw Error(
    'Unexpected splash screen image, expected "./design-system/assets/splash.png"'
  );
}

type Props = {
  children: ReactNode;
  ready: boolean;
};

export default function SplashScreen({ children, ready }: Props) {
  const [isAnimationComplete, setAnimationComplete] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const animation = useMemo(() => new Animated.Value(1), []);
  const [assets, error] = useAssets([
    require('../../design-system/assets/splash.png'),
  ]);

  useEffect(() => {
    async function hide() {
      await hideAsync();
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }

    if (ready && isImageLoaded) hide();
  }, [ready, isImageLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!assets) return null;

  // If the splash image fails to load, show the app anyway
  if (error) {
    return <Wrapper>{children}</Wrapper>;
  }

  const imageSource = { uri: assets[0].localUri || '' };

  return (
    <Wrapper>
      {ready ? children : null}
      {!isAnimationComplete && (
        <SplashContent
          pointerEvents="none"
          style={[
            {
              backgroundColor: config.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <SplashImage
            source={imageSource}
            fadeDuration={0}
            onLoadEnd={() => setImageLoaded(true)}
          />
        </SplashContent>
      )}
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

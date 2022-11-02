import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { hideAsync } from 'expo-splash-screen';
import { useAssets } from 'expo-asset';
import Constants from 'expo-constants';

const backgroundColor = Constants.manifest?.splash?.backgroundColor;
const resizeMode = Constants.manifest?.splash?.resizeMode ?? 'contain';

if (
  Constants.manifest?.splash?.image !== './src/design-system/assets/splash.png'
) {
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
    return <View style={{ flex: 1 }}>{children}</View>;
  }

  const imageSource = { uri: assets[0].localUri || '' };

  return (
    <View style={{ flex: 1 }}>
      {ready ? children : null}
      {!isAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor, opacity: animation },
          ]}
        >
          <Image
            source={imageSource}
            fadeDuration={0}
            onLoadEnd={() => setImageLoaded(true)}
            style={{ width: '100%', height: '100%', resizeMode }}
          />
        </Animated.View>
      )}
    </View>
  );
}

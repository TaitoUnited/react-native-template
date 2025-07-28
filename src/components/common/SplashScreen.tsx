import { useAssets } from 'expo-asset';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import config from '~constants/config';

import Splash from '../../design-system/assets/splash.png';

export default function SplashScreen() {
  const [assets, error] = useAssets([Splash]);

  if (!assets || error) return null;

  const imageSource = { uri: assets[0].localUri || '' };

  return (
    <View style={styles.wrapper} testID="splashScreen">
      <View
        pointerEvents="none"
        style={[
          styles.splashContent,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        <Image
          style={styles.splashImage}
          source={imageSource}
          fadeDuration={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
  },
  splashContent: {
    ...theme.utils.absoluteFill,
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
}));

import { useAssets } from 'expo-asset';

import config from '~constants/config';
import { styled } from '~styles';

import Splash from '../../design-system/assets/splash.png';

export default function SplashScreen() {
  const [assets, error] = useAssets([Splash]);

  if (!assets || error) return null;

  const imageSource = { uri: assets[0].localUri || '' };

  return (
    <Wrapper>
      <SplashContent
        pointerEvents="none"
        style={[{ backgroundColor: config.backgroundColor }]}
      >
        <SplashImage source={imageSource} fadeDuration={0} />
      </SplashContent>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const SplashContent = styled('View', {
  absoluteFill: true,
});

const SplashImage = styled('Image', {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
});

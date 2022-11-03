import Providers from './Providers';
import RootNavigator from '~screens/root';
import SplashScreen from '~components/common/SplashScreen';
import StatusBar from '~components/common/StatusBar';
import { useAppReady } from '~utils/init';
import { styled } from '~styles';

export default function Root() {
  const ready = useAppReady();

  return (
    <SplashScreen ready={ready}>
      <Providers>
        <AppWrapper>
          <RootNavigator />
        </AppWrapper>
        <StatusBar />
      </Providers>
    </SplashScreen>
  );
}

const AppWrapper = styled('View', {
  flex: 1,
  backgroundColor: '$backdrop',
});

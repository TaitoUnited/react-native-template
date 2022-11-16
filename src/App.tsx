import Providers from './Providers';
import RootNavigator from '~screens/root';
import SplashScreen from '~components/common/SplashScreen';
import StatusBar from '~components/common/StatusBar';
import { useAppReady } from '~utils/init';

export default function Root() {
  const ready = useAppReady();

  return (
    <SplashScreen ready={ready}>
      <Providers>
        <RootNavigator />
        <StatusBar />
      </Providers>
    </SplashScreen>
  );
}

import SplashScreen from './components/common/SplashScreen';
import Providers from './Providers';
import RootNavigator from '~screens/root';
import { useAppReady } from '~utils/init';
import StatusBar from '~components/common/StatusBar';

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

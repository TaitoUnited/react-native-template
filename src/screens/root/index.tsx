import UnauthedNavigator from '../unauthed';
import AppNavigator from './AppNavigator';
import PlaygroundNavigator from '../playground';
import { usePlaygroundStore } from '../playground/store';
import { useAuthStore } from '~services/auth';

export default function RootNavigator() {
  const status = useAuthStore((s) => s.status);
  const playgroundVisible = usePlaygroundStore((s) => s.playgroundVisible);

  if (playgroundVisible) {
    return <PlaygroundNavigator />;
  }

  // Render nothing while we are checking auth
  if (status === 'undetermined' || status === 'determining') return null;

  if (status === 'authenticated') {
    return <AppNavigator />;
  }

  return <UnauthedNavigator />;
}

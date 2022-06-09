import type { StackScreenProps } from '~screens/types';
import ProfileUpdate from '~components/profile/update';

export default function ProfileUpdateScreen({
  route,
}: StackScreenProps<'ProfileUpdate'>) {
  const { profile } = route.params;
  return (
    <>
      <ProfileUpdate profile={profile} />
    </>
  );
}

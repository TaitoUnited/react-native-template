import { styled } from '~styles';
import { FillButton, Stack } from '~components/uikit';
import { ScreenProps } from '~screens/types';
import { showToast } from '~components/common/Toaster';

export default function ToastScreen(_: ScreenProps<'Toast'>) {
  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <FillButton
          variant="info"
          onPress={() => showToast({ title: 'An info toast', type: 'info' })}
        >
          Info
        </FillButton>

        <FillButton
          variant="info"
          onPress={() =>
            showToast({
              title: 'An info toast',
              type: 'info',
              icon: 'download',
            })
          }
        >
          Info (icon)
        </FillButton>

        <FillButton
          variant="info"
          onPress={() =>
            showToast({
              title: 'An info toast',
              subtitle: 'With a subtitle',
              type: 'info',
              icon: 'download',
            })
          }
        >
          Info (icon + subtitle)
        </FillButton>

        <FillButton
          variant="primary"
          onPress={() =>
            showToast({ title: 'A success toast', type: 'success' })
          }
        >
          Success
        </FillButton>

        <FillButton
          variant="primary"
          onPress={() =>
            showToast({
              title: 'A success toast',
              type: 'success',
              icon: 'bell',
            })
          }
        >
          Success (icon)
        </FillButton>

        <FillButton
          variant="primary"
          onPress={() =>
            showToast({
              title: 'A simple toast',
              subtitle: 'With a subtitle',
              type: 'success',
              icon: 'bell',
            })
          }
        >
          Success (icon + subtitle)
        </FillButton>

        <FillButton
          variant="danger"
          onPress={() =>
            showToast({ title: 'A success toast', type: 'success' })
          }
        >
          Error
        </FillButton>

        <FillButton
          variant="danger"
          onPress={() =>
            showToast({
              title: 'A error toast',
              type: 'error',
              icon: 'clock',
            })
          }
        >
          Error (icon)
        </FillButton>

        <FillButton
          variant="danger"
          onPress={() =>
            showToast({
              title: 'A simple toast',
              subtitle: 'With a subtitle',
              type: 'error',
              icon: 'clock',
            })
          }
        >
          Error (icon + subtitle)
        </FillButton>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.normal,
  },
}));

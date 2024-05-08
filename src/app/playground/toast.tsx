import { styled } from '~styles';
import { FillButton, Stack, Text } from '~components/uikit';
import { showToast } from '~components/common/Toaster';

export default function Toast() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Info toast</Text>

          <Stack axis="y" spacing="small">
            <FillButton
              variant="info"
              onPress={() =>
                showToast({ title: 'An info toast', type: 'info' })
              }
            >
              Default
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
              With icon
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
              With subtitle + icon
            </FillButton>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Success toast</Text>

          <Stack axis="y" spacing="small">
            <FillButton
              variant="primary"
              onPress={() =>
                showToast({ title: 'A success toast', type: 'success' })
              }
            >
              Default
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
              With custom icon
            </FillButton>

            <FillButton
              variant="primary"
              onPress={() =>
                showToast({
                  title: 'A simple toast',
                  subtitle: 'With a subtitle',
                  type: 'success',
                })
              }
            >
              With subtitle
            </FillButton>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Error toast</Text>

          <Stack axis="y" spacing="small">
            <FillButton
              variant="danger"
              onPress={() =>
                showToast({ title: 'A success toast', type: 'error' })
              }
            >
              Default
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
              With custom icon
            </FillButton>

            <FillButton
              variant="danger"
              onPress={() =>
                showToast({
                  title: 'A simple toast',
                  subtitle: 'With a subtitle',
                  type: 'error',
                })
              }
            >
              With subtitle
            </FillButton>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
    paddingBottom: 100,
  },
}));

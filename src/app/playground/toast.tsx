import { showToast } from '~components/common/Toaster';
import { Button, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

export default function Toast() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Info toast</Text>

          <Stack axis="y" spacing="small">
            <Button
              variant="outlined"
              color="primary"
              onPress={() =>
                showToast({ title: 'An info toast', type: 'info' })
              }
            >
              Default
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onPress={() =>
                showToast({
                  title: 'An info toast',
                  type: 'info',
                  icon: 'download',
                })
              }
            >
              With icon
            </Button>

            <Button
              variant="outlined"
              color="primary"
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
            </Button>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Success toast</Text>

          <Stack axis="y" spacing="small">
            <Button
              variant="outlined"
              color="success"
              onPress={() =>
                showToast({ title: 'A success toast', type: 'success' })
              }
            >
              Default
            </Button>

            <Button
              variant="outlined"
              color="success"
              onPress={() =>
                showToast({
                  title: 'A success toast',
                  type: 'success',
                  icon: 'bell',
                })
              }
            >
              With custom icon
            </Button>

            <Button
              variant="outlined"
              color="success"
              onPress={() =>
                showToast({
                  title: 'A simple toast',
                  subtitle: 'With a subtitle',
                  type: 'success',
                })
              }
            >
              With subtitle
            </Button>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Warning toast</Text>

          <Stack axis="y" spacing="small">
            <Button
              variant="outlined"
              color="error"
              onPress={() =>
                showToast({ title: 'A warning toast', type: 'warn' })
              }
            >
              Default
            </Button>

            <Button
              variant="outlined"
              color="error"
              onPress={() =>
                showToast({
                  title: 'A warn toast',
                  type: 'warn',
                  icon: 'clock',
                })
              }
            >
              With custom icon
            </Button>

            <Button
              variant="outlined"
              color="error"
              onPress={() =>
                showToast({
                  title: 'A simple toast',
                  subtitle: 'With a subtitle',
                  type: 'warn',
                })
              }
            >
              With subtitle
            </Button>
          </Stack>
        </Stack>

        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Error toast</Text>

          <Stack axis="y" spacing="small">
            <Button
              variant="soft"
              color="error"
              onPress={() =>
                showToast({ title: 'An error toast', type: 'error' })
              }
            >
              Default
            </Button>

            <Button
              variant="soft"
              color="error"
              onPress={() =>
                showToast({
                  title: 'An error toast',
                  type: 'error',
                  icon: 'clock',
                })
              }
            >
              With custom icon
            </Button>

            <Button
              variant="soft"
              color="error"
              onPress={() =>
                showToast({
                  title: 'An simple toast',
                  subtitle: 'With a subtitle',
                  type: 'error',
                })
              }
            >
              With subtitle
            </Button>
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
  },
}));

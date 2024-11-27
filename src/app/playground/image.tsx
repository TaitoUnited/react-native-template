import { Grid, Stack, Text, Image as UiImage } from '~components/uikit';
import { styled } from '~styles';

const photos = [
  'https://tinyurl.com/57ssptjn',
  'https://tinyurl.com/4mew8zn6',
  'https://tinyurl.com/5dkxbcjc',
];

export default function Image() {
  return (
    <Wrapper>
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Images</Text>

          <Grid spacing="regular" justify="center">
            {photos.map((photo, index) => (
              <Img
                key={index}
                source={{ uri: photo }}
                autoSize={{ width: 300 }}
                accessibilityLabel={`Flower ${index + 1}`}
              />
            ))}
          </Grid>
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

const Img = styled(UiImage, {
  borderRadius: '$regular',
});

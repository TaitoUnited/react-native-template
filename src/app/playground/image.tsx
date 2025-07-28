import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Grid, Stack, Text, Image as UiImage } from '~components/uikit';

const photos = [
  'https://tinyurl.com/57ssptjn',
  'https://tinyurl.com/4mew8zn6',
  'https://tinyurl.com/5dkxbcjc',
];

export default function Image() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Stack axis="y" spacing="large">
        <Stack axis="y" spacing="regular">
          <Text variant="headingS">Images</Text>

          <Grid spacing="regular" justify="center">
            {photos.map((photo, index) => (
              <UiImage
                style={styles.img}
                key={index}
                source={{ uri: photo }}
                autoSize={{ width: 300 }}
                accessibilityLabel={`Flower ${index + 1}`}
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.space.regular,
  },
  img: {
    borderRadius: theme.radii.regular,
  },
}));

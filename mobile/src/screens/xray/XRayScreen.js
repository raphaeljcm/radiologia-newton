import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import Lightbox from 'react-native-lightbox-v2';
import { useState } from 'react';

const IMAGE_DIMENSIONS_DEFAULT = {
  width: 100,
  height: 100,
};

const IMAGE_DIMENSIONS_LARGE = {
  width: 350,
  height: 350,
};

export function XRayScreen({ route, navigator }) {
  const { images } = route.params;
  const [imageDimensions, setImageDimensions] = useState(
    IMAGE_DIMENSIONS_DEFAULT,
  );

  const handleOpenLightbox = () => {
    setImageDimensions(IMAGE_DIMENSIONS_LARGE);
  };

  const handleCloseLightbox = () => {
    setImageDimensions(IMAGE_DIMENSIONS_DEFAULT);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Lightbox
            navigator={navigator}
            onOpen={handleOpenLightbox}
            onClose={handleCloseLightbox}
          >
            <Image
              source={{
                uri: item.url,
              }}
              style={[styles.image, imageDimensions]}
              resizeMode="cover"
              loadingIndicatorSource={require('../../../assets/blurhash.png')}
            />
          </Lightbox>
        )}
        keyExtractor={item => item.id}
        horizontal
      />

      <Divider />

      <View style={styles.descriptionContainer}>
        <Text variant="headlineLarge">{images[0].access_group}</Text>

        <View style={styles.description}>
          <Text variant="titleLarge">Descrição:</Text>
          <Text variant="bodyMedium">{images[0].description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 20,
  },
  image: {
    borderRadius: 20,
    marginRight: 15,
  },
  descriptionContainer: {
    gap: 20,
  },
  description: {
    gap: 10,
  },
});

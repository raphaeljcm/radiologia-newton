import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';

export function SelectImage({ onImageChange, initialImage }) {
  const [image, setImage] = useState(initialImage);

  const handleImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (result.canceled) {
        throw new Error('Seleção de imagem cancelada.');
      }
      setImage(result.assets[0].uri);
      onImageChange(result.assets[0].base64);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button icon="camera" onPress={handleImagePicker} textColor="#193073">
        Selecione uma foto
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 40,
    objectFit: 'cover',
  },
});

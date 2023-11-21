import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-paper';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';

const getFileInfo = async uri => {
  return await FileSystem.getInfoAsync(uri);
};

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
  return fileSize / 1024 / 1024 < smallerThanSizeMB;
};

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

      const image = result.assets[0];

      const fileInfo = await getFileInfo(image.uri);
      if (!fileInfo.size) throw new Error('Imagem inválida.');
      console.log(fileInfo.size);
      const isLT15MB = isLessThanTheMB(fileInfo.size, 1.5);
      if (!isLT15MB) throw new Error('Imagem muito grande.');

      setImage(image.uri);
      onImageChange(image.base64);
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

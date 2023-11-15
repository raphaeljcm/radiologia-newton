import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ItemMenu } from './ItemMenu';
import { useState } from 'react';
import { api } from '../../lib/axios';
import { AppError } from '../../utils/AppError';
import { useNavigation } from '@react-navigation/native';

export function MenuScreen({ route }) {
  const { selectedItems } = route.params;
  const [firstFlatListData, setFirstFlatListData] = useState(
    Object.values(selectedItems),
  );
  const [secondFlatListData, setSecondFlatListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const navigation = useNavigation();

  const handleItemSelection = async item => {
    if (item.label === selectedItem) return;

    if (item && item.children) {
      setSecondFlatListData(Object.values(item.children));
    } else {
      const imageData = await getImages(item.label);
      navigation.navigate('xray', { images: imageData });
    }

    setSelectedItem(item.label);
  };

  const handleSecondLevelItemClick = async item => {
    if (item && item.children) {
      setFirstFlatListData(secondFlatListData);
      setSecondFlatListData(Object.values(item.children));
      setSelectedItem(item.label);
    } else {
      const imageData = await getImages(item.label);
      navigation.navigate('xray', { images: imageData });
    }
  };

  const getImages = async accessGroup => {
    try {
      const { data } = await api.get(`/images?accessGroup=${accessGroup}`);
      return data;
    } catch (err) {
      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível carregar as imagens. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={firstFlatListData}
        renderItem={({ item }) => (
          <ItemMenu
            item={item}
            isSelected={selectedItem === item.label}
            onPress={() => handleItemSelection(item)}
          />
        )}
        keyExtractor={item => item.label}
        horizontal
      />

      {secondFlatListData.length > 0 ? (
        <FlatList
          data={secondFlatListData}
          renderItem={({ item }) => (
            <Button
              mode="contained"
              buttonColor="#d9d9d9"
              textColor="#022132"
              onPress={() => handleSecondLevelItemClick(item)}
              style={{ marginBottom: 10 }}
            >
              {item.label}
            </Button>
          )}
          keyExtractor={item => item.label}
        />
      ) : (
        <Text>Por favor, selecione uma categoria</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 20,
  },
});

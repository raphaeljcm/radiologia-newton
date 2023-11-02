import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ItemMenu } from './ItemMenu';
import { useState } from 'react';

export function MenuScreen({ route }) {
  const { selectedItems } = route.params;
  const [firstFlatListData, setFirstFlatListData] = useState(
    Object.values(selectedItems),
  );
  const [secondFlatListData, setSecondFlatListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemSelection = item => {
    if (item.label === selectedItem) return;

    if (item && item.children) {
      setSecondFlatListData(Object.values(item.children));
    } else {
      Alert.alert(`Let's fetch data about: ${item.label}`);
    }

    setSelectedItem(item.label);
  };

  const handleSecondLevelItemClick = item => {
    if (item && item.children) {
      setFirstFlatListData(secondFlatListData);
      setSecondFlatListData(Object.values(item.children));
      setSelectedItem(item.label);
    } else {
      Alert.alert(`Let's fetch data about: ${item.label}`);
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

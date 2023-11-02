import { FlatList, StyleSheet, View } from 'react-native';
import { MenuItem } from './MenuItem';
import { MENU_ITEMS } from '../../constants';

export function HomeScreen({ navigation }) {
  const handleMenuItemClick = item => {
    navigation.navigate('menu', { selectedItems: item.children });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(MENU_ITEMS)}
        renderItem={({ item }) => (
          <MenuItem
            title={item.label}
            icon="body"
            onPress={() => handleMenuItemClick(item)}
          />
        )}
        keyExtractor={item => item.label}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

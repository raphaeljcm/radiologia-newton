import { FlatList, StyleSheet, View } from 'react-native';
import { MenuItem } from './MenuItem';
import { MENU_ITEMS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { HomeHeader } from '../../components/HomeHeader';

export function HomeScreen() {
  const navigation = useNavigation();

  const handleMenuItemClick = item => {
    navigation.navigate('menu', { selectedItems: item.children });
  };

  return (
    <View style={styles.container}>
      <HomeHeader />

      <View style={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

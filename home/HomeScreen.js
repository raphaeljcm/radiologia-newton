import { FlatList, StyleSheet, View } from 'react-native';
import { MenuItem } from './MenuItem';

const MENU_ITEMS = [
  {
    id: 1,
    title: 'Anatomia',
    icon: 'body',
  },
  {
    id: 2,
    title: 'Patologia',
    icon: 'body',
  },
  {
    id: 3,
    title: 'Alterações dentárias',
    icon: 'body',
  },
  {
    id: 4,
    title: 'Testes',
    icon: 'body',
  },
];

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={MENU_ITEMS}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            icon={item.icon}
            onPress={() => navigation.navigate('menu')}
          />
        )}
        keyExtractor={item => item.id.toString()}
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

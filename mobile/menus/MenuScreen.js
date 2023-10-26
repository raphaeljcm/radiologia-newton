import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ItemMenu } from './ItemMenu';

const PREVIEW_MENU = [
  {
    id: 1,
    label: 'Dentes e estruturas anexas',
  },
  {
    id: 2,
    label: 'Maxilar',
  },
  {
    id: 3,
    label: 'Mandíbula',
  },
  {
    id: 4,
    label: 'Panorâmica',
  },
];

const MENUS = [
  {
    id: 1,
    label: 'Canais nutrientes',
  },
  {
    id: 2,
    label: 'Câmara pulpar e canal radicular',
  },
  {
    id: 3,
    label: 'Cemento',
  },
  {
    id: 4,
    label: 'Cortical alveolar',
  },
  {
    id: 5,
    label: 'Crista óssea alveolar',
  },
  {
    id: 6,
    label: 'Dentina',
  },
  {
    id: 7,
    label: 'Esmalte',
  },
  {
    id: 8,
    label: 'Espaço do ligamento periodontal',
  },
  {
    id: 9,
    label: 'Folículo pericoronário',
  },
  {
    id: 10,
    label: 'Osso alveolar',
  },
  {
    id: 11,
    label: 'Papila dentária',
  },
];

export function MenuScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={PREVIEW_MENU}
        renderItem={({ item }) => <ItemMenu item={item} />}
        keyExtractor={item => item.id.toString()}
        horizontal
      />

      <FlatList
        data={MENUS}
        renderItem={({ item }) => (
          <Button
            mode="contained"
            buttonColor="#d9d9d9"
            textColor="#022132"
            onPress={() => alert(`eita ${item.id}`)}
            style={{ marginBottom: 10 }}
          >
            {item.label}
          </Button>
        )}
        keyExtractor={item => item.id.toString()}
      />
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

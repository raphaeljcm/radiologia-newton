import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export function ItemMenu({ item, isSelected, onPress }) {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <MaterialCommunityIcons
        name={'tooth'}
        size={64}
        color="black"
        style={[styles.icon, isSelected && styles.selected]}
      />
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 114,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  icon: {
    backgroundColor: 'orange',
    borderRadius: 9999,
    padding: 10,
  },
  selected: {
    backgroundColor: 'blue',
  },
});

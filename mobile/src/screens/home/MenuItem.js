import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export function MenuItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={54} color="#193073" />
      <Text variant="titleMedium" style={styles.menuItemText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#27A4F2',
    borderRadius: 15,
    elevation: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: '#193073',
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export function MenuItem({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={54} color="black" />
      <Text
        variant="titleMedium"
        style={{ color: '#022132', textAlign: 'center' }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: '#f5bd69',
    width: 134,
    height: 130,
    borderRadius: 24,
    shadowColor: 'black',
    elevation: 5,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">About Screen</Text>
      <Text variant="bodyMedium">About Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
});

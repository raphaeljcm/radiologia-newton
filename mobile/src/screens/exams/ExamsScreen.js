import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function ExamsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Exams Screen</Text>
      <Text variant="bodyMedium">Exams Screen</Text>
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

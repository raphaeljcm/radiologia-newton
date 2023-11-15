import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Terms Screen</Text>
      <Text variant="bodyMedium">Terms Screen</Text>
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

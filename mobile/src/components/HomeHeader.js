import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuthContext } from '../contexts/AuthContext';

export function HomeHeader() {
  const { onSignOut, user } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://github.com/raphaeljcm.png' }}
          style={styles.image}
          alt="user image"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.name}>Olá,</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>

      <Button icon="logout" textColor="white" onPress={onSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#193073',
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    height: '100%',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#fff',
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

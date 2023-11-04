import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useAuthContext } from '../contexts/AuthContext';

export function HomeHeader() {
  const { onSignOut, user } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar.Image
          source={{ uri: 'https://github.com/raphaeljcm.png' }}
          style={styles.image}
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
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: '#fff',
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    marginLeft: 12,
  },
});

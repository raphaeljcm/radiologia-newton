import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const handleEditButtonPress = () => {
    navigation.navigate('edit', {
      userData: {
        name: user.name,
        email: user.email,
        ra: '12109453',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image
          source={{ uri: `data:image/jpg;base64,${user.image}` }}
          size={70}
        />

        <Text style={styles.name}>Olá, {user.name}</Text>
      </View>

      <View style={styles.fields}>
        <TextInput value={user.email} label="Email" disabled />
        <TextInput value={user.name} label="nome" disabled />
        <TextInput value="12109453" label="ra" disabled />
      </View>

      <Button
        icon="pencil"
        mode="contained"
        textColor="#193073"
        buttonColor="white"
        onPress={handleEditButtonPress}
      >
        Editar perfil
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 20,
    gap: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#193073',
  },
  fields: {
    gap: 10,
    width: '100%',
  },
});

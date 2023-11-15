import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AppError } from '../../utils/AppError';
import { api } from '../../lib/axios';

export function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const handleEditButtonPress = () => {
    navigation.navigate('edit', {
      userData,
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);

        const { data } = await api.get(`/users/${user.id}`);
        setUserData(data);
      } catch (error) {
        const isAppError = err instanceof AppError;
        const title = isAppError
          ? err.message
          : 'Não foi carregar os dados. Tente novamente mais tarde.';

        Alert.alert(title);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [user.id]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {!isLoading && (
          <Avatar.Image source={{ uri: `${userData.image}` }} size={70} />
        )}

        <Text style={styles.name}>Olá, {userData.name}</Text>
      </View>

      <View style={styles.fields}>
        <TextInput value={userData.email} label="Email" disabled />
        <TextInput value={userData.name} label="nome" disabled />
        <TextInput value={userData.ra} label="ra" disabled />
      </View>

      <Button
        icon="pencil"
        mode="contained"
        textColor="#193073"
        buttonColor="white"
        disabled={isLoading || !userData}
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

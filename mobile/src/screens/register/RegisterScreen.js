import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../lib/axios';
import { AppError } from '../../utils/AppError';

export function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !ra || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await api.post('/register', {
        name,
        email,
        ra,
        password,
        image: null,
      });

      setLoading(false);
      navigation.navigate('login');
    } catch (err) {
      setLoading(false);

      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">Cadastre-se</Text>

      <View style={styles.actionContainer}>
        <TextInput
          label="Nome"
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          label="E-mail"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput label="RA" onChangeText={text => setRa(text)} value={ra} />
        <TextInput
          label="Senha"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowPassword(prev => !prev)}
            />
          }
        />

        <Button
          mode="contained"
          buttonColor="#193073"
          textColor="white"
          onPress={handleRegister}
          loading={loading}
        >
          Cadastrar
        </Button>
      </View>

      {error && (
        <Text variant="labelLarge" style={styles.error}>
          {error}!
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 60,
    backgroundColor: '#27A4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    gap: 20,
    width: '100%',
  },
  error: {
    color: '#193073',
    margin: 0,
  },
});

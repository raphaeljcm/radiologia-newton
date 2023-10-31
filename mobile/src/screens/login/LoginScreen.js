import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { api } from '../../lib/axios';
import logo from '../../../assets/radiologia.png';
import { AppError } from '../../utils/AppError';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setError('');
      setLoading(true);

      await api.post('/login', {
        email,
        password,
      });

      setLoading(false);
      navigation.navigate('home');
    } catch (err) {
      setLoading(false);

      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível entrar no aplicativo. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  }

  function handleRegister() {
    navigation.navigate('register');
  }

  return (
    <View style={styles.container}>
      <Image source={logo} alt="logo" style={styles.logo} />

      <View style={styles.actionContainer}>
        <TextInput
          label="E-mail"
          value={email}
          onChangeText={text => setEmail(text)}
        />
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
          onPress={handleLogin}
          loading={loading}
        >
          Entrar
        </Button>

        <Button
          style={styles.register}
          textColor="#193073"
          onPress={handleRegister}
        >
          Cadastre-se
        </Button>

        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
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
  logo: {
    width: 200,
    height: 200,
  },
  actionContainer: {
    gap: 20,
    width: '100%',
  },
  title: {
    color: '#fff',
  },
  register: {
    textAlign: 'center',
  },
  error: {
    color: '#193073',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

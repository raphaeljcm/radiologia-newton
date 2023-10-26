import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { login } from '../services/login';

import logo from '../assets/radiologia.png';
import { GoogleLogoIcon } from '../components/GoogleLogoIcon';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  async function handleLogin() {
    const result = await login(email, password);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigation.navigate('home');
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
        >
          Entrar
        </Button>

        <Text style={styles.register}>Cadastre-se</Text>

        <Text style={styles.register}> ──────── Ou continue com ────────</Text>

        <GoogleLogoIcon />

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

import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';

import Contants from 'expo-constants';
import logo from '../assets/radiologia.png';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

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
      <Button mode="contained" buttonColor="#022132" textColor="#f5bd69">
        Login
      </Button>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: Contants.statusBarHeight,
    flex: 1,
    paddingHorizontal: 20,
    gap: 60,
    backgroundColor: '#F5BD69',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  actionContainer: {
    gap: 30,
    width: '100%',
  },
  title: {
    color: '#fff',
  },
});

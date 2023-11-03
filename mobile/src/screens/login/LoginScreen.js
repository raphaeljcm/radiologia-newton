import React, { useReducer } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import logo from '../../../assets/radiologia.png';
import { AppError } from '../../utils/AppError';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const initialState = {
  email: '',
  password: '',
  error: '',
  showPassword: true,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'setError':
      return { ...state, error: action.error };
    case 'setLoading':
      return { ...state, loading: action.loading };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export function LoginScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { onSignIn } = useAuthContext();
  const navigation = useNavigation();

  async function handleLogin() {
    const { email, password } = state;

    if (!email || !password) {
      dispatch({ type: 'setError', error: 'Preencha todos os campos' });
      return;
    }

    try {
      dispatch({ type: 'setError', error: '' });
      dispatch({ type: 'setLoading', loading: true });

      await onSignIn(email, password);

      dispatch({ type: 'setLoading', loading: false });
    } catch (err) {
      dispatch({ type: 'setLoading', loading: false });

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
          value={state.email}
          onChangeText={text =>
            dispatch({ type: 'updateField', field: 'email', value: text })
          }
        />
        <TextInput
          label="Senha"
          secureTextEntry={state.showPassword}
          value={state.password}
          onChangeText={text =>
            dispatch({ type: 'updateField', field: 'password', value: text })
          }
          right={
            <TextInput.Icon
              icon={state.showPassword ? 'eye' : 'eye-off'}
              onPress={() =>
                dispatch({
                  type: 'updateField',
                  field: 'showPassword',
                  value: !state.showPassword,
                })
              }
            />
          }
        />
        <Button
          mode="contained"
          buttonColor="#193073"
          textColor="white"
          onPress={handleLogin}
          loading={state.loading}
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

        {!!state.error && <Text style={styles.error}>{state.error}</Text>}
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

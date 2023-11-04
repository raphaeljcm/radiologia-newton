import { useReducer } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../lib/axios';
import { AppError } from '../../utils/AppError';
import { useNavigation } from '@react-navigation/native';

const INITIAL_STATE = {
  name: '',
  email: '',
  ra: '',
  password: '',
  showPassword: true,
  error: '',
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

export function RegisterScreen() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const navigation = useNavigation();

  async function handleRegister() {
    const { name, email, password } = state;

    if (!name || !email || !password) {
      dispatch({ type: 'setError', error: 'Preencha todos os campos' });
      return;
    }

    try {
      dispatch({ type: 'setError', error: '' });
      dispatch({ type: 'setLoading', loading: true });

      await api.post('/register', {
        name,
        email,
        ra: state.ra ? state.ra : null,
        password,
        image: null,
      });

      dispatch({ type: 'setLoading', loading: false });
      navigation.navigate('login');
    } catch (err) {
      dispatch({ type: 'setLoading', loading: false });

      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  }

  const handleChange = (field, value) => {
    dispatch({ type: 'updateField', field, value });
  };

  const toggleShowPassword = () => {
    dispatch({
      type: 'updateField',
      field: 'showPassword',
      value: !state.showPassword,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">Cadastre-se</Text>

      <View style={styles.actionContainer}>
        <TextInput
          label="Nome*"
          onChangeText={text => handleChange('name', text)}
          value={state.name}
        />
        <TextInput
          label="E-mail*"
          onChangeText={text => handleChange('email', text)}
          value={state.email}
        />
        <TextInput
          label="RA"
          onChangeText={text => handleChange('ra', text)}
          value={state.ra}
        />
        <TextInput
          label="Senha*"
          secureTextEntry={state.showPassword}
          value={state.password}
          onChangeText={text => handleChange('password', text)}
          right={
            <TextInput.Icon
              icon={state.showPassword ? 'eye' : 'eye-off'}
              onPress={toggleShowPassword}
            />
          }
        />

        <Button
          mode="contained"
          buttonColor="#193073"
          textColor="white"
          onPress={handleRegister}
          loading={state.loading}
        >
          Cadastrar
        </Button>
      </View>

      <HelperText type="error" visible={!!state.error}>
        {state.error}
      </HelperText>
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
});

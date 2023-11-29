import { useReducer } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../lib/axios';
import { AppError } from '../../utils/AppError';
import { SelectImage } from '../../components/SelectImage';
import { useNavigation } from '@react-navigation/native';

const INITIAL_STATE = {
  name: '',
  email: '',
  ra: '',
  password: '',
  image: '',
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
      return INITIAL_STATE;
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

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      if (state.ra) formData.append('ra', state.ra);
      if (state.image) formData.append('image', state.image);

      await api.post('/register', formData);

      dispatch({ type: 'setLoading', loading: false });
      navigation.navigate('login');
    } catch (err) {
      dispatch({ type: 'setLoading', loading: false });
      dispatch({ type: 'setError', error: err.message });

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

  const handleImageChange = async base64Image => {
    try {
      dispatch({ type: 'updateField', field: 'image', value: base64Image });
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineLarge">Cadastre-se</Text>

      <View style={styles.actionContainer}>
        <SelectImage onImageChange={handleImageChange} />

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

import { Alert, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useReducer } from 'react';
import { SelectImage } from '../../components/SelectImage';
import { AppError } from '../../utils/AppError';
import { api } from '../../lib/axios';

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value };
    case 'setError':
      return { ...state, error: action.error };
    case 'setLoading':
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

export function EditScreen({ route }) {
  const { userData } = route.params;
  const initialState = {
    name: userData.name,
    email: userData.email,
    ra: userData.ra,
    image: userData.image,
    error: '',
    loading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  const handleSaveButtonPress = async () => {
    const { name, email, ra, image } = state;

    try {
      dispatch({ type: 'setError', error: '' });
      dispatch({ type: 'setLoading', loading: true });

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (ra) formData.append('ra', ra);
      if (image) formData.append('image', image);

      await api.put(`/users/${userData.id}`, formData);

      dispatch({ type: 'setLoading', loading: false });
      navigation.goBack();
    } catch (err) {
      dispatch({ type: 'setLoading', loading: false });
      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível salvar as informações. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  };

  const handleChange = (field, value) => {
    dispatch({ type: 'updateField', field, value });
  };

  const handleImageChange = async base64Image => {
    try {
      handleChange('image', base64Image);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SelectImage
          onImageChange={handleImageChange}
          initialImage={userData.image}
        />
      </View>

      <View style={styles.fields}>
        <TextInput
          value={state.email}
          label="Email"
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          value={state.name}
          label="nome"
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          value={state.ra}
          label="ra"
          onChangeText={text => handleChange('ra', text)}
        />
      </View>

      <Button
        icon="content-save"
        mode="contained"
        textColor="#193073"
        buttonColor="white"
        loading={state.loading}
        disabled={state.loading}
        onPress={handleSaveButtonPress}
      >
        Salvar alterações
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
    gap: 20,
    alignItems: 'center',
  },
  imageContainer: {
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

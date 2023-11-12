import { StyleSheet, View } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useReducer } from 'react';
import { SelectImage } from '../../components/SelectImage';
import { AppError } from '../../utils/AppError';

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
  const { user } = useAuthContext();
  const navigation = useNavigation();

  const handleSaveButtonPress = () => {
    const { name, email, ra, image } = state;

    try {
      dispatch({ type: 'setError', error: '' });
      dispatch({ type: 'setLoading', loading: true });

      // TODO: save user data

      dispatch({ type: 'setLoading', loading: false });
      navigation.goBack();
    } catch {
      dispatch({ type: 'setLoading', loading: false });

      const isAppError = err instanceof AppError;
      const title = isAppError
        ? err.message
        : 'Não foi possível salvar as informações. Tente novamente mais tarde.';

      Alert.alert(title);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar.Image
          source={{ uri: `data:image/jpg;base64,${user.image}` }}
          size={70}
        />

        <SelectImage />
      </View>

      <View style={styles.fields}>
        <TextInput
          value={user.email}
          label="Email"
          onChangeText={text =>
            dispatch({ type: 'updateField', field: 'email', value: text })
          }
        />
        <TextInput
          value={user.name}
          label="nome"
          onChangeText={text =>
            dispatch({ type: 'updateField', field: 'name', value: text })
          }
        />
        <TextInput
          value="12109453"
          label="ra"
          onChangeText={text =>
            dispatch({ type: 'updateField', field: 'ra', value: text })
          }
        />
      </View>

      <Button
        icon="content-save"
        mode="contained"
        textColor="#193073"
        buttonColor="white"
        loading={state.loading}
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

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/login/LoginScreen';
import { RegisterScreen } from '../screens/register/RegisterScreen';

const { Navigator, Screen } = createNativeStackNavigator();

const OPTIONS = {
  login: {
    headerShown: false,
  },
  register: {
    headerShown: false,
  },
};

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="login" component={LoginScreen} options={OPTIONS.login} />
      <Screen
        name="register"
        component={RegisterScreen}
        options={OPTIONS.register}
      />
    </Navigator>
  );
}

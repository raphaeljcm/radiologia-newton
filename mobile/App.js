import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuScreen } from './src/screens/menu/MenuScreen';
import { LoginScreen } from './src/screens/login/LoginScreen';
import { HomeScreen } from './src/screens/home/HomeScreen';
import { XRayScreen } from './src/screens/xray/XRayScreen';
import { RegisterScreen } from './src/screens/register/RegisterScreen';

const LOGIN_OPTIONS = {
  login: {
    headerShown: false,
  },
  register: {
    headerShown: false,
  },
  home: {
    title: 'Radiologia Newton',
  },
  menu: {
    title: 'Anatomia',
  },
  xray: {
    title: 'Raio-X',
  },
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={LOGIN_OPTIONS.login}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={LOGIN_OPTIONS.register}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={LOGIN_OPTIONS.home}
        />
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={LOGIN_OPTIONS.menu}
        />
        <Stack.Screen
          name="xray"
          component={XRayScreen}
          options={LOGIN_OPTIONS.xray}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuScreen } from './menus/MenuScreen';
import { LoginScreen } from './login/LoginScreen';
import { HomeScreen } from './home/HomeScreen';

const LOGIN_OPTIONS = {
  login: {
    headerShown: false,
  },
  home: {
    title: 'Radiologia Newton',
  },
  menu: {
    title: 'Anatomia',
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
          name="home"
          component={HomeScreen}
          options={LOGIN_OPTIONS.home}
        />
        <Stack.Screen
          name="menu"
          component={MenuScreen}
          options={LOGIN_OPTIONS.menu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

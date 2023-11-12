import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { XRayScreen } from '../screens/xray/XRayScreen';
import { DrawerRoutes } from './drawer.routes';

const { Navigator, Screen } = createNativeStackNavigator();

const OPTIONS = {
  home: {
    headerShown: false,
  },
  menu: {
    title: 'Anatomia',
  },
  xray: {
    title: 'Raio-X',
  },
  drawer: {
    headerShown: false,
  },
};

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#27A4F2',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
      }}
    >
      <Screen name="main" component={DrawerRoutes} options={OPTIONS.drawer} />
      <Screen name="menu" component={MenuScreen} options={OPTIONS.menu} />
      <Screen name="xray" component={XRayScreen} options={OPTIONS.xray} />
    </Navigator>
  );
}

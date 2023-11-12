import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { XRayScreen } from '../screens/xray/XRayScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { DrawerRoutes } from './drawer.routes';
import { EditScreen } from '../screens/edit/EditScreen';

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
  profile: {
    title: 'Perfil',
  },
  edit: {
    title: 'Editar perfil',
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
      <Screen
        name="profile"
        component={ProfileScreen}
        options={OPTIONS.profile}
      />
      <Screen name="edit" component={EditScreen} options={OPTIONS.edit} />
    </Navigator>
  );
}

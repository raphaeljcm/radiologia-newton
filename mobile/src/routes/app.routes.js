import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MenuScreen } from '../screens/menu/MenuScreen';
import { XRayScreen } from '../screens/xray/XRayScreen';

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
};

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={HomeScreen} options={OPTIONS.home} />
      <Screen name="menu" component={MenuScreen} options={OPTIONS.menu} />
      <Screen name="xray" component={XRayScreen} options={OPTIONS.xray} />
    </Navigator>
  );
}

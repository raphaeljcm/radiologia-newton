import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CustomDrawer } from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const OPTIONS = {
  home: {
    title: 'Radiologia Newton',
  },
};

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#27A4F2',
        },
        headerTitleStyle: {
          color: 'white',
        },
        drawerStyle: {
          width: 260,
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={OPTIONS.home}
      />
    </Drawer.Navigator>
  );
}

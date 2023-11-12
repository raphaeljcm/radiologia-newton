import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CustomDrawer } from '../components/CustomDrawer';
import { Feather } from '@expo/vector-icons';

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#27A4F2',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        drawerStyle: {
          width: 260,
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          drawerLabel: 'Home',
          title: 'Radiologia Newton',
        }}
      />
    </Navigator>
  );
}

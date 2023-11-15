import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CustomDrawer } from '../components/CustomDrawer';
import { Feather } from '@expo/vector-icons';
import { AboutScreen } from '../screens/about/AboutScreen';
import { ContactScreen } from '../screens/contact/ContactScreen';
import { TermsScreen } from '../screens/terms/TermsScreen';

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
      <Screen
        name="about"
        component={AboutScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Feather name="info" size={size} color={color} />
          ),
          drawerLabel: 'Sobre',
          title: 'Sobre',
        }}
      />
      <Screen
        name="contact"
        component={ContactScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Feather name="phone" size={size} color={color} />
          ),
          drawerLabel: 'Contato',
          title: 'Contato',
        }}
      />
      <Screen
        name="terms"
        component={TermsScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          drawerLabel: 'Termos de Uso',
          title: 'Termos de Uso',
        }}
      />
    </Navigator>
  );
}

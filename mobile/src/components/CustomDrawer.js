import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useAuthContext } from '../contexts/AuthContext';

export function CustomDrawer(props) {
  const { user, onSignOut } = useAuthContext();

  return (
    <View style={styles.container}>
      <View style={[styles.view, styles.headerContainer]}>
        <Avatar.Image
          source={{ uri: `data:image/jpg;base64,${user.image}` }}
          size={40}
          style={styles.image}
        />

        <Text style={styles.name}>Olá, {user.name}</Text>
      </View>

      <DrawerContentScrollView style={styles.scrollView} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={[styles.view, styles.footerContainer]}>
        <Button icon="logout" textColor="#193073" onPress={onSignOut}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    borderRadius: 10,
  },
  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  view: {
    backgroundColor: '#fff',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 12,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    color: '#193073',
    alignSelf: 'center',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomRightRadius: 10,
  },
});

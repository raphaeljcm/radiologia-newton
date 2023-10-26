import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import logoGoogle from '../assets/logo-google.png';

export function GoogleLogoIcon() {
  return (
    <TouchableOpacity style={styles.main}>
      <Image source={logoGoogle} style={styles.logoGoogle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 70,
    width: 70,
    backgroundColor: '#193073',
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.06,
    elevation: 10,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoGoogle: {
    width: 34,
    height: 34,
  },
});

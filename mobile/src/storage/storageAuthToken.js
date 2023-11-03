import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_STORAGE } from './storageConfig';

export async function storageAuthTokenSave(token) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet() {
  return await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
}

export async function storageAuthTokenRemove() {
  return await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}

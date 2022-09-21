import AsyncStorage from '@react-native-async-storage/async-storage';

enum STORAGE_KEYS {
  BOARD = 'board',
}

export async function setItem(key: STORAGE_KEYS, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    return error;
  }
}

export async function getItem(key: STORAGE_KEYS) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }

    throw new Error('key has empty value');
  } catch (error) {
    return error;
  }
}

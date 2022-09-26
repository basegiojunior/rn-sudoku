import AsyncStorage from '@react-native-async-storage/async-storage';

export enum STORAGE_KEYS {
  BOARD = 'board',
}

export async function setItem(key: STORAGE_KEYS, value: any) {
  try {
    const stringValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    throw error;
  }
}

export async function getItem(key: STORAGE_KEYS) {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue !== null) {
      const jsonValue = stringValue != null ? JSON.parse(stringValue) : null;
      return jsonValue;
    }

    throw new Error('key has empty value');
  } catch (error) {
    throw error;
  }
}

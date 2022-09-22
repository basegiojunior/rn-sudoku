import AsyncStorage from '@react-native-async-storage/async-storage';

export enum STORAGE_KEYS {
  BOARD = 'board',
}

export async function setItem(key: STORAGE_KEYS, value: any, isString = false) {
  try {
    let stringValue;
    if (isString) {
      stringValue = value;
    } else {
      stringValue = JSON.stringify(value);
    }

    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    throw error;
  }
}

export async function getItem(key: STORAGE_KEYS, isString = false) {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue !== null) {
      if (isString) {
        return stringValue;
      } else {
        const jsonValue = stringValue != null ? JSON.parse(stringValue) : null;
        return jsonValue;
      }
    }

    throw new Error('key has empty value');
  } catch (error) {
    throw error;
  }
}

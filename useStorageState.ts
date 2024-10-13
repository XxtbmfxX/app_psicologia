import { useEffect, useCallback, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { encryptData, decryptData } from '@/encryption';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  const encryptedValue = value ? encryptData(value) : null;

  if (Platform.OS === 'web') {
    try {
      if (encryptedValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, encryptedValue);
      }
    } catch (e) {
      console.error('Local storage no disponible:', e);
    }
  } else {
    if (encryptedValue == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, encryptedValue);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  // Leer datos almacenados al iniciar la app
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedValue = Platform.OS === 'web'
          ? localStorage.getItem(key)
          : await AsyncStorage.getItem(key);

        const decryptedValue = storedValue ? decryptData(storedValue) : null;
        setState(decryptedValue);
      } catch (e) {
        console.error('Error al leer el almacenamiento:', e);
      }
    };

    fetchData();
  }, [key]);

  // Guardar los datos cada vez que cambian
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}

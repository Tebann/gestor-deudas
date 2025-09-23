import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Obtenemos el valor inicial desde localStorage o usamos el valor por defecto.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Creamos un useEffect que se ejecute cada vez que el estado 'storedValue' cambie.
  // Esto guardará el nuevo valor en localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
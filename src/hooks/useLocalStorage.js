import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * key: string -> clave en localStorage
 * initialValue: valor inicial (o función que devuelva valor)
 *
 * Retorna [estado, setter] exactamente como useState, pero persistente en localStorage.
 */
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (e) {
      console.error('useLocalStorage: read error', e);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error('useLocalStorage: write error', e);
    }
  }, [key, state]);

  return [state, setState];
}
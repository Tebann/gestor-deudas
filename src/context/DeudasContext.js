import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DeudasContext = createContext();

export function DeudasProvider({ children }) {
  // clave única para evitar colisiones en GitHub Pages
  const STORAGE_KEY = 'gestor_deudas_v1_Tebann';
  const [deudas, setDeudas] = useLocalStorage(STORAGE_KEY, []);

  const addDeuda = (d) => setDeudas(prev => [...prev, { id: Date.now(), ...d }]);
  const updateDeuda = (id, patch) => setDeudas(prev => prev.map(x => x.id === id ? { ...x, ...patch } : x));
  const removeDeuda = (id) => setDeudas(prev => prev.filter(x => x.id !== id));
  const clearAll = () => setDeudas([]);

  return (
    <DeudasContext.Provider value={{ deudas, addDeuda, updateDeuda, removeDeuda, clearAll }}>
      {children}
    </DeudasContext.Provider>
  );
}

export const useDeudas = () => useContext(DeudasContext);

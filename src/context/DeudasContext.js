import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase'; // Asegúrate de que la ruta sea correcta (../firebase)
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  arrayUnion // <-- 1. IMPORTAMOS arrayUnion
} from 'firebase/firestore';

const DeudasContext = createContext();

export function DeudasProvider({ children }) {
  const [user, setUser] = useState(null);
  const [deudas, setDeudas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Lógica de Autenticación (sin cambios) ---
  const login = async () => { /* ...código sin cambios... */ };
  const logout = async () => { /* ...código sin cambios... */ };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Lógica de Firestore (con la sincronización ya funcionando) ---
  useEffect(() => {
    if (user) {
      const deudasCollectionRef = collection(db, 'usuarios', user.uid, 'deudas');
      const q = query(deudasCollectionRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const deudasData = [];
        querySnapshot.forEach((doc) => {
          deudasData.push({ ...doc.data(), id: doc.id });
        });
        setDeudas(deudasData);
      });

      return () => unsubscribe();
    } else {
      setDeudas([]);
    }
  }, [user]);

  // --- Funciones CRUD para Firestore ---
  const addDeuda = async (deudaData) => {
    if (!user) return;
    const deudasCollectionRef = collection(db, 'usuarios', user.uid, 'deudas');
    await addDoc(deudasCollectionRef, deudaData);
  };

  // 2. CORREGIMOS updateDeuda PARA USAR arrayUnion
  const updateDeuda = async (id, newPaymentObject) => {
    if (!user) return;
    // El 'id' aquí es el string que viene de Firestore
    const deudaDoc = doc(db, 'usuarios', user.uid, 'deudas', id);
    
    await updateDoc(deudaDoc, {
      payments: arrayUnion(newPaymentObject)
    });
  };

  const removeDeuda = async (id) => {
    if (!user) return;
    const deudaDoc = doc(db, 'usuarios', user.uid, 'deudas', id);
    await deleteDoc(deudaDoc);
  };

  const value = {
    user,
    login,
    logout,
    deudas,
    addDeuda,
    updateDeuda,
    removeDeuda,
  };

  return (
    <DeudasContext.Provider value={value}>
      {!loading && children}
    </DeudasContext.Provider>
  );
}

export const useDeudas = () => useContext(DeudasContext);
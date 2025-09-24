import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from './firebase'; // Asegúrate de que la ruta a firebase.js sea correcta
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from 'firebase/firestore';

const DeudasContext = createContext();

export function DeudasProvider({ children }) {
  const [user, setUser] = useState(null);
  const [deudas, setDeudas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Lógica de Autenticación ---
  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // Efecto que escucha los cambios de sesión (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  // --- Lógica de Firestore (Base de Datos) ---
  // Efecto que se ejecuta cuando el usuario cambia (inicia o cierra sesión)
  useEffect(() => {
    if (user) {
      // Referencia a la subcolección 'deudas' del usuario actual
      const deudasCollectionRef = collection(db, 'usuarios', user.uid, 'deudas');
      const q = query(deudasCollectionRef);

      // onSnapshot crea un listener en tiempo real para los datos
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const deudasData = [];
        querySnapshot.forEach((doc) => {
          deudasData.push({ ...doc.data(), id: doc.id });
        });
        setDeudas(deudasData);
      });

      return () => unsubscribe(); // Limpia el listener
    } else {
      setDeudas([]); // Si no hay usuario, la lista de deudas está vacía
    }
  }, [user]);

  // Funciones CRUD para interactuar con Firestore
  const addDeuda = async (deudaData) => {
    if (!user) return;
    const deudasCollectionRef = collection(db, 'usuarios', user.uid, 'deudas');
    await addDoc(deudasCollectionRef, deudaData);
  };

  const updateDeuda = async (id, patch) => {
    if (!user) return;
    const deudaDoc = doc(db, 'usuarios', user.uid, 'deudas', id);
    await updateDoc(deudaDoc, patch);
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
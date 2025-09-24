// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase que copiaste de la consola
const firebaseConfig = {
  apiKey: "AIzaSyB_GG6bXzXTsKydmM6xg-Jy6xn0mMNf4Io",
  authDomain: "gestor-deudas-44a0c.firebaseapp.com",
  projectId: "gestor-deudas-44a0c",
  storageBucket: "gestor-deudas-44a0c.firebasestorage.app",
  messagingSenderId: "1024792726055",
  appId: "1:1024792726055:web:dc6628270f21a9a83fdc02"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
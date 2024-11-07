import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";  // Agregar esta importación
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";

import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Reemplaza estos valores con los de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBgvpzygUKtl-a81JxUQy5edYW4AcjxDuQ",
  authDomain: "psicologa-c83a8.firebaseapp.com",
  projectId: "psicologa-c83a8",
  storageBucket: "psicologa-c83a8.appspot.com",
  messagingSenderId: "248582532514",
  appId: "1:248582532514:web:08036637931ef3590f96fb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


// Inicializa Firebase Storage y exporta
export const storage = getStorage(app);  // Exportación correcta de 'storage'
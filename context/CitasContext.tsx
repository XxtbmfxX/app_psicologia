import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Alert } from "react-native";
import { Cita } from "@/types/types";


/**
 * Corregir según el tipo de dato de fecha
 * Mover a carpeta de tipos
 */


type CitasContextType = {
  citas: Cita[];
  addCita: (data: Omit<Cita, "id">) => Promise<string|undefined>;
};

const CitasContext = createContext<CitasContextType | undefined>(
  undefined
);

export const useCitas = () => {
  const context = useContext(CitasContext);
  if (!context) {
    throw new Error(
      "useCitas debe ser usado dentro de un CitasProvider"
    );
  }
  return context;
};

export const CitasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [citas, setCitas] = useState<Cita[]>([]);

  const getCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "citas"));
      const citasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cita[];
      setCitas(citasData);
    } catch (error) {
      console.error("Error al obtener Citas ☠️:", error);
    }
  };

  const addCita = async (data: Omit<Cita, "id">) => {
    try {
      console.log(data)
      await addDoc(collection(db, "citas"), data);
      await getCitas(); // Actualiza la lista
      return "Cita agregada 😎"
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  }


  useEffect(() => {
    getCitas();
  }, []);

  return (
    <CitasContext.Provider
      value={{ citas, addCita }}
    >
      {children}
    </CitasContext.Provider>
  );
};

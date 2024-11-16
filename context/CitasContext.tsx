import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Alert } from "react-native";
import { Cita } from "@/types/types";

type CitasContextType = {
  citas: Cita[];
  addCita: (data: Omit<Cita, "id">) => Promise<string | undefined>;
  updateCita: (cita: Cita) => Promise<string | undefined>;
  getCitaById: (citaId: string) => Promise<Cita | null>;
  deleteCita: (id: string) => Promise<string | undefined>;
  moverCita: (citaId: string) => Promise<void>;
};

const CitasContext = createContext<CitasContextType | undefined>(undefined);

export const useCitas = () => {
  const context = useContext(CitasContext);
  if (!context) {
    throw new Error("useCitas debe ser usado dentro de un CitasProvider");
  }
  return context;
};

export const CitasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [citas, setCitas] = useState<Cita[]>([]);

  // Escucha en tiempo real las citas
  useEffect(() => {
    const q = query(collection(db, "citas"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const citasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Cita[];
      setCitas(citasData);
    });
    return () => unsubscribe();
  }, []);

  // Agrega una cita con validación de fecha
  const addCita = async (data: Omit<Cita, "id">) => {
    try {
      // Validar si la fecha ya existe --> No funciona
      const existe = citas.some(
        (cita) => cita.fechaYHora.toString() === data.fechaYHora.toString()
      );
     
      if (existe) {
        Alert.alert("Fecha duplicada", "Ya existe una cita para esa fecha. 😓");
        return;
      }

      await addDoc(collection(db, "citas"), data);
      return "Cita agregada correctamente 😎";
    } catch (error) {
      console.error("Error al agregar cita:", error);
      Alert.alert("Error", "No se pudo agregar la cita. ☠️");
    }
  };

  // Obtiene una cita por su ID
  const getCitaById = async (citaId: string) => {
    try {
      const citaDoc = await getDoc(doc(db, "citas", citaId));
      if (citaDoc.exists()) {
        return { id: citaDoc.id, ...citaDoc.data() } as Cita;
      } else {
        Alert.alert("Error", "No se encontró la cita especificada al buscarla por id. 😥");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la cita:", error);
      return null;
    }
  };

  // Actualiza una cita
  const updateCita = async (cita: Cita) => {
    try {
      const citaRef = doc(db, "citas", cita.id);
      await setDoc(citaRef, cita, { merge: true });
      return "Cita actualizada correctamente 😎";
    } catch (error) {
      console.error("Error al actualizar cita:", error);
      Alert.alert("Error", "No se pudo actualizar la cita. ☠️");
    }
  };

  // Elimina una cita
  const deleteCita = async (id: string) => {
    try {
      const citaRef = doc(db, "citas", id);
      await deleteDoc(citaRef);
      return "Cita eliminada correctamente 😌";
    } catch (error) {
      console.error("Error al eliminar cita:", error);
      Alert.alert("Error", "No se pudo eliminar la cita. ☠️");
    }
  };

  // Mueve una cita a la colección "citasHechas"
  const moverCita = async (citaId: string) => {
    try {
      const citaRef = doc(db, "citas", citaId);
      const citaSnapshot = await getDoc(citaRef);

      if (!citaSnapshot.exists()) {
        Alert.alert("Error", "No se encontró la cita especificada al mover la cita . 😥");
        return;
      }

      const citaData = citaSnapshot.data();

      const citaHechaRef = doc(db, "citasHechas", citaId);
      await setDoc(citaHechaRef, citaData);

      await deleteDoc(citaRef); // Elimina la cita original
    } catch (error) {
      console.error("Error al mover la cita:", error);
      Alert.alert("Error", "No se pudo mover la cita. ☠️");
    }
  };

  return (
    <CitasContext.Provider
      value={{ citas, addCita, updateCita, getCitaById, deleteCita, moverCita }}
    >
      {children}
    </CitasContext.Provider>
  );
};

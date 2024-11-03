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
  addCita: (data: Omit<Cita, "id">) => Promise<string | undefined>;
  updateCita: (cita: Cita) => Promise<string | undefined>;
  getCitaById: (citaId: string) => Promise<Cita | null>;
  deleteCita: (id: string) => Promise<string | undefined>;
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

  const getCitaById = async (citaId: string) => {
    try {
        const citaDoc = await getDoc(doc(db, "citas", citaId));
        if (citaDoc.exists()) {
            return { id: citaDoc.id, ...citaDoc.data() } as Cita;
        } else {
            console.error("No se encontró la cita con el ID proporcionado.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener la cita por ID:", error);
        return null;
    }
};


  const addCita = async (data: Omit<Cita, "id">) => {
    try {
      console.log(data);
      await addDoc(collection(db, "citas"), data);
      await getCitas(); // Actualiza la lista
      return "Cita agregada 😎";
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  const updateCita = async (cita: Cita) => {
    try {
      const citaRef = doc(db, "citas", cita.id); // Referencia al documento en Firebase
      await updateDoc(citaRef, {
        idPaciente: cita.idPaciente,
        nombre: cita.nombre,
        fechaYHora: cita.fechaYHora,
      });
      await getCitas(); // Actualizar la lista de citas
      return "Cita actualizada correctamente 😎";
    } catch (error) {
      console.error("Error al actualizar cita:", error);
    }
  };

  const deleteCita = async (id: string) => {
    try {
      const citaRef = doc(db, "citas", id); // Referencia al documento en Firebase
      await deleteDoc(citaRef); // Elimina el documento
      await getCitas(); // Actualiza la lista de citas
      return "Cita eliminada correctamente 😌";
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  };

  useEffect(() => {
    getCitas();
  }, []);

  return (
    <CitasContext.Provider value={{ citas, addCita, updateCita, getCitaById, deleteCita }}>
      {children}
    </CitasContext.Provider>
  );
};

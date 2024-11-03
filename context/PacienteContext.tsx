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
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Alert } from "react-native";
import { Paciente } from "@/types/types";

type PacientesContextType = {
  pacientes: Paciente[];
  pacientesArchivados: Paciente[];
  obtenerPacientes: () => Promise<void>;
  agregarPaciente: (data: Omit<Paciente, "id">) => Promise<void>;
  archivarPaciente: (pacienteId: string) => Promise<void>;
  obtenerPacientePorId: (id: string) => Promise<null | any>;
  actualizarPaciente: (id: string, data: any) => Promise<void>;
};

const PacientesContext = createContext<PacientesContextType | undefined>(
  undefined
);

export const usePacientes = () => {
  const context = useContext(PacientesContext);
  if (!context) {
    throw new Error(
      "usePacientes debe ser usado dentro de un PacientesProvider"
    );
  }
  return context;
};

export const PacientesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacientesArchivados, setPacientesArchivados] = useState<Paciente[]>(
    []
  );

  const obtenerPacientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pacientes"));
      const pacientesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Paciente[];
      setPacientes(pacientesData);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    }
  };

  const agregarPaciente = async (data: Omit<Paciente, "id">) => {
    try {
      await addDoc(collection(db, "pacientes"), data);
      await obtenerPacientes(); // Actualiza la lista
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  const obtenerPacientePorId = async (id: string) => {
    const docRef = doc(db, "pacientes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const actualizarPaciente = async (id: string, data: any) => {
    const docRef = doc(db, "pacientes", id);
    await obtenerPacientes(); // Actualiza la lista
    await updateDoc(docRef, data);
  };

  const archivarPaciente = async (pacienteId: string) => {
    try {
      const pacienteRef = doc(db, "pacientes", pacienteId);
      const pacienteSnapshot = await getDoc(pacienteRef);
      if (!pacienteSnapshot.exists()) {
        Alert.alert(
          `El documento ${pacienteSnapshot} o ${pacienteRef} no existe 💀💀`
        );
        return;
      }

      const pacienteData = pacienteSnapshot.data();

      const pacienteArchivadoRef = doc(db, "archivados", pacienteId);
      await setDoc(pacienteArchivadoRef, pacienteData);

      await deleteDoc(pacienteRef);
      await obtenerPacientes(); // Actualiza la lista
    } catch (error) {
      Alert.alert(`Error ☠️: ${error}`);
    }
  };

  const obtenerPacientesArchivados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "archivados"));
      const pacientesArchivadosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Paciente[];
      setPacientesArchivados(pacientesArchivadosData);
    } catch (error) {
      console.error("Error al obtener pacientes archivados:", error);
    }
  };

  useEffect(() => {
    obtenerPacientes();
    obtenerPacientesArchivados();
  }, []);

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        pacientesArchivados,
        agregarPaciente,
        archivarPaciente,
        obtenerPacientePorId,
        actualizarPaciente,
        obtenerPacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

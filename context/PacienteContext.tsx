import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import {
  collection,
  addDoc,
  onSnapshot,
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
  agregarPaciente: (data: Omit<Paciente, "id">) => Promise<void>;
  archivarPaciente: (pacienteId: string) => Promise<void>;
  devolverPacienteArchivado: (pacienteId: string) => Promise<void>;
  obtenerPacientePorId: (id: string) => Promise<null | any>;
  actualizarPaciente: (id: string, data: any) => Promise<void>;
  pacientesFiltrados: Paciente[];
  setFiltroBusqueda: Dispatch<SetStateAction<string>>;
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
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState<string>("");

  // Escucha en tiempo real para "pacientes"
  useEffect(() => {
    const pacientesRef = collection(db, "pacientes");
    const unsubscribe = onSnapshot(pacientesRef, (snapshot) => {
      const pacientesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Paciente[];
      setPacientes(pacientesData);
    });

    return () => unsubscribe(); // Limpieza
  }, []);

  // Escucha en tiempo real para "archivados"
  useEffect(() => {
    const archivadosRef = collection(db, "archivados");
    const unsubscribe = onSnapshot(archivadosRef, (snapshot) => {
      const archivadosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Paciente[];
      setPacientesArchivados(archivadosData);
    });

    return () => unsubscribe(); // Limpieza
  }, []);

  useEffect(() => {
    // Filtra pacientes según el filtro de búsqueda
    const filtrados = pacientes.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );
    setPacientesFiltrados(filtrados);
  }, [filtroBusqueda, pacientes]);

  const agregarPaciente = async (data: Omit<Paciente, "id">) => {
    try {
      await addDoc(collection(db, "pacientes"), data);
    } catch (error) {
      console.error("Error al agregar paciente:", error);
      Alert.alert(`Error al agregar paciente 😵: ${error}`);
    }
  };

  const obtenerPacientePorId = async (id: string) => {
    const docRef = doc(db, "pacientes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  const actualizarPaciente = async (id: string, data: any) => {
    const docRef = doc(db, "pacientes", id);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      Alert.alert(`Error al actualizar paciente 😟: ${error}`);
    }
  };

  const archivarPaciente = async (pacienteId: string) => {
    try {
      const pacienteRef = doc(db, "pacientes", pacienteId);
      const pacienteSnapshot = await getDoc(pacienteRef);
      if (!pacienteSnapshot.exists()) {
        Alert.alert(
          `El documento con ID "${pacienteId}" no existe en "pacientes" 💀`
        );
        return;
      }

      const pacienteData = pacienteSnapshot.data();

      const pacienteArchivadoRef = doc(db, "archivados", pacienteId);
      await setDoc(pacienteArchivadoRef, pacienteData);
      await deleteDoc(pacienteRef);
    } catch (error) {
      Alert.alert(`Error ☠️: ${error}`);
    }
  };

  const devolverPacienteArchivado = async (pacienteId: string) => {
    try {
      const pacienteArchivadoRef = doc(db, "archivados", pacienteId);
      const pacienteArchivadoSnapshot = await getDoc(pacienteArchivadoRef);
      if (!pacienteArchivadoSnapshot.exists()) {
        Alert.alert(
          `El documento con ID "${pacienteId}" no existe en "archivados" 😢`
        );
        return;
      }

      const pacienteData = pacienteArchivadoSnapshot.data();

      const pacienteRef = doc(db, "pacientes", pacienteId);
      await setDoc(pacienteRef, pacienteData);
      await deleteDoc(pacienteArchivadoRef);
    } catch (error) {
      Alert.alert(`Error 😰: ${error}`);
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        pacientesArchivados,
        agregarPaciente,
        archivarPaciente,
        obtenerPacientePorId,
        actualizarPaciente,
        devolverPacienteArchivado,
        pacientesFiltrados,
        setFiltroBusqueda,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

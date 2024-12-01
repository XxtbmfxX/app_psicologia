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
import { Paciente, PacientesContextType } from "@/types/types";

/**
 * Contexto para la gestión de pacientes.
 * Proporciona funciones para CRUD (Crear, Leer, Actualizar, Eliminar) pacientes,
 * gestionar pacientes archivados y realizar búsquedas filtradas.
 */

const PacientesContext = createContext<PacientesContextType | undefined>(
  undefined
);
/**
 * Hook personalizado para acceder al contexto de pacientes.
 *
 * @throws {Error} Si se usa fuera de un `PacientesProvider`.
 * @returns {PacientesContextType} El contexto con la lógica y datos de pacientes.
 */

export const usePacientes = () => {
  const context = useContext(PacientesContext);
  if (!context) {
    throw new Error(
      "usePacientes debe ser usado dentro de un PacientesProvider"
    );
  }
  return context;
};
/**
 * Proveedor del contexto de pacientes.
 *
 * Administra los estados, funciones y la lógica relacionada con los pacientes
 * y pacientes archivados. Proporciona acceso global a esta información y funcionalidad.
 *
 * @param {React.ReactNode} children - Componentes hijos que consumirán este contexto.
 */

export const PacientesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * @state {Paciente[]} pacientes - Lista de pacientes activos obtenidos de Firebase.
   * @state {Paciente[]} pacientesArchivados - Lista de pacientes archivados obtenidos de Firebase.
   * @state {Paciente[]} pacientesFiltrados - Lista de pacientes filtrados por el término de búsqueda.
   */

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacientesArchivados, setPacientesArchivados] = useState<Paciente[]>(
    []
  );
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  /**
   * @state {string} filtroBusqueda - Término de búsqueda para filtrar pacientes.
   * @state {Dispatch<SetStateAction<string>>} setFiltroBusqueda - Función para establecer el filtro de búsqueda.
   */

  const [filtroBusqueda, setFiltroBusqueda] = useState<string>("");

  /**
   * Escucha en tiempo real los cambios en la colección "pacientes" y actualiza el estado local.
   *
   * @useEffect
   */

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
  /**
   * Escucha en tiempo real los cambios en la colección "archivados" y actualiza el estado local.
   *
   * @useEffect
   */
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

  /**
   * Filtra la lista de pacientes según el término de búsqueda ingresado.
   *
   * @useEffect
   * @dependency [filtroBusqueda, pacientes]
   */

  useEffect(() => {
    // Filtra pacientes según el filtro de búsqueda
    const filtrados = pacientes.filter((paciente) =>
      paciente.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );
    setPacientesFiltrados(filtrados);
  }, [filtroBusqueda, pacientes]);
  /**
   * Agrega un nuevo paciente a la colección "pacientes" en Firebase.
   *
   * @async
   * @function agregarPaciente
   * @param {Omit<Paciente, "id">} data - Datos del paciente a agregar (sin ID).
   * @returns {Promise<void>}
   * @throws {Error} Muestra una alerta si ocurre un error al agregar el paciente.
   */

  const agregarPaciente = async (data: Omit<Paciente, "id">) => {
    try {
      await addDoc(collection(db, "pacientes"), data);
    } catch (error) {
      console.error("Error al agregar paciente:", error);
      Alert.alert(`Error al agregar paciente 😵: ${error}`);
    }
  };
  /**
   * Obtiene los datos de un paciente específico por su ID.
   *
   * @async
   * @function obtenerPacientePorId
   * @param {string} id - ID del paciente.
   * @returns {Promise<null | any>} Los datos del paciente o `null` si no existe.
   */

  const obtenerPacientePorId = async (id: string) => {
    const docRef = doc(db, "pacientes", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };
  /**
   * Actualiza los datos de un paciente específico.
   *
   * @async
   * @function actualizarPaciente
   * @param {string} id - ID del paciente a actualizar.
   * @param {any} data - Datos actualizados del paciente.
   * @returns {Promise<void>}
   * @throws {Error} Muestra una alerta si ocurre un error al actualizar.
   */

  const actualizarPaciente = async (id: string, data: any) => {
    const docRef = doc(db, "pacientes", id);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      Alert.alert(`Error al actualizar paciente 😟: ${error}`);
    }
  };
  /**
   * Mueve un paciente de la colección "pacientes" a la colección "archivados".
   *
   * @async
   * @function archivarPaciente
   * @param {string} pacienteId - ID del paciente a archivar.
   * @returns {Promise<void>}
   * @throws {Error} Muestra una alerta si ocurre un error durante el proceso.
   */

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
  /**
   * Mueve un paciente de la colección "archivados" a la colección "pacientes".
   *
   * @async
   * @function devolverPacienteArchivado
   * @param {string} pacienteId - ID del paciente a devolver.
   * @returns {Promise<void>}
   * @throws {Error} Muestra una alerta si ocurre un error durante el proceso.
   */

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

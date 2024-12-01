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

/**
 * Interfaz que define las funciones y datos disponibles en el contexto de citas.
 * @typedef {Object} CitasContextType
 * @property {Cita[]} citas - Lista de citas disponibles.
 * @property {(data: Omit<Cita, "id">) => Promise<string | undefined>} addCita - Agrega una nueva cita.
 * @property {(cita: Cita) => Promise<string | undefined>} updateCita - Actualiza una cita existente.
 * @property {(citaId: string) => Promise<Cita | null>} getCitaById - Obtiene una cita por su ID.
 * @property {(id: string) => Promise<string | undefined>} deleteCita - Elimina una cita por su ID.
 * @property {(citaId: string) => Promise<void>} moverCita - Mueve una cita a otra colección (citasHechas).
 */

type CitasContextType = {
  citas: Cita[];
  addCita: (data: Omit<Cita, "id">) => Promise<string | undefined>;
  updateCita: (cita: Cita) => Promise<string | undefined>;
  getCitaById: (citaId: string) => Promise<Cita | null>;
  deleteCita: (id: string) => Promise<string | undefined>;
  moverCita: (citaId: string) => Promise<void>;
};

const CitasContext = createContext<CitasContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de citas.
 *
 * Este hook debe utilizarse dentro de un componente que esté envuelto por `CitasProvider`.
 *
 * @throws {Error} Si el hook se usa fuera de un `CitasProvider`.
 * @returns {CitasContextType} El contexto de citas.
 */

export const useCitas = () => {
  const context = useContext(CitasContext);
  if (!context) {
    throw new Error("useCitas debe ser usado dentro de un CitasProvider");
  }
  return context;
};

/**
 * Proveedor del contexto de citas.
 *
 * Este componente gestiona el estado y las operaciones relacionadas con las citas, como agregar,
 * eliminar, actualizar, obtener y mover citas.
 *
 * @param {React.ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 */

export const CitasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [citas, setCitas] = useState<Cita[]>([]);

  /**
   * Escucha en tiempo real las citas desde Firebase.
   *
   * Este efecto suscribe al usuario a cambios en la colección "citas"
   * y actualiza automáticamente el estado con los datos más recientes.
   */

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

  /**
   * Agrega una nueva cita al sistema.
   *
   * @async
   * @function addCita
   * @param {Omit<Cita, "id">} data - Datos de la cita, excluyendo el ID (se generará automáticamente).
   * @returns {Promise<string | undefined>} Mensaje de confirmación o undefined en caso de error.
   * @throws {Error} Lanza un error si no se puede agregar la cita.
   */

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

  /**
   * Obtiene una cita específica por su ID.
   *
   * @async
   * @function getCitaById
   * @param {string} citaId - ID de la cita a obtener.
   * @returns {Promise<Cita | null>} La cita encontrada, o null si no existe.
   * @throws {Error} Lanza un error si no se puede obtener la cita.
   */

  const getCitaById = async (citaId: string) => {
    try {
      const citaDoc = await getDoc(doc(db, "citas", citaId));
      if (citaDoc.exists()) {
        return { id: citaDoc.id, ...citaDoc.data() } as Cita;
      } else {
        Alert.alert(
          "Error",
          "No se encontró la cita especificada al buscarla por id. 😥"
        );
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la cita:", error);
      return null;
    }
  };

  /**
   * Actualiza los datos de una cita específica.
   *
   * @async
   * @function updateCita
   * @param {Cita} cita - Objeto de la cita con los datos actualizados.
   * @returns {Promise<string | undefined>} Mensaje de confirmación o undefined en caso de error.
   * @throws {Error} Lanza un error si no se puede actualizar la cita.
   */

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

  /**
   * Elimina una cita por su ID.
   *
   * @async
   * @function deleteCita
   * @param {string} id - ID de la cita a eliminar.
   * @returns {Promise<string | undefined>} Mensaje de confirmación o undefined en caso de error.
   * @throws {Error} Lanza un error si no se puede eliminar la cita.
   */

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

  /**
   * Mueve una cita de la colección "citas" a "citasHechas".
   *
   * Este método copia la cita en la colección "citasHechas" y luego elimina la original.
   *
   * @async
   * @function moverCita
   * @param {string} citaId - ID de la cita a mover.
   * @throws {Error} Lanza un error si no se puede mover la cita.
   */

  const moverCita = async (citaId: string) => {
    try {
      const citaRef = doc(db, "citas", citaId);
      const citaSnapshot = await getDoc(citaRef);

      if (!citaSnapshot.exists()) {
        Alert.alert(
          "Error",
          "No se encontró la cita especificada al mover la cita . 😥"
        );
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

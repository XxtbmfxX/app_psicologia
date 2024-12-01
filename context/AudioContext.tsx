/**
 * Contexto que maneja el almacenamiento de los audios en AsyncStorage.
 *
 * Este contexto permite cargar, agregar y eliminar archivos de audio almacenados en el dispositivo. 
 * Además, gestiona el almacenamiento persistente utilizando AsyncStorage y la eliminación física de archivos con FileSystem de Expo.
 */

import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

/**
 * Representa un archivo de audio.
 * @typedef {Object} AudioFile
 * @property {string} uri - URI del archivo de audio en el dispositivo.
 * @property {string} name - Nombre del archivo, en el formato "nombrePaciente_dd_mm_yyyy".
 */
export type AudioFile = {
  uri: string;
  name: string;
};

/**
 * Interfaz para el contexto de audio.
 * @typedef {Object} AudioContextType
 * @property {AudioFile[]} audioFiles - Lista de archivos de audio almacenados.
 * @property {(name: string, uri: string) => Promise<void>} addAudio - Función para agregar un nuevo archivo de audio.
 * @property {(uri: string) => Promise<void>} deleteAudio - Función para eliminar un archivo de audio.
 * @property {() => Promise<void>} loadAudioFiles - Función para cargar los archivos de audio desde AsyncStorage.
 */
type AudioContextType = {
  audioFiles: AudioFile[];
  addAudio: (name: string, uri: string) => Promise<void>;
  deleteAudio: (uri: string) => Promise<void>;
  loadAudioFiles: () => Promise<void>;
};

/**
 * Contexto para manejar los archivos de audio.
 */
const AudioContext = createContext<AudioContextType | undefined>(undefined);

/**
 * Proveedor del contexto de audio.
 * 
 * Este componente se encarga de inicializar y proporcionar las funciones y datos relacionados
 * con el manejo de archivos de audio a sus hijos.
 * 
 * @param {React.ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 */
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  /**
   * Carga los archivos de audio almacenados en AsyncStorage.
   * 
   * @async
   * @returns {Promise<void>} Una promesa que se resuelve cuando los archivos se han cargado.
   */
  const loadAudioFiles = async () => {
    try {
      const savedFiles = await AsyncStorage.getItem("audioFiles");
      if (savedFiles) setAudioFiles(JSON.parse(savedFiles));
    } catch (error) {
      console.error("Error al cargar los archivos de audio:", error);
    }
  };

  /**
   * Agrega un nuevo archivo de audio al almacenamiento.
   * 
   * @async
   * @param {string} name - Nombre del archivo de audio.
   * @param {string} uri - URI del archivo de audio.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el archivo se ha agregado.
   */
  const addAudio = async (name: string, uri: string) => {
    try {
      const newAudio = { name, uri };
      const updatedFiles = [...audioFiles, newAudio];
      setAudioFiles(updatedFiles);

      await AsyncStorage.setItem("audioFiles", JSON.stringify(updatedFiles));
    } catch (error) {
      console.error("Error al agregar audio:", error);
    }
  };

  /**
   * Elimina un archivo de audio del almacenamiento y del sistema de archivos.
   * 
   * @async
   * @param {string} uri - URI del archivo de audio a eliminar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el archivo se ha eliminado.
   */
  const deleteAudio = async (uri: string) => {
    try {
      const updatedFiles = audioFiles.filter((file) => file.uri !== uri);
      setAudioFiles(updatedFiles);

      await FileSystem.deleteAsync(uri);
      await AsyncStorage.setItem("audioFiles", JSON.stringify(updatedFiles));
    } catch (error) {
      console.error("Error al eliminar audio:", error);
    }
  };

  useEffect(() => {
    loadAudioFiles();
  }, []);

  return (
    <AudioContext.Provider value={{ audioFiles, addAudio, deleteAudio, loadAudioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de audio.
 * 
 * Este hook debe ser utilizado dentro de un componente que esté dentro de un `AudioProvider`.
 * 
 * @throws {Error} Si el hook se usa fuera de un `AudioProvider`.
 * @returns {AudioContextType} Los valores y funciones del contexto de audio.
 */
export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudioContext debe usarse dentro de un AudioProvider");
  return context;
};

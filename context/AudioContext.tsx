import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export type AudioFile = {
  uri: string;
  name: string; // "nombrePaciente_dd_mm_yyyy"
};

type AudioContextType = {
  audioFiles: AudioFile[];
  addAudio: (name: string, uri: string) => Promise<void>;
  deleteAudio: (uri: string) => Promise<void>;
  loadAudioFiles: () => Promise<void>;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  const loadAudioFiles = async () => {
    try {
      const savedFiles = await AsyncStorage.getItem("audioFiles");
      if (savedFiles) setAudioFiles(JSON.parse(savedFiles));
    } catch (error) {
      console.error("Error al cargar los archivos de audio:", error);
    }
  };

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

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudioContext debe usarse dentro de un AudioProvider");
  return context;
};

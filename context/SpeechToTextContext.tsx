import React, { createContext, useContext, useEffect, useState } from "react";
import { Transcripcion } from "@/types/types";
import axios from "axios";
import * as FileSystem from "expo-file-system";

type SpeechToTextContextType = {
  transcripciones: Transcripcion[];
  obtenerTranscripcion: (id: string) => Transcripcion | undefined;
  eliminarTranscripcion: (id: string) => Promise<void>;
  subirAudio: (audioFile: string) => Promise<void>;
  cargarTranscripciones: () => Promise<void>;
  obtenerTranscripcionAPI: (id: string) => Promise<Transcripcion | undefined>;
  cargando: boolean;
  error: string | null;
};

const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "";
const API_BASE_URL = "https://api.assemblyai.com/v2";

const SpeechToTextContext = createContext<SpeechToTextContextType | undefined>(
  undefined
);

export const useSpeechToText = () => {
  const context = useContext(SpeechToTextContext);
  if (!context) {
    throw new Error(
      "useSpeechToText debe usarse dentro de un SpeechToTextProvider."
    );
  }
  return context;
};

export const SpeechToTextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transcripciones, setTranscripciones] = useState<Transcripcion[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar todas las transcripciones desde la API
  const cargarTranscripciones = async () => {
    const response = await axios.get(`${API_BASE_URL}/transcript`, {
      headers: { Authorization: API_KEY },
    });
    setTranscripciones(response.data.transcripts); // Asumiendo que el array de transcripciones está en `response.data`
  };

  // Obtener una transcripción por ID desde la API
  const obtenerTranscripcionAPI = async (
    id: string
  ): Promise<Transcripcion | undefined> => {
    const response = await axios.get(`${API_BASE_URL}/transcript/${id}`, {
      headers: { Authorization: API_KEY },
    });
    return response.data;
  };

  const agregarTranscripcion = (transcripcion: Transcripcion) => {
    setTranscripciones((prev) => [...prev, transcripcion]);
  };

  const actualizarEstadoTranscripcion = (id: string, estado: string) => {
    setTranscripciones((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: estado } : t))
    );
  };

  const verificarEstado = async (id: string) => {
    try {
      const estadoResponse = await axios.get(
        `${API_BASE_URL}/transcript/${id}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const { status, text } = estadoResponse.data;

      actualizarEstadoTranscripcion(id, status);

      // Si la transcripción está completa, agrega el texto transcrito
      if (status === "completed") {
        setTranscripciones((prev) =>
          prev.map((t) => (t.id === id ? { ...t, text } : t))
        );
      }

      if (status !== "completed" && status !== "failed") {
        setTimeout(() => verificarEstado(id), 5000); // Reintentar después de 5 segundos
      }
    } catch (error) {
      console.error("Error al verificar el estado:", error);
    }
  };

  // Subir un archivo de audio para transcribir
  const subirAudio = async (audioFileUri: string) => {
    try {
      const uploadResponse = await FileSystem.uploadAsync(
        `${API_BASE_URL}/upload`,
        audioFileUri, // Envía directamente el archivo binario desde su URI
        {
          httpMethod: "POST",
          headers: {
            Authorization: API_KEY,
          },
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        }
      );

      const audioUrl = JSON.parse(uploadResponse.body).upload_url;

      // Solicitar la transcripción
      const transcriptionResponse = await axios.post(
        `${API_BASE_URL}/transcript`,
        { audio_url: audioUrl },
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const nuevaTranscripcion = {
        id: transcriptionResponse.data.id,
        resource_url: audioUrl,
        status: "queued",
      };

      agregarTranscripcion(nuevaTranscripcion);

      // Inicia el proceso de verificación de estado
      verificarEstado(nuevaTranscripcion.id);
    } catch (error) {
      console.error("Error al subir archivo o solicitar transcripción:", error);
      setError("Error al procesar el archivo de audio.");
    }
  };

  // Eliminar una transcripción por ID desde la API
  const eliminarTranscripcion = async (id: string) => {
    console.log(id);
    const res = await axios.delete(`${API_BASE_URL}/transcript/${id}`, {
      headers: { Authorization: API_KEY },
    });
    console.log(res.data.status);

    setTranscripciones((prev) => prev.filter((t) => t.id !== id));
  };

  // Obtener una transcripción del estado local
  const obtenerTranscripcion = (id: string): Transcripcion | undefined => {
    return transcripciones.find((t) => t.id === id);
  };

  useEffect(() => {
    cargarTranscripciones();
  }, []);

  return (
    <SpeechToTextContext.Provider
      value={{
        transcripciones,
        cargando,
        error,
        obtenerTranscripcion,
        eliminarTranscripcion,
        subirAudio,
        cargarTranscripciones,
        obtenerTranscripcionAPI,
      }}
    >
      {children}
    </SpeechToTextContext.Provider>
  );
};

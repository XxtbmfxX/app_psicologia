/**
 * | Context que maneja el la conección a la API de AssemblyAI
 *
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { Transcripcion } from "@/types/types";
import axios from "axios";
import * as FileSystem from "expo-file-system";

type SpeechToTextContextType = {
  transcripciones: Transcripcion[];
  eliminarTranscripcion: (id: string) => Promise<void>;
  subirAudio: (audioFile: string) => Promise<void>;
  cargarTranscripciones: () => Promise<void>;
  obtenerTranscripcionAPI: (id: string) => Promise<string | null>;

  cargando: boolean;
  error: string | null;
};

const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "";
const API_BASE_URL = "https://api.assemblyai.com/v2";

const SpeechToTextContext = createContext<SpeechToTextContextType | undefined>(
  undefined
);

/**
 * Hook para retornar el contexto de Speech To Text
 *
 * @returns SpeechToTextContextType()
 */
export const useSpeechToText = () => {
  const context = useContext(SpeechToTextContext);
  if (!context) {
    throw new Error(
      "useSpeechToText debe usarse dentro de un SpeechToTextProvider."
    );
  }
  return context;
};

/**
 * El provider de Speech To Text
 * Contiene los estados y funciones necesarias para manejar la petición a la API
 * de AssemblyAI
 * - Debe abarcar el layout que contenga la aplicación
 * @param children  React.ReactNode
 * @return Void
 */

export const SpeechToTextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transcripciones, setTranscripciones] = useState<Transcripcion[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar todas las transcripciones desde la API
   *  */
  const cargarTranscripciones = async () => {
    console.log("cargando...");

    const response = await axios.get(`${API_BASE_URL}/transcript`, {
      headers: { Authorization: API_KEY },
    });
    setTranscripciones(response.data.transcripts); // Asumiendo que el array de transcripciones está en `response.data`
    console.log("cargado");
  };

  /**
   * Carga las transcripciones desde la API
   * @param id: string
   * @returns Promise<string | null>
   */
  const obtenerTranscripcionAPI = async (
    id: string
  ): Promise<string | null> => {
    try {
      setCargando(true); // Muestra un indicador de carga
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/transcript/${id}`, {
        headers: { Authorization: API_KEY },
      });

      if (response.data.status === "completed") {
        return response.data.text;
      } else {
        setError("La transcripción aún no está lista o falló.");
        return null;
      }
    } catch (error: any) {
      setError("No se pudo obtener la transcripción. Intenta más tarde.");
      console.error("Error al obtener transcripción:", error.message);
      return null;
    } finally {
      setCargando(false); // Oculta el indicador de carga
    }
  };

  /**
   * Agrega la transcripción al estado local
   * @param transcripcion: Transcripcion
   */
  const agregarTranscripcion = (transcripcion: Transcripcion) => {
    setTranscripciones((prev) => [...prev, transcripcion]);
  };

  /**
   * Se encarga de actualizar el estado de la transcripción
   * - Processing
   * - Queued
   * - Copleted
   *
   * @param id: string
   * @param estado: string
   */
  const actualizarEstadoTranscripcion = (id: string, estado: string) => {
    setTranscripciones((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: estado } : t))
    );
  };

  const verificarEstado = async (id: string) => {
    const MAX_REINTENTOS = 10;
    let intentos = 0;

    const interval = setInterval(async () => {
      try {
        const estadoResponse = await axios.get(
          `${API_BASE_URL}/transcript/${id}`,
          { headers: { Authorization: API_KEY } }
        );

        const { status, text } = estadoResponse.data;

        actualizarEstadoTranscripcion(id, status);

        if (status === "completed") {
          setTranscripciones((prev) =>
            prev.map((t) => (t.id === id ? { ...t, text } : t))
          );
          clearInterval(interval);
        } else if (status === "failed" || intentos >= MAX_REINTENTOS) {
          setError("No se pudo completar la transcripción.");
          clearInterval(interval);
        }

        intentos++;
      } catch (error) {
        console.error("Error al verificar estado:", error);
        clearInterval(interval);
      }
    }, 5000); // Intervalo de 5 segundos
  };

  /**
   * Permite validar que el audio sea del formato correcto
   * - Formatos validados "mp3", "wav", "m4a".
   * @param audioFileUri: string
   * @returns: boolean
   */
  const validarAudio = (audioFileUri: string): boolean => {
    const extension = audioFileUri.split(".").pop()?.toLowerCase();
    const formatosPermitidos = ["mp3", "wav", "m4a"];

    if (!formatosPermitidos.includes(extension || "")) {
      setError("El formato del archivo no es válido. Usa MP3, WAV o M4A.");
      return false;
    }
    return true;
  };

  /**
   * Subir un archivo de audio a la API para transcribir
   *  */
  const subirAudio = async (audioFileUri: string) => {
    if (!validarAudio(audioFileUri)) return;
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
        {
          audio_url: audioUrl,
          language_code: "es",
          punctuate: true,
          format_text: true,
          boost_param: "high",
          speaker_labels: true,
        },
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

  /**
   * Eliminar una transcripción por ID desde la API
   * @param id: string
   * @returns Promise<void>
   * */
  const eliminarTranscripcion = async (id: string) => {
    console.log(id);
    const res = await axios.delete(`${API_BASE_URL}/transcript/${id}`, {
      headers: { Authorization: API_KEY },
    });
    console.log(res.data.status);

    setTranscripciones((prev) => prev.filter((t) => t.id !== id));
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

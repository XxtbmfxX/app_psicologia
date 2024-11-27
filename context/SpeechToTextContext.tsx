import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Alert } from "react-native";
import { Transcripcion } from "@/types/types";

// type AudioFile = { uri: string; name: string; transcription?: string };

type SpeechToTextContextType = {
  transcripciones: Transcripcion[];

  transcribeAudio: (titulo:string, uri: string) => Promise<string | undefined>;
};

const SpeechToTextContext = createContext<SpeechToTextContextType | undefined>(
  undefined
);

export const useSpeechToText = () => {
  const context = useContext(SpeechToTextContext);
  if (!context) {
    throw new Error(
      "useSpeechToText debe ser usado dentro de un SpeechToTextProvider"
    );
  }
  return context;
};

export const SpeechToTextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transcripciones, setTranscripciones] = useState<any[]>([]);

  // Escucha en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transcripciones"), (snapshot) => {
      const audios = snapshot.docs.map((doc) => ({
        uri: doc.id,
        ...doc.data(),
      })) as any[];
      setTranscripciones(audios);
    });
    return () => unsubscribe();
  }, []);

 
  // Transcribir audio
  const transcribeAudio = async (titulo:string, uri: string) => {

    console.log("En procesos （＞人＜；）")
    return `${titulo}: ${uri}` 
    // try {
    //   const response = await fetch("https://api.speech-to-text.com/v1/recognize", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer TU_CLAVE_API",
    //     },
    //     body: JSON.stringify({ audioUri: uri }),
    //   });

    //   const result = await response.json();
    //   if (!result.text) throw new Error("Error en la transcripción.");
    //   Alert.alert("Transcripción exitosa", result.text);

    //   // Guardar la transcripción en Firebase
    //   await addDoc(collection(db, "transcripciones"), {
    //     uri,
    //     transcription: result.text,
    //   });

    //   return result.text;
    // } catch (error) {
    //   console.error("Error al transcribir audio:", error);
    //   Alert.alert("Error", "No se pudo transcribir el audio.");
    // }
  };

  return (
    <SpeechToTextContext.Provider
      value={{ transcripciones, transcribeAudio }}
    >
      {children}
    </SpeechToTextContext.Provider>
  );
};

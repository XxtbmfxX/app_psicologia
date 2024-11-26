import React from "react";
import { FlatList, Text, View } from "react-native";
import FilaTranscripciones from "./FilaTranscripciones";
import { useSpeechToText } from "@/context/SpeechToTextContext";

const ListaTranscripciones = ({
  nombrePaciente,
}: {
  nombrePaciente?: string;
}) => {
  const { transcripciones } = useSpeechToText();

  // // Filtrar los audios que empiezan con el nombreAudio
  let filteredTranscripcion = [{ title: "prueba", contenido: "(⌐■_■)" }];

  if (nombrePaciente) {
    filteredTranscripcion = transcripciones.filter((transcripcion) => {
      return transcripcion.titulo?.includes(nombrePaciente);
    });
  }

  // Agregar para cuando no hay transcripciones

  return (
    <FlatList
      data={nombrePaciente ? filteredTranscripcion : transcripciones}
      keyExtractor={(item) => item.titulo}
      renderItem={({ item }) => <FilaTranscripciones transcripcion={item} />}
      className="px-5 mb-20"
    />
  );
};

export default ListaTranscripciones;

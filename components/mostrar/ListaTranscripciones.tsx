import React from "react";
import { FlatList } from "react-native";
import FilaTranscripciones from "./FilaTranscripciones";
import { useSpeechToText } from "@/context/SpeechToTextContext";

const ListaTranscripciones = ({
  nombrePaciente
}: {
  nombrePaciente?: string;
}) => {
  const { transcripciones } = useSpeechToText();

  return (
    <FlatList
      data={transcripciones}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FilaTranscripciones transcripcion={item} />}
      className="px-5 mb-20"
    />
  );
};

export default ListaTranscripciones;

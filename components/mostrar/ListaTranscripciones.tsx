import React, { useState } from "react";
import { FlatList } from "react-native";
import FilaTranscripciones from "./FilaTranscripciones";
import { useSpeechToText } from "@/context/SpeechToTextContext";

const ListaTranscripciones = ({
  nombrePaciente,
}: {
  nombrePaciente?: string;
}) => {
  const { transcripciones, cargarTranscripciones } = useSpeechToText();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    cargarTranscripciones();
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      data={transcripciones}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FilaTranscripciones transcripcion={item} />}
      className="px-5 mb-20"
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default ListaTranscripciones;

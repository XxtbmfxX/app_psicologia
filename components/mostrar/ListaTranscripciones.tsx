import React, { useState } from "react";
import { FlatList } from "react-native";
import FilaTranscripciones from "./FilaTranscripciones";
import { useSpeechToText } from "@/context/SpeechToTextContext";

/**
 * # ListaTranscripciones
 * ## Descripción:
 * Este componente lista las transcripciones disponibles para un paciente, permitiendo actualizar la lista mediante un "pull-to-refresh". Si no hay transcripciones, no muestra nada en particular. Si hay transcripciones, se renderizan con un componente FilaTranscripciones.
 *
 * # Lógica:
 *
 * - Utiliza el hook useSpeechToText para acceder a las transcripciones desde el contexto SpeechToTextContext.
 * - Permite la actualización de las transcripciones mediante un "pull-to-refresh" usando el FlatList y la función onRefresh, que activa la recarga de las transcripciones al llamar a cargarTranscripciones.
 * - Cada transcripción se muestra con un componente FilaTranscripciones, que recibe la transcripción como propiedad.
 *
 * ## Propiedades:
 *
 * - nombrePaciente: Este parámetro es opcional y permite filtrar las transcripciones por nombre del paciente, aunque no se está utilizando en el código de la versión actual.
 *
 */
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

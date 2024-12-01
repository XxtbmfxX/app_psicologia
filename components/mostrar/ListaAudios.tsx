import React from "react";
import { useAudioContext } from "@/context/AudioContext";
import FilaAudio from "./FilaAudio";
import { FlatList, Text, View } from "react-native";

/**
 * # ListaAudios
 * ## Descripción:
 * Este componente muestra una lista de audios filtrados por el nombre de un paciente. Utiliza el contexto de AudioContext para obtener la lista de audios disponibles y filtra aquellos que corresponden al paciente especificado.
 *
 * ## Propiedades:
 *
 * - nombrePaciente: Nombre del paciente a filtrar los audios (opcional, por defecto es "pedro").
 *
 * ## Lógica:
 *
 * - Usa el hook useAudioContext para acceder a la lista de audios (audioFiles).
 * - Filtra los audios que comienzan con el nombre del paciente (por ejemplo, "pedro_").
 * - Si no hay audios filtrados, muestra un mensaje indicando que no hay audios disponibles para el paciente.
 * - Si hay audios, utiliza un FlatList para renderizar una lista de componentes FilaAudio.
 */
const ListaAudios = ({
  nombrePaciente = "pedro",
}: {
  nombrePaciente?: string;
}) => {
  const { audioFiles } = useAudioContext();

  // Filtrar los audios que empiezan con el nombrePaciente
  const filteredAudioFiles = audioFiles.filter((audio) =>
    audio.name.startsWith(`${nombrePaciente}_`)
  );

  if (filteredAudioFiles.length === 0) {
    return (
      <View className="flex-1 justify-center my-5">
        <Text className="text-xl text-center font-semibold ">
          No hay audios para {nombrePaciente}.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={filteredAudioFiles}
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => <FilaAudio audio={item} />}
      className="p-5"
    />
  );
};

export default ListaAudios;

import React from "react";
import { useAudioContext } from "@/context/AudioContext";
import FilaAudio from "./FilaAudio";
import { FlatList, Text, View } from "react-native";

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

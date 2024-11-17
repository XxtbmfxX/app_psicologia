import React from "react";
import { useAudioContext } from "@/context/AudioContext";
import FilaAudio from "./FilaAudio";
import { FlatList } from "react-native";

const ListaAudios = ({ nombrePaciente = "pedro" }: { nombrePaciente?: string }) => {
  const { audioFiles } = useAudioContext();

  return (
    <FlatList
      data={audioFiles}
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => <FilaAudio audio={item} />}
      className="p-5"
    />
  );
};

export default ListaAudios;

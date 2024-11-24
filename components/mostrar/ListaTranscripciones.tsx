import React from "react";
import { useAudioContext } from "@/context/AudioContext";
import FilaAudio from "./FilaAudio";
import { FlatList, Text, View } from "react-native";
import FilaTranscripciones from "./FilaTranscripciones";
import { useSpeechToText } from "@/context/SpeechToTextContext";

const ListaTranscripciones = ({ nombreAudio }: { nombreAudio?: string }) => {
  const { transcripciones } = useSpeechToText();

  // Filtrar los audios que empiezan con el nombreAudio
//   const filteredAudioFiles = transcripciones.filter((trasncripcion) =>
//     trasncripcion.name.startsWith(`${nombreAudio}_`)
//   );

  //   if (filteredAudioFiles.length === 0) {
  //     return (
  //       <View className="flex-1 justify-center my-5">
  //         <Text className="text-xl text-center font-semibold ">
  //           No hay audios para {nombreAudio}.
  //         </Text>
  //       </View>
  //     );
  //   }


  if (transcripciones.length == 0) {
    return <Text>No hay transcripciones (#｀-_ゝ-)</Text>
  }

  return (
    <FlatList
      data={transcripciones}
      keyExtractor={(item) => item.uri}
      renderItem={({ item }) => <FilaTranscripciones transcripcion={item} />}
      className="p-5"
    />
  );
};

export default ListaTranscripciones;

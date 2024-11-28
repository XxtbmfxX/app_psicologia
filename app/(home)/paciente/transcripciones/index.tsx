import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaTranscripciones from "@/components/mostrar/ListaTranscripciones";
import ProbarAudio from "@/components/audios/ProbarAudio";

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView>
      <Text className="text-xl text-center my-5">Transcripciones</Text>
      <ListaTranscripciones />
      {/* <ProbarAudio/> */}
    </SafeAreaView>
  );
};

export default index;
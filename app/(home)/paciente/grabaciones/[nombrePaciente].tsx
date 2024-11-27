import GrabarAudio from "@/components/audios/GrabarAudio";
import ListaAudios from "@/components/mostrar/ListaAudios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const grabacionesPaciente = () => {
  const { nombrePaciente } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex justify-center">
      <Text className="text-xl text-center my-5">
        Grabaciones de {nombrePaciente}
      </Text>
      <GrabarAudio nombrePaciente={nombrePaciente} />
      <ListaAudios nombrePaciente={nombrePaciente} />
    </SafeAreaView>
  );
};

export default grabacionesPaciente;

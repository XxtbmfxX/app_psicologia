import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ListaTranscripciones from "@/components/mostrar/ListaTranscripciones";
import { SafeAreaView } from "react-native-safe-area-context";

const nombrePaciente = () => {
  const { nombrePaciente } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text className="text-xl text-center my-5">
        Transcripciones de
        <Text className="font-semibold"> {nombrePaciente}</Text>
      </Text>
      <ListaTranscripciones nombrePaciente={nombrePaciente} />
    </SafeAreaView>
  );
};

export default nombrePaciente;

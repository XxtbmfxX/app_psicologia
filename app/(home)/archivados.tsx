import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaPacientes from "@/components/mostrar/ListaPacientes";
import ListaArchivados from "@/components/mostrar/ListaArchivados";

const archivados = () => {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <Text className="text-2xl text-center my-5 ">Pacientes Archivados</Text>
      <ListaArchivados />
    </SafeAreaView>
  );
};

export default archivados;

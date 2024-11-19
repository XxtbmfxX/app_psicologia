import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormIngresoPacientes from "@/components/Formulario/FormIngresoPacientes";

const aniadir = () => {
  return (
    
    <SafeAreaView className="flex-1 justify-center p-5 bg-blue-400 ">
      <Text className="text-2xl text-center my-5 ">Añadir Paciente</Text>
      <FormIngresoPacientes id={null} />
    </SafeAreaView>
  );
};

export default aniadir;

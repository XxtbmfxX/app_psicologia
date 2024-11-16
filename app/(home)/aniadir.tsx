import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormIngresoPacientes from "@/components/Formulario/FormIngresoPacientes";

const aniadir = () => {
  return (
    <SafeAreaView className="flex-1 justify-center p-5 bg-blue-400 ">
      <FormIngresoPacientes id={null} />
    </SafeAreaView>
  );
};

export default aniadir;

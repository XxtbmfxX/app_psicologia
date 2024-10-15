import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormRecuperarContrasenia from "@/components/Formulario/FormRecuperarContrasenia";

const recuperarContrasenia = () => {
  return (
    <SafeAreaView className="flex-1 justify-center bg-white p-4">
      <FormRecuperarContrasenia />
    </SafeAreaView>
  );
};

export default recuperarContrasenia;

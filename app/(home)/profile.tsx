import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PerfilUsuario from "@/components/mostrar/PerfilUsuario";
/**
 * Componente que contiene el perfil de usuario
 * @returns React.JSX.Element
 */
const profile = () => {
  return (
    <SafeAreaView className="flex-1 p-5">
      <PerfilUsuario />
    </SafeAreaView>
  );
};

export default profile;

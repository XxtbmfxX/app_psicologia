import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PerfilUsuario from "@/components/mostrar/PerfilUsuario";

const profile = () => {
  return (
    <SafeAreaView className="flex-1 p-5">
      <PerfilUsuario />
    </SafeAreaView>
  );
};

export default profile;

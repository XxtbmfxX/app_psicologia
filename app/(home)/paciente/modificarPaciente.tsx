import React from "react";
import FormModificarPaciente from "@/components/Formulario/FormModificarPaciente";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

type RouteParams = {
  ModificarPaciente: { pacienteId: string };
};

const modificarPaciente = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, "ModificarPaciente">>();
  const { pacienteId } = route.params;

  return (
    <SafeAreaView className="flex-1 justify-center p-5 bg-blue-400 ">
      <FormModificarPaciente id={pacienteId} />
    </SafeAreaView>
  );
};

export default modificarPaciente;

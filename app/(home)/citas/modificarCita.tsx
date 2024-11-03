import { View, Text } from "react-native";
import React from "react";
import { Cita } from "@/types/types";
import FormIngresoCita from "@/components/Formulario/FormIngresoCita";

type Props = {
  cita: Cita;
};

const modificarCita = ({ cita }: Props) => {
  return (
    <View>
      <FormIngresoCita citaExistente={cita} />
    </View>
  );
};

export default modificarCita;

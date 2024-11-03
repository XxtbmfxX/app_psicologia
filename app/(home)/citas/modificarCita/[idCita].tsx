import { View, Text } from "react-native";
import React from "react";
import { Cita } from "@/types/types";
import FormIngresoCita from "@/components/Formulario/FormIngresoCita";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

type Props = {};

const modificarCita = (props: Props) => {
  const {idCita} = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <FormIngresoCita citaId={idCita} />
    </SafeAreaView>
  );
};

export default modificarCita;

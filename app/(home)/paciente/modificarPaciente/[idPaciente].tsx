import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormIngresoPaciente from "@/components/Formulario/FormIngresoPacientes";

type Props = {};

const idPaciente = (props: Props) => {
  const { idPaciente } = useLocalSearchParams();
  return <FormIngresoPaciente id={idPaciente} />;
};

export default idPaciente;

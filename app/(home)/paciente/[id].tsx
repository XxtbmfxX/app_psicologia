// [id].tsx
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import FichaPaciente from "@/components/mostrar/FichaPaciente";

const PacienteDetails = () => {
  const {  pacientes } = usePacientes();
  const { id } = useLocalSearchParams();
  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) return <Text>Paciente no encontrado</Text>;

  return (
    <View className="p-4">
      <FichaPaciente paciente={paciente} />
    </View>
  );
};

export default PacienteDetails;

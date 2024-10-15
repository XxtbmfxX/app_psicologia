// [id].tsx
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import FichaPaciente from "@/components/mostrar/FichaPaciente";

const PatientDetails = () => {
  const {  pacientes } = usePacientes();
  const { id } = useLocalSearchParams();
  const patient = pacientes.find((p) => p.id === id);

  if (!patient) return <Text>Paciente no encontrado</Text>;

  return (
    <View className="p-4">
      <FichaPaciente patient={patient} />
    </View>
  );
};

export default PatientDetails;

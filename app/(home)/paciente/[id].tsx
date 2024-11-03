// [id].tsx
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import FichaPaciente from "@/components/mostrar/FichaPaciente";
import { SafeAreaView } from "react-native-safe-area-context";

const PacienteDetails = () => {
  const { pacientes } = usePacientes();
  const { id } = useLocalSearchParams();
  const paciente = pacientes.find((p) => p.id === id);

  if (!paciente) {
    return (
      <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
        <Text>Paciente no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="p-4">
      <FichaPaciente paciente={paciente} />
    </View>
  );
};

export default PacienteDetails;

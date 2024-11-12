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
      <SafeAreaView className="flex-1 items-center justify-center bg-blue-100 p-5">
        <Text className="text-xl font-semibold text-gray-700">
          Paciente no encontrado (#｀-_ゝ-)
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <FichaPaciente paciente={paciente} />
    </View>
  );
};

export default PacienteDetails;

import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import FichaPaciente from "@/components/mostrar/FichaPaciente";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Componente `PacienteDetails`.
 *
 * Función principal:
 * - Muestra los detalles de un paciente utilizando el ID obtenido desde las rutas.
 * - Si no se encuentra el paciente, muestra un mensaje indicando el error.
 *
 * Dependencias externas:
 * - `useLocalSearchParams` de `expo-router` para obtener los parámetros de la URL.
 * - `usePacientes` de `PacienteContext` para acceder a la lista de pacientes.
 * - `SafeAreaView` para manejar las áreas seguras (ver: https://github.com/th3rdwave/react-native-safe-area-context).
 * - `FichaPaciente` para mostrar los detalles del paciente (componente reutilizable).
 *
 * @component
 * @returns {JSX.Element} Detalles de un paciente o un mensaje de error.
 *
 */

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
    <SafeAreaView className="flex-1 justify-center p-4">
      <FichaPaciente paciente={paciente} />
    </SafeAreaView>
  );
};

export default PacienteDetails;

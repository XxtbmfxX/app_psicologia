import { Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ListaTranscripciones from "@/components/mostrar/ListaTranscripciones";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Componente `nombrePaciente`.
 *
 * Función principal:
 * - Muestra las transcripciones asociadas a un paciente específico, obteniendo el nombre del paciente desde los parámetros de la URL.
 *
 * Dependencias externas:
 * - `useLocalSearchParams` de `expo-router` para capturar los parámetros de la URL.
 * - `ListaTranscripciones`: Componente reutilizable para mostrar las transcripciones de un paciente.
 * - `SafeAreaView`: Para manejar áreas seguras.
 *
 * @component
 * @returns {JSX.Element} Transcripciones de un paciente específico.
 *
 */

const nombrePaciente = () => {
  const { nombrePaciente } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text className="text-xl text-center my-5">
        Transcripciones de
        <Text className="font-semibold"> {nombrePaciente}</Text>
      </Text>
      {/* @ts-ignore */}
      <ListaTranscripciones nombrePaciente={nombrePaciente} />
    </SafeAreaView>
  );
};

export default nombrePaciente;

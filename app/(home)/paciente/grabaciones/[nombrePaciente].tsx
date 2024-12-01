import GrabarAudio from "@/components/audios/GrabarAudio";
import ListaAudios from "@/components/mostrar/ListaAudios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Componente `grabacionesPaciente`.
 *
 * Función principal:
 * - Muestra las grabaciones asociadas a un paciente y permite grabar nuevas notas de audio.
 *
 * Dependencias externas:
 * - `useLocalSearchParams` de `expo-router` para capturar el nombre del paciente.
 * - `GrabarAudio`: Componente reutilizable para grabar audios.
 * - `ListaAudios`: Componente reutilizable para listar las grabaciones existentes.
 * - `SafeAreaView`: Para manejar áreas seguras.
 *
 * @component
 * @returns {JSX.Element} Interfaz con grabaciones y opciones para un paciente específico.
 *
 */

const grabacionesPaciente = () => {
  const { nombrePaciente } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex justify-center">
      <Text className="text-xl text-center my-5">
        Grabaciones de {nombrePaciente}
      </Text>
      {/* @ts-ignore */}
      <GrabarAudio nombrePaciente={nombrePaciente} />
      {/* @ts-ignore */}
      <ListaAudios nombrePaciente={nombrePaciente} />
    </SafeAreaView>
  );
};

export default grabacionesPaciente;

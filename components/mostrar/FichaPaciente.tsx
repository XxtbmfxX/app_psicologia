import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Paciente } from "@/types/types";
import { usePacientes } from "@/context/PacienteContext";

type Props = {
  paciente: Paciente;
};
/**
 * Componente que muestra los detalles de un paciente, incluyendo nombre, apellido, RUT, teléfono,
 * y botones para ver grabaciones, transcripciones, archivar o modificar los datos del paciente.
 *
 * @param {Props} props - Propiedades del componente.
 * @param {Paciente} props.paciente - Datos del paciente que se mostrarán en la ficha.
 *
 * @returns {JSX.Element} - Un componente con los detalles del paciente y acciones disponibles.
 *
 * @throws {Error} - Si hay un problema al archivar o modificar los datos del paciente, se muestra un mensaje de alerta.
 *
 * @example
 * <FichaPaciente paciente={pacienteData} />
 */
const FichaPaciente = ({ paciente }: Props) => {
  const { archivarPaciente } = usePacientes();

  const verGrabaciones = () => {
    router.navigate(`/(home)/paciente/grabaciones/${paciente.nombre}`);
  };

  const verTranscripciones = () => {
    router.navigate(`/(home)/paciente/transcripciones/${paciente.nombre}`);
  };

  const handleModificarDatos = (pacienteId: string) => {
    router.push(`/(home)/paciente/modificarPaciente/${pacienteId}`);
  };

  const handleArchivarPaciente = async (pacienteId: string) => {
    await archivarPaciente(pacienteId);
    Alert.alert(`Paciente ${paciente.nombre} archivado`);
    router.navigate("/(home)");
  };

  return (
    <>
      {/* CARD PACIENTE */}
      <View className="rounded-3xl bg-blue-400 p-6 mx-4 shadow-lg">
        <Text className="text-2xl font-semibold text-white mb-3">
          Datos del Paciente
        </Text>
        <Text className="text-lg text-white mb-2">
          <Text className="font-semibold">Nombre: </Text>
          {paciente.nombre}
        </Text>
        <Text className="text-lg text-white mb-2">
          <Text className="font-semibold">Apellido:</Text> {paciente.apellido}
        </Text>
        <Text className="text-lg text-white mb-2">
          <Text className="font-semibold">RUT: </Text>
          {paciente.rut}
        </Text>
        <Text className="text-lg text-white mb-2">
          <Text className="font-semibold">Teléfono: </Text>
          {paciente.telefono}
        </Text>

        {/* Botones de acción */}

        <View className="my-5">
          <Pressable
            onPress={verGrabaciones}
            className="bg-purple-500 p-4 rounded-lg mb-3 shadow-md"
          >
            <Text className="text-white text-center">Ver Grabaciones</Text>
          </Pressable>

          <Pressable
            onPress={verTranscripciones}
            className="bg-purple-600 p-4 rounded-lg mb-3 shadow-md"
          >
            <Text className="text-white text-center">Ver Transcripciones</Text>
          </Pressable>

          <Pressable
            onPress={() => handleArchivarPaciente(paciente.id)}
            className="bg-red-600 p-4 rounded-lg mb-3 shadow-md"
          >
            <Text className="text-white text-center">Archivar Paciente</Text>
          </Pressable>

          <Pressable
            onPress={() => handleModificarDatos(paciente.id)}
            className="bg-yellow-600 p-4 rounded-lg mb-3 shadow-md"
          >
            <Text className="text-white text-center">Modificar Datos</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default FichaPaciente;

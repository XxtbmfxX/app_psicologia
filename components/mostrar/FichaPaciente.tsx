import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Paciente } from "@/types/types";
import { usePacientes } from "@/context/PacienteContext";

type Props = {
  paciente: Paciente;
};

const FichaPaciente = ({ paciente }: Props) => {
  const { archivarPaciente } = usePacientes();

  const handleAddNota = () => {
    Alert.alert(
      "De momento hay que integrar la API de Speech to Text （；´д｀）ゞ"
    );
  };

  const grabarAudio = () => {
    console.log("audio grabado");
    router.push("/(home)/paciente/grabarAudio");
  };

  const handleModificarDatos = (pacienteId: string) => {
    router.push(`/(home)/paciente/modificarPaciente/${pacienteId}`);
  };

  const agregarCita = () => {
    router.navigate("/(home)/paciente/agregarCita");
  };

  const verGrabaciones = () => {
    router.navigate("/(home)/paciente/grabaciones");
  };

  const handleArchivarPaciente = async (pacienteId: string) => {
    await archivarPaciente(pacienteId);
    Alert.alert(`Paciente ${paciente.nombre} archivado`);
    router.navigate("/(home)");
  };

  return (
    <>
      {/* HEADER */}
      <View className="flex flex-row justify-between my-5 px-4">
        <Ionicons
          name="arrow-back-circle"
          onPress={() => router.back()}
          size={58}
          color="black"
        />

        <FontAwesome name="user-circle-o" size={58} color="black" />

        <AntDesign
          onPress={() => handleAddNota()}
          name="pluscircle"
          size={58}
          color="black"
        />
      </View>

      {/* CARD PACIENTE */}
      <View className="rounded-3xl bg-blue-400 p-6 mx-4 shadow-lg">
        <Text className="text-2xl font-semibold text-white mb-3">
          Datos del Paciente
        </Text>
        <Text className="text-lg text-white mb-2">
          Nombre: {paciente.nombre}
        </Text>
        <Text className="text-lg text-white mb-2">
          Apellido: {paciente.apellido}
        </Text>
        <Text className="text-lg text-white mb-2">RUT: {paciente.rut}</Text>
        <Text className="text-lg text-white mb-2">
          Teléfono: {paciente.telefono}
        </Text>

        {/* Botones de acción */}
        <Pressable
          onPress={grabarAudio}
          className="bg-purple-600 p-4 rounded-lg mb-3 shadow-md"
        >
          <Text className="text-white text-center">Grabar Audio</Text>
        </Pressable>

        <Pressable
          onPress={verGrabaciones}
          className="bg-purple-600 p-4 rounded-lg mb-3 shadow-md"
        >
          <Text className="text-white text-center">Ver Grabaciones</Text>
        </Pressable>

        <Pressable
          onPress={agregarCita}
          className="bg-purple-600 p-4 rounded-lg mb-3 shadow-md"
        >
          <Text className="text-white text-center">Agregar Cita</Text>
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
    </>
  );
};

export default FichaPaciente;

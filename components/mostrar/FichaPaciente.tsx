import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";

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

  const grabarAudio = () => {
    console.log("audio grabado");
    router.push("/(home)/paciente/grabarAudio");
  };

  const navigation = useNavigation();
  const handeModificarDatos = (pacienteId: string) => {
    navigation.navigate("paciente/modificarPaciente", { pacienteId });
    // router.navigate("/(home)/paciente/modificarPaciente");
  };

  const agregarCita = () => {
    router.navigate("/(home)/paciente/agregarCita");
  };

  const verGrabaciones = () => {
    router.navigate("/(home)/paciente/grabaciones");
  };

  const handleAddNota = () => {
    console.log("Nota Agregada");
  };

  const handleArchivarPaciente = async (pacienteId: string) => {
    await archivarPaciente(pacienteId);
    Alert.alert(`Paciente ${paciente.nombre} archivado`);
    router.navigate("/(home)");
  };

  return (
    <>
      {/* HEADER */}
      <View className="flex flex-row justify-between my-5">
        <Ionicons
          name="arrow-back-circle"
          onPress={() => {
            router.back();
          }}
          size={58}
          color="black"
        />

        <FontAwesome name="user-circle-o" size={58} color="black" />

        <AntDesign
          onPress={() => {
            handleAddNota();
          }}
          name="pluscircle"
          size={58}
          color="black"
        />
      </View>

      {/* Card Paciente */}
      <View className="flex items-center h-full rounded-3xl bg-blue-400">
        {/* Datos Paciente */}

        <Text>Nombre: {paciente?.nombre}</Text>
        <Text>Apellido: {paciente?.apellido}</Text>
        <Text>RUT: {paciente?.rut}</Text>
        <Text>Teléfono: {paciente?.telefono}</Text>

        {/* Botones de redirección  */}

        <Pressable
          onPress={grabarAudio}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Grabar Audio</Text>
        </Pressable>

        <Pressable
          onPress={grabarAudio}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Grabar Audio</Text>
        </Pressable>

        <Pressable
          onPress={verGrabaciones}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Ver Gravaciones</Text>
        </Pressable>

        <Pressable
          onPress={agregarCita}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Agregar Cita</Text>
        </Pressable>

        <Pressable
          onPress={() => handleArchivarPaciente(paciente.id)}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Archivar Paciente</Text>
        </Pressable>

        <Pressable
          onPress={() => handeModificarDatos(paciente.id)}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">
            Modificar Datos Paciente
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default FichaPaciente;

import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Patient } from "@/types/types";

type Props = {
  patient: Patient;
};

const FichaPaciente = ({ patient }: Props) => {
  const grabarAudio = () => {
    console.log("audio grabado");
    router.push("/(home)/paciente/grabarAudio");
  };

  const modificarDatos = () => {
    console.log("Modificar Datos");
  };

  const agregarCita = () => {
    console.log("Agregar Cita");
  };

  const verGrabaciones = () => {
    console.log("Agregar Cita");
    router.push("/(home)/paciente/grabaciones");
  };

  const handleAddNota = () => {
    console.log("Nota Agregada");
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

        <Text>Nombre: {patient?.nombre}</Text>
        <Text>Apellido: {patient?.apellido}</Text>
        <Text>RUT: {patient?.rut}</Text>
        <Text>Teléfono: {patient?.telefono}</Text>
        <Text>Fecha de Control: {patient?.fechaControl?.toString()}</Text>

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
          onPress={grabarAudio}
          className="bg-purple-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Grabar Audio</Text>
        </Pressable>
      </View>
    </>
  );
};

export default FichaPaciente;

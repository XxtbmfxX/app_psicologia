import React from "react";
import { FlatList, Text, View } from "react-native";
import { usePacientes } from "@/context/PacienteContext";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";
import FilaPaciente from "./FilaPaciente";

const ListaPacientes = () => {
  const { pacientesFiltrados } = usePacientes(); // Pacientes filtrados desde el contexto

  if (pacientesFiltrados.length === 0) {
    return (
      <Text className="text-center text-xl text-gray-500">
        No hay pacientes (#｀-_ゝ-)
      </Text>
    );
  }

  return (
    <FlatList
      data={pacientesFiltrados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
        >
          <FilaPaciente id={item.id} nombre={item.nombre} apellido={item.apellido} rut={item.rut}/>
        </Animated.View>
      )}
      className=" w-full px-4"
    />
  );
};

export default ListaPacientes;

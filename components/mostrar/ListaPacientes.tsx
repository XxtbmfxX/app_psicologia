import React from "react";
import { FlatList, Text } from "react-native";
import { usePacientes } from "@/context/PacienteContext";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FilaPaciente from "./FilaPaciente";

/**
 * 
 * # ListaPacientes
 * ## Descripción:
 * Este componente muestra la lista de pacientes filtrados con animaciones de entrada y salida. Si no hay pacientes disponibles, muestra un mensaje indicando que no hay pacientes.
 * 
 * ## Lógica:
 * 
 * - Utiliza el hook usePacientes para obtener la lista de pacientes filtrados desde el contexto PacienteContext.
 * - Si la lista de pacientes está vacía, muestra un mensaje con un emoji de desaprobación.
 * - Si hay pacientes, usa un FlatList para renderizar la lista, mostrando un componente FilaPaciente con animaciones de entrada (FadeIn) y salida (FadeOut) proporcionadas por react-native-reanimated.
 */
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
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <FilaPaciente
            id={item.id}
            nombre={item.nombre}
            apellido={item.apellido}
            rut={item.rut}
          />
        </Animated.View>
      )}
      className=" w-full px-4"
    />
  );
};

export default ListaPacientes;

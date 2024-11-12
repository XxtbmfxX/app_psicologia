import { usePacientes } from "@/context/PacienteContext";
import React from "react";
import { FlatList, Text, View } from "react-native";
import FilaPaciente from "./FilaPaciente";

const ListaPacientes = () => {
  const { pacientes, obtenerPacientes } = usePacientes();

  if (pacientes.length === 0) {
    return (
      <Text className="text-center text-xl text-gray-500">
        No hay pacientes (#｀-_ゝ-)
      </Text>
    );
  }

  return (
    <FlatList
      data={pacientes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FilaPaciente id={item.id} nombre={item.nombre} />
      )}
      className="px-4 py-6"
    />
  );
};

export default ListaPacientes;

import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { usePacientes } from "@/context/PacienteContext";

const InputBusqueda = () => {
  const { setFiltroBusqueda } = usePacientes();
  const [busqueda, setBusqueda] = useState("");

  const manejarCambio = (texto: string) => {
    setBusqueda(texto);
    setFiltroBusqueda(texto);
  };

  return (
    <View className="flex-row items-center align-middle rounded-2xl px-4 py-2 w-full">
      <TextInput
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
        placeholder="Buscar paciente por nombre"
        placeholderTextColor="#888"
        value={busqueda}
        onChangeText={manejarCambio}
      />
    </View>
  );
};

export default InputBusqueda;

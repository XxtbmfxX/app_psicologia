import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { usePacientes } from "@/context/PacienteContext";
import { Ionicons } from "@expo/vector-icons";

const InputBusqueda = () => {
  const { setFiltroBusqueda } = usePacientes(); // Nueva función desde el contexto
  const [busqueda, setBusqueda] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const manejarCambio = (texto: string) => {
    setBusqueda(texto);
    setFiltroBusqueda(texto); // Actualiza el filtro en el contexto
  };

  return (
    <View className="flex-row items-center align-middle rounded-2xl px-4 py-2 w-full">
      <TextInput
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
        placeholder="Buscar paciente por nombre"
        placeholderTextColor="#888"
        value={busqueda}
        onChangeText={manejarCambio}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default InputBusqueda;

import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { usePacientes } from "@/context/PacienteContext";
/**
 * Campo de entrada para buscar pacientes.
 *
 * Función principal:
 * - Permite al usuario escribir un término de búsqueda.
 * - Actualiza un filtro de búsqueda en el contexto de pacientes (`PacienteContext`).
 *
 * Dependencias externas:
 * - `usePacientes`: Contexto para gestionar pacientes y sus filtros de búsqueda.
 * - `TextInput` de React Native: Entrada de texto (https://reactnative.dev/docs/textinput).
 *
 * Estado interno:
 * - `busqueda`: Guarda el texto ingresado en el campo de búsqueda.
 *
 * @component
 * @example
 * <InputBusqueda />
 */

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

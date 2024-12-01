import { FlatList, Text } from "react-native";
import React from "react";
import { usePacientes } from "@/context/PacienteContext";
import FilaArchivado from "./FilaArchivado";

/**
 * # ListaArchivados
 * ## Descripción:
 * Este componente lista todos los pacientes archivados en un formato de lista usando FlatList. Si no hay pacientes archivados, muestra un mensaje indicando que no hay datos.
 *
 * # Lógica:
 *
 * - Usa el hook usePacientes para obtener la lista de pacientes archivados.
 * - Si la lista está vacía, muestra un mensaje indicando que no hay pacientes archivados.
 * - Si hay pacientes archivados, usa un FlatList para renderizar una lista de componentes FilaArchivado.
 * 
 * 
 */

const ListaArchivados = () => {
  const { pacientesArchivados } = usePacientes();

  if (pacientesArchivados.length === 0) {
    return <Text>No hay pacientes archivados (#｀-_ゝ-)</Text>;
  }

  return (
    <FlatList
      data={pacientesArchivados}
      keyExtractor={(item) => item.id}
      className="bg-gray-200 rounded-lg p-5 w-full"
      renderItem={({ item }) => (
        <FilaArchivado
          id={item.id}
          nombre={item.nombre}
          apellido={item.apellido}
          rut={item.rut}
        />
      )}
    />
  );
};

export default ListaArchivados;

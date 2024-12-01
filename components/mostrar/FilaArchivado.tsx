import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomPressable from "../common/CustomPressable";
import { usePacientes } from "@/context/PacienteContext";

type Props = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
};

/**
 *
 * ## Descripción:
 * Este componente muestra información de un paciente archivado,
 * permitiendo devolverlo a la lista de pacientes activos.
 * Se utiliza en una lista de pacientes archivados.
 *
 * ## Propiedades:
 *
 * - id: Identificador único del paciente (string).
 * - nombre: Nombre del paciente (string).
 * - apellido: Apellido del paciente (string).
 * - rut: RUT del paciente (string).
 * ## Lógica:
 *
 * Se utiliza el hook usePacientes para acceder a la función devolverPacienteArchivado,
 * que mueve al paciente de vuelta a la lista de pacientes activos.
 * Un estado loading controla la visualización de un indicador de carga mientras se procesa la devolución.
 * Muestra un botón para devolver el paciente y, mientras se procesa, un indicador de carga (ActivityIndicator).
 * Funciones:
 *
 * handleDevolver: Llama a la función devolverPacienteArchivado para restaurar al paciente y muestra una alerta de éxito.
 * @returns
 */

const FilaArchivado = ({ nombre, id, apellido, rut }: Props) => {
  const { devolverPacienteArchivado } = usePacientes();
  const [loading, setloading] = useState(false);

  const handleDevolver = async (nombre: string, id: string) => {
    setloading(true);
    await devolverPacienteArchivado(id);
    setloading(false);
    Alert.alert(
      `Paciende ${nombre} devuelto a la lista de pacientes ( •̀ .̫ •́ )✧`
    );
  };

  return (
    <View className="bg-gray-50 rounded-lg p-2 my-1 flex flex-row items-center justify-around ">
      <View className="">
        <Text className="text-lg">
          {nombre} {apellido}
        </Text>
        <Text className="text-sm">{rut}</Text>
      </View>

      {loading ? (
        <ActivityIndicator className="h-20" color="#5a6fe8" />
      ) : (
        <CustomPressable
          title="Devolver"
          onPress={() => handleDevolver(nombre, id)}
        />
      )}
    </View>
  );
};

export default FilaArchivado;

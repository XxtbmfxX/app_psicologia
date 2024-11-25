import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomPressable from "../common/CustomPressable";
import { usePacientes } from "@/context/PacienteContext";

type Props = {
  id: string;
  nombre: string;
  apellido: string;
  rut:  string;
};

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
        <Text className="text-lg">{nombre} {apellido}</Text>
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

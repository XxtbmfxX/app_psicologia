import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";

type FilaPacienteProps = {
  id: string;
  nombre: string;
  apellido: string;
  rut:  string;
};

const FilaPaciente: React.FC<FilaPacienteProps> = ({ id, nombre, apellido, rut }) => {
  return (
    <Link
      className=" bg-gray-50 border-gray-400 border-b rounded-lg shadow-md mb-3 "
      href={{
        pathname: "/(home)/paciente/[id]",
        params: { id: id },
      }}
    >
      <View className="p-3">
        <Text className="text-lg font-semibold text-blue-600">{nombre} {apellido}</Text>    
        <Text className="text-sm font-semibold text-blue-400 mt-2">{rut}</Text>
        </View>
    </Link>
  );
};

export default FilaPaciente;

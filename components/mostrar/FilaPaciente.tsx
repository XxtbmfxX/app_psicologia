import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";

type FilaPacienteProps = {
  id: string;
  nombre: string;
};

const FilaPaciente: React.FC<FilaPacienteProps> = ({ id, nombre }) => {
  return (
    <Link
      className=" bg-gray-50 border-gray-400 border-b rounded-lg shadow-md mb-3 "
      href={{
        pathname: "/(home)/paciente/[id]",
        params: { id: id },
      }}
    >
      <View className="p-4">
        <Text className="text-lg font-semibold text-blue-600">{nombre}</Text>
      </View>
    </Link>
  );
};

export default FilaPaciente;

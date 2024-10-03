import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {};

const FilaPaciente = (props: Props) => {
  return (
    <View className="flex flex-row justify-around items-center my-2 h-20 bg-green-50 rounded-md ">
      <Link
        className="block  w-full text-center"
        href={{
          pathname: "/(home)/paciente/[id]",
          params: { id: "1" },
        }}
      >
        <Text className="text-xl">Nombre: Pedro </Text>
        <Text className="text-xl"> | </Text>
        <Text className="text-xl">Área: NPM</Text>
      </Link>
    </View>
  );
};

export default FilaPaciente;

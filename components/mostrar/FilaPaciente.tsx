import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {};

const FilaPaciente = (props: Props) => {
  return (
    <View className="flex flex-row items-center my-2 h-20 bg-green-300 rounded-md ">
      <Link
        className="flex flex-row w-full pl-5"
        href={{
          pathname: "/(home)/paciente/[id]",
          params: { id: "2" },
        }}
      >
        <Text className="text-xl">Pedro </Text>
        <Text className="text-xl"> | </Text>
        <Text className="text-xl">Área: NPM</Text>
      </Link>
    </View>
  );
};

export default FilaPaciente;

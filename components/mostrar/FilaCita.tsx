import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {};

const FilaCita = (props: Props) => {
  return (
    <View className="flex flex-row justify-around bg-green-500 my-5 p-5  rounded-lg" >
      <Text className="text-white font-bold text-xl mx-5" >Paciente owo</Text>
      <Text className="text-white font-bold text-xl mx-5" >Fecha y Hora</Text>
    </View>
  );
};

export default FilaCita;

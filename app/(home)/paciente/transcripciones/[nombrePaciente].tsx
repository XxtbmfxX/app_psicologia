import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

type Props = {};

const nombrePaciente = (props: Props) => {
  const { nombrePaciente } = useLocalSearchParams();
  return (
    <View>
      <Text>El paciente: {nombrePaciente}</Text>
    </View>
  );
};

export default nombrePaciente;

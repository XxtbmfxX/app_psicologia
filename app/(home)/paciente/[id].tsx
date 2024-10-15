import { View, Text, Pressable, Button, StatusBar } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FichaPaciente from "@/components/mostrar/FichaPaciente";

type Props = {};

const Paciente = (props: Props) => {
  const { id } = useLocalSearchParams();


  return (
    <SafeAreaView className="bg-green-300 ">
     <FichaPaciente id={id} />
     <Button title="ola" />
    </SafeAreaView>
  );
};

export default Paciente;

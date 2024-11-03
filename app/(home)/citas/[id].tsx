import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCitas } from "@/context/CitasContext";
import { Cita } from "@/types/types";
import DatosCita from "@/components/mostrar/DatosCita";
import { Text } from "react-native";

type Props = {};

const id = (props: Props) => {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <DatosCita />
    </SafeAreaView>
  );
};

export default id;

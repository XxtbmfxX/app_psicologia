import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCitas } from "@/context/CitasContext";
import { Cita } from "@/types/types";
import DatosCita from "@/components/mostrar/DatosCita";

type Props = {};

const id = (props: Props) => {
  const { citas } = useCitas();
  const { id } = useLocalSearchParams();
  const cita: Cita | undefined = citas.find((c) => c.idPaciente === id);

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <DatosCita cita={cita} />
    </SafeAreaView>
  );
};

export default id;

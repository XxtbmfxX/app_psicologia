import { View, Text } from "react-native";
import React from "react";
import { Cita } from "@/types/types";
import CustomPressable from "../common/CustomPressable";
import { router } from "expo-router";

type Props = {
  cita: Cita | undefined;
};

const DatosCita = ({ cita }: Props) => {


  // Convierte el Timestamp de Firebase a una instancia de Date
  const dateObject = cita?.fechaYHora.toDate();

  // Formatea la fecha y la hora
  const formattedDate = dateObject?.toLocaleDateString("es-ES");
  const formattedTime = dateObject?.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hadleEditCita = () => {
    console.log("editar cita");
  };

  if (cita === undefined) {
    return <Text>Cita no encontrada</Text>;
  }

  return (
    <View className="flex flex-col justify-center h-full w-full">
      <CustomPressable onPress={hadleEditCita} title="Modificar Cita" />
      <View className="bg-white rounded-lg p-2">
        <View className="flex flex-row align-middle justify-between w-full my-5">
          <Text className=""> Id Cita: </Text>
          <Text className=""> {cita?.id}</Text>
        </View>
        <View className="flex flex-row align-middle justify-between w-full my-5">
          <Text className="text-xl"> Fecha: </Text>
          <Text className="text-xl"> {formattedDate}</Text>
        </View>
        <View className="flex flex-row align-middle justify-between w-full my-5">
          <Text className="text-xl"> Hora: </Text>
          <Text className="text-xl"> {formattedTime}</Text>
        </View>
        <View className="flex flex-row align-middle justify-between w-full my-5">
          <Text className="text-xl"> Nombre: </Text>
          <Text className="text-xl"> {cita?.nombre}</Text>
        </View>
        <View className="flex flex-row align-middle justify-between w-full my-5">
          <Text className=""> Id Paciente: </Text>
          <Text className=""> {cita?.idPaciente}</Text>
        </View>
      </View>
    </View>
  );
};

export default DatosCita;

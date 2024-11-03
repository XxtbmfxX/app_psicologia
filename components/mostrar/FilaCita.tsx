import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Cita } from "@/types/types";

type Props = {
  cita: Cita;
};

const FilaCita = ({ cita }: Props) => {
  // Convierte el Timestamp de Firebase a una instancia de Date
  const dateObject = cita.fechaYHora.toDate();


  // Formatea la fecha y la hora
  const formattedDate = dateObject.toLocaleDateString("es-ES");
  const formattedTime = dateObject.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View className="bg-green-500 rounded-lg my-5 p-5">
      <Link
        href={{
          pathname: "/citas/[id]", // Ruta dinámica
          params: { id: cita.id }, // Parámetro a enviar
        }}
      >
        <Text className="text-white font-bold text-2xl">
          {cita.nombre} - {formattedDate} -
        </Text>
        <Text className="text-white font-bold text-2xl text-right">
          - {formattedTime}
        </Text>
      </Link>
    </View>
  );
};

export default FilaCita;

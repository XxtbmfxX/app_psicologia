import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Cita } from "@/types/types";

type Props = {
  cita: Cita;
};

const FilaCita = ({ cita }: Props) => {
  const dateObject = cita.fechaYHora.toDate();
  const formattedDate = dateObject.toLocaleDateString("es-ES");
  const formattedTime = dateObject.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePushCita = () => {
    router.push(`/citas/${cita.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePushCita}
      className="bg-blue-600 rounded-lg my-1 p-4 shadow-md"
      activeOpacity={0.8}
    >
      <Text className="text-white font-bold text-xl">{cita.nombre} {cita.apellido}</Text>

      <Text className="text-white text-right text-lg">
        {formattedDate} - {formattedTime}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default FilaCita;

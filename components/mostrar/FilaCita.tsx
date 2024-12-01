import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Cita } from "@/types/types";

type Props = {
  cita: Cita;
};
/**
 * Componente que muestra la información de una cita y permite navegar a la vista de detalles de la cita.
 * 
 * Este componente recibe un objeto de cita y muestra el nombre del paciente, la fecha y la hora de la cita.
 * Al hacer clic en la fila, el usuario es redirigido a la vista detallada de esa cita.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.cita - El objeto de cita que contiene la información de la cita.
 * @param {string} props.cita.id - El ID de la cita.
 * @param {string} props.cita.nombre - El nombre del paciente.
 * @param {string} props.cita.apellido - El apellido del paciente.
 * @param {Object} props.cita.fechaYHora - La fecha y hora de la cita en formato de objeto `Date`.
 * 
 * @returns {React.JSX.Element} La fila de cita con el nombre y la fecha de la cita.
 */
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
      <Text className="text-white font-bold text-xl">
        {cita.nombre} {cita.apellido}
      </Text>

      <Text className="text-white text-right text-lg">
        {formattedDate} - {formattedTime}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default FilaCita;

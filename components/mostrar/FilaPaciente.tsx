import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

type FilaPacienteProps = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
};
/**
 * Componente que muestra la información básica de un paciente y permite navegar a su vista detallada.
 * 
 * Este componente recibe un objeto de paciente con el ID, nombre, apellido y RUT del paciente.
 * Al hacer clic en la fila, el usuario es redirigido a la vista detallada del paciente.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - El ID del paciente.
 * @param {string} props.nombre - El nombre del paciente.
 * @param {string} props.apellido - El apellido del paciente.
 * @param {string} props.rut - El RUT del paciente.
 * 
 * @returns {React.JSX.Element} La fila del paciente con su nombre y RUT.
 */
const FilaPaciente: React.FC<FilaPacienteProps> = ({
  id,
  nombre,
  apellido,
  rut,
}) => {
  return (
    <Link
      className=" bg-gray-50 border-gray-400 border-b rounded-lg shadow-md mb-3 "
      href={{
        pathname: "/(home)/paciente/[id]",
        params: { id: id },
      }}
    >
      <View className="p-3">
        <Text className="text-lg font-semibold text-blue-600">
          {nombre} {apellido}
        </Text>
        <Text className="text-sm font-semibold text-blue-400 mt-2">{rut}</Text>
      </View>
    </Link>
  );
};

export default FilaPaciente;

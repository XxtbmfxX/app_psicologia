import React from "react";
import { useLocalSearchParams } from "expo-router";
import FormIngresoPaciente from "@/components/Formulario/FormIngresoPacientes";

/**
 * Componente `idPaciente`.
 *
 * Función principal:
 * - Renderiza un formulario de ingreso de datos para un paciente específico, utilizando su ID obtenido desde los parámetros de la URL.
 *
 * Dependencias externas:
 * - `useLocalSearchParams` de `expo-router` para capturar el ID del paciente desde la URL.
 * - `FormIngresoPaciente`: Componente reutilizable que representa el formulario de ingreso de datos de un paciente.
 *
 * @component
 * @returns {JSX.Element} Formulario de ingreso de datos para un paciente.
 *
 */

const idPaciente = () => {
  const { idPaciente } = useLocalSearchParams();
  {/* @ts-ignore */}
  return <FormIngresoPaciente id={idPaciente} />;
};

export default idPaciente;

import React from "react";
import FormIngresoCita from "@/components/Formulario/FormIngresoCita";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

/**
 * Ruta: `/citas/modificarCita/[idCita]`
 *
 * Función principal:
 * - Renderiza un formulario para modificar una cita específica.
 *
 * Dependencias externas:
 * - `useLocalSearchParams`: Hook de `expo-router` para capturar el ID de la cita desde la URL.
 * - `FormIngresoCita`: Componente reutilizable que representa el formulario para modificar datos de una cita, aceptando el ID como prop.
 * - `SafeAreaView`: Contenedor seguro para respetar áreas protegidas.
 *
 * @component
 * @returns {JSX.Element} Interfaz para modificar una cita específica.
 *
 */

const modificarCita = () => {
  const { idCita } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      {/* @ts-ignore */}
      <FormIngresoCita citaId={idCita} />
    </SafeAreaView>
  );
};

export default modificarCita;

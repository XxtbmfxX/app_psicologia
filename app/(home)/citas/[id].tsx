import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DatosCita from "@/components/mostrar/DatosCita";
/**
 * Ruta: `/citas/[id]`
 *
 * Función principal:
 * - Muestra los detalles de una cita específica.
 *
 * Dependencias externas:
 * - `DatosCita`: Componente reutilizable que muestra la información detallada de una cita (ver documentación del componente).
 * - `SafeAreaView`: Contenedor seguro para respetar áreas protegidas.
 *
 * @component
 * @returns {JSX.Element} Detalles de una cita específica.
 *
 */

const id = () => {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <DatosCita />
    </SafeAreaView>
  );
};

export default id;

import { SafeAreaView } from "react-native-safe-area-context";
import FormIngresoCita from "@/components/Formulario/FormIngresoCita";
import React from "react";
import { View } from "react-native";
import CustomLink from "@/components/common/CustomLink";
/**
 * Ruta: `/citas/aniadirCita`
 *
 * Función principal:
 * - Renderiza un formulario para añadir una nueva cita.
 * - Incluye un enlace para volver a la lista de citas.
 *
 * Dependencias externas:
 * - `FormIngresoCita`: Componente reutilizable para mostrar el formulario de ingreso de citas (ver documentación del componente).
 * - `CustomLink`: Componente reutilizable para redirigir a otras rutas.
 * - `SafeAreaView`: Contenedor seguro para respetar áreas protegidas.
 *
 * @component
 * @returns {JSX.Element} Interfaz para agregar una cita con un enlace para volver.
 *
 */

export default function Formulario() {
  return (
    <SafeAreaView className="flex-1 align-middle p-5 bg-blue-400">
      <View className="mb-10">
        <CustomLink
          ruta={"/(home)/citas"}
          titulo="Volver a citas"
          key="Link a citas"
        />
      </View>
      <FormIngresoCita />
    </SafeAreaView>
  );
}

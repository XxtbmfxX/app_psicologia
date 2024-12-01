import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaCitas from "@/components/mostrar/ListaCitas";
import CustomLink from "@/components/common/CustomLink";
/**
 * Ruta: `/citas`
 *
 * Función principal:
 * - Muestra la lista de citas existentes en la aplicación.
 * - Proporciona un enlace para añadir una nueva cita.
 *
 * Dependencias externas:
 * - `ListaCitas`: Componente reutilizable para listar las citas existentes (ver documentación del componente).
 * - `CustomLink`: Componente común para manejar enlaces en la aplicación.
 * - `SafeAreaView`: Contenedor seguro para respetar áreas protegidas (https://github.com/th3rdwave/react-native-safe-area-context).
 *
 * @component
 * @returns {JSX.Element} Interfaz que lista las citas y permite navegar para agregar una nueva.
 *
 */

const citas = () => {
  return (
    <SafeAreaView className="flex-1 items-center align-middle bg-blue-400">
      <View className="my-5">
        <CustomLink
          ruta={"/(home)/citas/aniadirCita"}
          titulo="Agregar cita ( •̀ .̫ •́ )✧"
          key="Link a añadir cita"
        />
      </View>
      <ListaCitas />
    </SafeAreaView>
  );
};

export default citas;

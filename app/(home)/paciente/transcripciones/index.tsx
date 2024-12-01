import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaTranscripciones from "@/components/mostrar/ListaTranscripciones";
/**
 * Componente `index`.
 *
 * Función principal:
 * - Muestra una lista de transcripciones disponibles en la aplicación.
 *
 * Dependencias externas:
 * - `ListaTranscripciones`: Componente reutilizable para listar transcripciones.
 * - `SafeAreaView`: Contenedor que respeta las áreas seguras (ver: https://github.com/th3rdwave/react-native-safe-area-context).
 *
 * @component
 * @returns {JSX.Element} Interfaz con un título y la lista de transcripciones.
 *
 */

const index = () => {
  return (
    <SafeAreaView>
      <Text className="text-xl text-center my-5">Transcripciones</Text>
      <ListaTranscripciones />
    </SafeAreaView>
  );
};

export default index;

import React from "react";
import { View, Text, FlatList } from "react-native";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import FilaCita from "./FilaCita";
import { useCitas } from "@/context/CitasContext";

/**
 * # ListaCitas
 * ## Descripción:
 * Este componente lista todas las citas del usuario, mostrando una lista con animaciones de entrada y salida. Si no hay citas, muestra un mensaje indicando que no hay citas disponibles.
 *
 * ## Lógica:
 *
 * - Usa el hook useCitas para acceder a las citas filtradas.
 * - Si la lista de citas está vacía, muestra un mensaje con un emoji de desaprobación.
 * - Si hay citas, utiliza un FlatList para renderizar cada cita con un componente FilaCita y animaciones de entrada (SlideInLeft) y salida (SlideOutRight).
 * - Se utiliza la librería react-native-reanimated para gestionar las animaciones de los elementos de la lista.
 
 */
const ListaCitas = () => {
  const { citas } = useCitas();

  if (citas.length === 0) {
    return (
      <View className="flex items-center justify-center h-full">
        <Text className="text-gray-500 text-lg">
          No hay citas por el momento (#｀-_ゝ-)
        </Text>
      </View>
    );
  }

  return (
    <View className="flex items-center w-full p-4">
      <FlatList
        data={citas}
        renderItem={({ item }) => (
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutRight}
            className="w-full"
          >
            <FilaCita cita={item} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="mb-24"
      />
    </View>
  );
};

export default ListaCitas;

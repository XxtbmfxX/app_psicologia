import React from "react";
import { View, Text, FlatList } from "react-native";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import FilaCita from "./FilaCita";
import { useCitas } from "@/context/CitasContext";

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
      />
    </View>
  );
};

export default ListaCitas;

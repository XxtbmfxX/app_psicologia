import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaCitas from "@/components/mostrar/ListaCitas";
import CustomLink from "@/components/common/CustomLink";

const citas = () => {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <View className="mb-10">
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

import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormIngresoCita from "@/components/Formulario/FormIngresoCita";
import React from "react";
import { Text, View } from "react-native";
import CustomLink from "@/components/common/CustomLink";

export default function Formulario() {
  return (
    <SafeAreaView className="flex-1 align-middle p-5 bg-blue-400">
      <View className="mb-10">
        <CustomLink ruta={"/(home)/citas"} titulo="Volver a citas" key="Link a citas" />
      </View>
      <FormIngresoCita />
    </SafeAreaView>
  );
}

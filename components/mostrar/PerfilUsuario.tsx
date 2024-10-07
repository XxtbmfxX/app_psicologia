import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
const PerfilUsuario = () => {
  const handleGoHome = () => {
    console.log("Vuelta al inicio");
    router.push("/(home)");
  };
  const handleLogOut = () => {
    console.log("Vuelta al inicio");
    router.push("/(auth)");
  };

  return (
    <View className=" ">
      <View className="flex flex-row items-center justify-between ">
        <Feather onPress={handleGoHome} name="arrow-left-circle" size={58} color="black" />
        <Text className="text-2xl" >Hola Usuario</Text>
        <Ionicons onPress={handleGoHome} name="exit" size={58} color="black" />
      </View>
      <View className="flex items-center my-5 ">
        <Text className="text-2xl font-bold text-center ">
          Más datos de usuario
        </Text>
        <Text className="text-2xl font-bold text-center ">
          Más datos de usuario
        </Text>
        <Text className="text-2xl font-bold text-center ">
          Más datos de usuario
        </Text>
        <Text className="text-2xl font-bold text-center ">
          Más datos de usuario
        </Text>
        <Text className="text-2xl font-bold text-center ">
          Más datos de usuario
        </Text>
      </View>
    </View>
  );
};

export default PerfilUsuario;

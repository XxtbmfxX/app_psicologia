import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListaCitas from "@/components/mostrar/ListaCitas";

const citas = () => {
  return (
    <SafeAreaView>
      <Text className="my-20 text-center text-2xl ">Citas</Text>
      <View className="p-5">
        <ListaCitas />
      </View>
    </SafeAreaView>
  );
};

export default citas;

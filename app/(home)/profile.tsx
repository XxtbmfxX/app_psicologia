import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const profile = () => {
  return (
    <SafeAreaView>
      <Text
        className=" font-bold text-xl "
        onPress={() => {
          console.log("oliwis");
          router.push("/(auth)");
        }}
      >
        Sign Out
      </Text>
      <Text
        className=" font-bold text-xl "
        onPress={() => {
          console.log("oliwis");
          router.push("/(home)");
        }}
      >
        Volver
      </Text>
    </SafeAreaView>
  );
};

export default profile;

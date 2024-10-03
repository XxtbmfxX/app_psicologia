import { Text, View } from "react-native";
import React, { Component } from "react";
import { router } from "expo-router";

export class index extends Component {
  render() {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text
          onPress={() => {
            router.push("/(home)")
          }}
        >
          Sign In 
        </Text>
        <Text
          onPress={() => {
            router.push("/recuperarContrasenia")
          }}
        >
          Recuperar Contraseña
        </Text>
      </View>
    );
  }
}

export default index;

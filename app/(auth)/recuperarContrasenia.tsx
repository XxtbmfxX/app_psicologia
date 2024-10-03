import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const recuperarContrasenia = () => {
  return (
    <View>
      <Text>recuperarContrasenia</Text>
      <Link href={"/(home)"} >Ingresar</Link>
    </View>
  );
};

export default recuperarContrasenia;

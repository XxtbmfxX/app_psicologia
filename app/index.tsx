import React from "react";
import LoginForm from "@/components/Formulario/FormInicioSesion";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { Link } from "expo-router";

const Index: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 align-middle justify-center" >
      <StatusBar animated={true} backgroundColor="#60a5fa" />
      <Text>Bienvenido a la APP 😎😎</Text>
      <Link href={"/(auth)"} >
        <Text>Ir a auth</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Index;

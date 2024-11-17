import React from "react";
import LoginForm from "@/components/Formulario/FormInicioSesion";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { Link } from "expo-router";

const Index: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 align-middle justify-center" >
      <StatusBar animated={true} backgroundColor="#60a5fa" />
      <Text className="text-center" >Bienvenido a la APP 😎😎</Text>
      <Link href={"/(auth)"} >
        <Text className="text-center" >Ir al login</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Index;

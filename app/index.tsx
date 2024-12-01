import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { Link } from "expo-router";
/**
 * Componente principal de bienvenida de la aplicación.
 *
 * Este componente muestra un mensaje de bienvenida y un enlace para redirigir al usuario
 * hacia la pantalla de login.
 *
 * @component
 * @returns {JSX.Element} La interfaz de bienvenida con un mensaje y un enlace.
 */

const Index: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 align-middle justify-center">
      <StatusBar animated={true} backgroundColor="#60a5fa" />
      <Text className="text-center">Bienvenido a la APP 😎😎</Text>
      <Link href={"/(auth)"}>
        <Text className="text-center">Ir al login</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Index;

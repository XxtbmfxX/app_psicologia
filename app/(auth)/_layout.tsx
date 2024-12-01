import React from "react";
import { Stack } from "expo-router";

/**
 * Componente que maneja la presentación de la pantalla de login
 * @returns React.JSX.Element
 */
const AuthLayout = () => {
  return <Stack screenOptions={{headerShown: false}} />;
};

export default AuthLayout;

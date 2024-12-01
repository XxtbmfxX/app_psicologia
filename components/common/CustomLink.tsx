import { Text } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";

type Props = {
  //@ts-ignore
  ruta: Href<any>;
  titulo: string;
};
/**
 * Componente de enlace personalizado para navegación en la aplicación.
 *
 * Función principal:
 * - Renderiza un enlace estilizado que redirige a la ruta especificada.
 * - Basado en el componente `Link` de `expo-router`.
 *
 * Dependencias externas:
 * - `Href` y `Link` de `expo-router`: Navegación basada en rutas (https://expo.github.io/router/docs/link).
 *
 * Props:
 * - `ruta`: La ruta a la que redirige el enlace.
 * - `titulo`: El texto que se muestra en el enlace.
 *
 * @component
 * @example
 * <CustomLink ruta="/home" titulo="Volver al inicio" />
 */

const CustomLink = ({ ruta, titulo }: Props) => {
  return (
    <Link href={ruta} className="self-start bg-blue-600 p-5 rounded-lg">
      <Text className="text-lg text-white">{titulo}</Text>
    </Link>
  );
};

export default CustomLink;

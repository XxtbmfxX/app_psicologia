import { View, Text } from "react-native";
import React from "react";
import { Href, Link, LinkProps } from "expo-router";


type Props = {
  //@ts-ignore
  ruta: Href<any>;
  titulo: string;
};

const CustomLink = ({ ruta, titulo }: Props) => {
  return (
    <Link href={ruta} className="self-start bg-blue-600 p-5 rounded-lg">
      <Text className="text-lg text-white" >{titulo}</Text>
    </Link>
  );
};

export default CustomLink;

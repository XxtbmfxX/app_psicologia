import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Cita } from "@/types/types";

type Props = {
  cita: Cita
};

const FilaCita = ({ cita }: Props) => {

  // const date = cita.fechaYHora.toDate();

  return (
    <View className="flex flex-col  justify-around bg-green-500 my-5 p-5  rounded-lg" >

      <Text className="text-white font-bold  mx-5" >{cita.idPaciene}</Text>
      <Text className="text-white font-bold  mx-5" >{cita.nombre}</Text>
      {/* <Text className="text-white font-bold  mx-5" >{date.toLocaleString()}</Text> */}
      <Link href={{
        pathname: '/(home)/citas/[id]',
        params: { id: cita.idPaciene }
      }}>
        <Text className="text-xl text-end" >Editar</Text>
      </Link>
    </View>
  );
};

export default FilaCita;

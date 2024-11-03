import { View, Text, FlatList } from "react-native";
import React from "react";
import FilaCita from "./FilaCita";
import { useCitas } from "@/context/CitasContext";

type Props = {};

const ListaCitas = (props: Props) => {
  const { citas } = useCitas();

  if (citas.length === 0) {
    return <Text>No hay citas (#｀-_ゝ-)</Text>;
  }

  return (
    <View className="flex items-center w-full bg-blue-500 rounded-lg">
      <FlatList
        data={citas}
        renderItem={({ item }) => <FilaCita cita={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListaCitas;

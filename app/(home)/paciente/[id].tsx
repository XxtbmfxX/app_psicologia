import { View, Text, Pressable, Button, StatusBar } from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {};

const Paciente = (props: Props) => {
  const { id } = useLocalSearchParams();

  const grabarAudio = () => {
    console.log("audio grabado");
    router.push("/(home)/paciente/grabarAudio")
  };

  const modificarDatos = () => {
    console.log("Modificar Datos");
  };

  const agregarCita = () => {
    console.log("Agregar Cita");
  };

  const verGrabaciones = () => {
    console.log("Agregar Cita");
    router.push("/(home)/paciente/grabaciones")

  };

  return (
    <SafeAreaView className="flex-1 bg-green-300 ">
      <View className="my-5">
        <Ionicons
          onPress={() => {
            router.back();
          }}
          name="arrow-back-circle"
          size={58}
          color="black"
        />

        <Text className=" text-3xl text-center ">Ficha Paciente</Text>
      </View>

      <View className=" flex justify-evenly items-center h-full  bg-blue-200">
        {/* Datos Paciente */}

        <View className="my-10">
          <Text>Paciente</Text>
          <Text className="self-start">{id}</Text>
          <Text className="self-start">
            Numero de Ficha:
            <Text>1</Text>
          </Text>
          <Text className="self-start">
            Nombre:
            <Text>Juanipto Perez</Text>
          </Text>
          <Text className="self-start">
            Rut:
            <Text>12.123.123-1</Text>
          </Text>
          <Text className="self-start">
            Teléfono:
            <Text>12.123.123-1</Text>
          </Text>
          <Text className="self-start">
            Unidad de Derivación:
            <Text>12.123.123-1</Text>
          </Text>
        </View>

        {/* Botones de redirección  */}

        <View className="flex flex-col w-full justify-between bg-purple-200">
          <Button onPress={grabarAudio} title="Grabar Audio" color="#841584" />
          <Button
            onPress={modificarDatos}
            title="Modificar Datos"
            color="#841584"
          />
          <Button onPress={agregarCita} title="Agregar Cita" color="#841584" />
          <Button onPress={verGrabaciones} title="ver Grabaciones" color="#841584" />
        </View>
      </View>

      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Paciente;

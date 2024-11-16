import React from "react";
import { View, Text, Alert, SafeAreaView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useCitas } from "@/context/CitasContext";
import CustomPressable from "../common/CustomPressable";

const DatosCita = () => {
  const { id } = useLocalSearchParams();
  const { citas, deleteCita, moverCita } = useCitas();

  const cita = citas.find((c) => c.id === id);

  if (!cita) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Cita no encontrada.</Text>
      </View>
    );
  }

  const dateObject = cita.fechaYHora.toDate();
  const formattedDate = dateObject.toLocaleDateString("es-ES");
  const formattedTime = dateObject.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleEliminarCita = async () => {
    if (!cita.id) return;
    await deleteCita(cita.id);
    Alert.alert("Cita eliminada 😊");
    router.replace("/citas");
  };

  // const handleMoverCita = async () => {
  //   if (!cita.id) return;
  //   try {
  //     await moverCita(cita.id); // Agregar a la nueva colección
  //     Alert.alert("Cita hecha 😊");
  //     router.replace("/citas");
  //   } catch (error) {
  //     Alert.alert("Error al mover la cita ☠️");
  //   }
  // };
  if (cita === undefined) {
    return <Text>Cita no encontrada</Text>;
  }
  return (
    <SafeAreaView className="flex-1 w-full">
      <CustomPressable title="Atrás" onPress={() => router.push("/citas")} />
      <CustomPressable
        title="Modificar Cita"
        onPress={() => router.push(`/citas/modificarCita/${cita?.id}`)}
      />
      <CustomPressable title="Eliminar Cita" onPress={handleEliminarCita} />
      <View className="bg-white rounded-lg shadow p-4 mt-4">
        <Text className="text-lg">Fecha: {formattedDate}</Text>
        <Text className="text-lg">Hora: {formattedTime}</Text>
        <Text className="text-lg">Nombre: {cita.nombre}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DatosCita;

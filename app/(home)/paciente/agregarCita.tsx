import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  Fecha: Date;
};

export default function agregarCita() {
  const { control, handleSubmit, setValue } = useForm<FormData>(); // Extraemos setValue

  const onSubmit = (data: FormData) => {
    Alert.alert("Cita Registrada", `Fecha: ${data.Fecha.toLocaleDateString()}`);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text>Aquí hay que ir al formulario de citas</Text>
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import IngresoCita from '@/components/Formulario/IngresoCita';

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
      <IngresoCita setValue={setValue} />
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

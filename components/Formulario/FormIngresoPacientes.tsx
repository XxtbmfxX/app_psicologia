import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, View, Text } from 'react-native';
import { usePacientes } from '@/context/PacienteContext';

type FormData = {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  fechaControl: Date;
};

const FormIngresoPacientes = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const { agregarPaciente } = usePacientes();

  const onSubmit = async (data: FormData) => {
    await agregarPaciente(data);
    reset(); // Limpia el formulario
  };

  return (
    <View className="p-4">
      <Controller
        name="nombre"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nombre"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="apellido"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Apellido"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="rut"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="RUT"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="telefono"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Button title="Agregar Paciente" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FormIngresoPacientes;
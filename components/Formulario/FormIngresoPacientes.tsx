import React from "react";
import { Text, TextInput, Button, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { usePacientes } from "@/context/PacienteContext";

type FormData = {
  nombre: string;
  telefono: string;
  apellido: string;
  rut: string;
};

const StyledButton = styled(Button);

const FormIngresoPacientes = () => {
  const { agregarPaciente } = usePacientes();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    agregarPaciente(data);
    reset();
    Alert.alert("Formulario enviado");
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Controller
        name="nombre"
        control={control}
        rules={{ required: true, minLength: 3 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            placeholder="Nombre"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nombre && (
        <Text className="text-red-500 mb-2">Al menos 3 caracteres.</Text>
      )}

      <Controller
        name="telefono"
        control={control}
        rules={{
          required: "El teléfono es requerido",
          pattern: {
            value: /^[0-9]{9,12}$/,
            message: "El número de teléfono debe tener entre 9 y 12 dígitos",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            placeholder="Teléfono"
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="phone-pad"
            maxLength={12}
            value={value}
          />
        )}
      />
      {errors.telefono && (
        <Text className="text-red-500 mb-2">{errors.telefono.message}</Text>
      )}

      <Controller
        name="apellido"
        control={control}
        rules={{ minLength: 3 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            placeholder="Apellido"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.apellido && (
        <Text className="text-red-500 mb-2">
          El apellido debe tener al menos 3 caracteres.
        </Text>
      )}

      <Controller
        name="rut"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            placeholder="Rut"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <StyledButton
        title="Enviar"
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 text-white w-3/4 p-2"
      />
    </View>
  );
};

export default FormIngresoPacientes;

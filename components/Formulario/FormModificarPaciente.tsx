import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, View, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { usePacientes } from "@/context/PacienteContext"; // Contexto para manejar datos de pacientes
import { useRoute, RouteProp } from "@react-navigation/native"; // Para recibir parámetros dinámicos
import { router } from "expo-router";

type FormData = {
  nombre: string;
  telefono: string;
  apellido: string;
  rut: string;
};



const StyledButton = styled(Button);

const FormModificarPaciente = ({id} : {id: string}) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const {obtenerPacientePorId, actualizarPaciente} = usePacientes();
  const [loading, setLoading] = useState(true);
  console.log(id)

  useEffect(() => {
    const cargarDatosPaciente = async () => {
      if (id) {
        const paciente = await obtenerPacientePorId(id); // Cargar datos del paciente por ID
        console.log(paciente)
        const { nombre, telefono, apellido, rut } = paciente;
        reset({ nombre, telefono, apellido, rut }); // Precargar los datos en el formulario
      }
      setLoading(false);

    };
    cargarDatosPaciente();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (id) {
        await actualizarPaciente(id, data); // Actualizar en Firebase
        Alert.alert("Paciente actualizado exitosamente");
        router.back()
      }
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      Alert.alert("Hubo un problema al actualizar los datos.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            message: "Debe tener entre 9 y 12 dígitos",
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
        title="Guardar Cambios"
        onPress={handleSubmit(onSubmit)}
        className="bg-green-500 text-white w-3/4 p-2"
      />
    </View>
  );
};

export default FormModificarPaciente;

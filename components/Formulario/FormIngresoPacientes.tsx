import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { validateRut } from "@fdograph/rut-utilities";
import { usePacientes } from "@/context/PacienteContext"; // Contexto para manejar datos de pacientes
import { router } from "expo-router";
import CustomPressable from "../common/CustomPressable";

type FormData = {
  nombre: string;
  telefono: string;
  apellido: string;
  rut: string;
};

/**
 *
 *
 * Componente FormIngresoPaciente
 * Descripción:
 * Formulario para ingresar o editar los datos de un paciente, incluyendo su nombre, teléfono, apellido y RUT. Si se proporciona un id, se cargan los datos del paciente para su edición; si no, se trata de la creación de un nuevo paciente.
 *
 * @props id?: (opcional) ID del paciente a editar. Si no se proporciona, se asume que se está creando un nuevo paciente.
 * ## Funcionalidades:
 * - Permite al usuario ingresar o editar los datos del paciente.
 * - Valida que todos los campos sean correctos antes de enviar el formulario.
 * - Si id está presente, actualiza los datos del paciente; si no, crea un nuevo paciente.
 * Muestra un mensaje de éxito al guardar los cambios.
 * ## Estados:
 * - loading: Indica si se están cargando los datos del paciente.
 * @example
 * <FormIngresoPaciente id="123" />
 */

const FormIngresoPaciente = ({ id }: { id?: string | null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { obtenerPacientePorId, actualizarPaciente, agregarPaciente } =
    usePacientes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatosPaciente = async () => {
      if (id) {
        const paciente = await obtenerPacientePorId(id); // Cargar datos del paciente por ID
        const { nombre, telefono, apellido, rut } = paciente;
        reset({ nombre, telefono, apellido, rut }); // Precargar los datos en el formulario
      }
      setLoading(false);
    };
    cargarDatosPaciente();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (id) {
      actualizarPaciente(id, data);
    }
    agregarPaciente(data);
    reset();
    Alert.alert("Formulario enviado ( •̀ .̫ •́ )✧ ");
    id = "";
    router.back();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Campo Nombre */}
      <Controller
        name="nombre"
        control={control}
        rules={{
          required: "El nombre es obligatorio 😅",
          minLength: {
            value: 3,
            message: "Debe tener al menos 3 caracteres 🤔",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            style={{ backgroundColor: "white" }} // Agregar fondo blanco
            placeholder="Nombre"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nombre && (
        <Text className="text-red-500 mb-2">{errors.nombre.message}</Text>
      )}

      {/* Campo Apellido */}
      <Controller
        name="apellido"
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: "El apellido debe tener al menos 3 caracteres 😅",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            style={{ backgroundColor: "white" }} // Agregar fondo blanco
            placeholder="Apellido"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.apellido && (
        <Text className="text-red-500 mb-2">{errors.apellido.message}</Text>
      )}

      {/* Campo Teléfono */}
      <Controller
        name="telefono"
        control={control}
        rules={{
          required: "El teléfono es requerido 📞",
          pattern: {
            value: /^[0-9]{9,12}$/,
            message: "Debe tener entre 9 y 12 dígitos 🔢",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            style={{ backgroundColor: "white" }} // Agregar fondo blanco
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

      {/* Campo Rut */}
      <Controller
        name="rut"
        control={control}
        rules={{
          required: "El RUT es obligatorio 🆔",
          validate: (value) => validateRut(value) || "RUT inválido 😓",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border p-2 mb-4 w-full"
            style={{ backgroundColor: "white" }} // Agregar fondo blanco
            placeholder="RUT"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.rut && (
        <Text className="text-red-500 mb-2">{errors.rut.message}</Text>
      )}

      <CustomPressable
        title="Guardar Cambios"
        onPress={handleSubmit(onSubmit)}
        className=" text-white w-3/4 p-2 bg-blue-700"
      />
    </View>
  );
};

export default FormIngresoPaciente;

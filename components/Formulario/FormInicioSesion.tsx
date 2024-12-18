import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSession } from "@/context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

/**
 *
 * Componente LoginForm
 * # Descripción:
 * Formulario de inicio de sesión. Permite a los usuarios ingresar su correo electrónico y contraseña para autenticarse. El componente maneja el estado de carga y muestra mensajes de error si los datos ingresados no son válidos.
 *
 * ## Funcionalidades:
 * - Permite al usuario ingresar su correo electrónico y contraseña.
 * - Valida que el correo tenga un formato correcto y que la contraseña tenga al menos 6 caracteres.
 * - Muestra un mensaje de error si la autenticación falla.
 * Muestra un indicador de carga mientras se realiza el proceso de inicio de sesión.
 * ## Estados:
 * - loading: Indica si el proceso de inicio de sesión está en curso.
 * - error: Muestra el error de autenticación si lo hay.
 *
 */
const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login, error, loading } = useSession();

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <SafeAreaView className="flex-1 justify-center px-4 bg-white">
      <Text className="text-3xl font-bold text-center mb-6">
        Iniciar Sesión
      </Text>

      {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email es requerido (つ﹏<。)",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Formato de correo no válido",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border-b border-gray-300 py-2 mb-4"
            placeholder="Correo electrónico"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500">{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Contraseña es requerida (；￣Д￣)",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border-b border-gray-300 py-2 mb-4"
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500">{errors.password.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-500 py-3 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-bold">
            Iniciar Sesión
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { router } from 'expo-router';

const FormInicioSesion: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de inicio de sesión (por implementar)
    router.navigate('/(home)');
  };

  const handleForgotPassword = () => {
    // Lógica de recuperación de contraseña (por implementar)
    router.navigate('/recuperarContrasenia');
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-lg font-bold mb-4">Iniciar Sesión</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Usuario"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text
        className="mt-4 text-blue-500"
        onPress={handleForgotPassword}
      >
        ¿Olvidaste tu contraseña?
      </Text>
    </View>
  );
};

export default FormInicioSesion;

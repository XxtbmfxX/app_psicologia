// FilaPaciente.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

type FilaPacienteProps = {
  id: string;
  nombre: string;
};

const FilaPaciente: React.FC<FilaPacienteProps> = ({ id, nombre }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/s${id}`)}>
      <View className="p-4 border-b">
        <Text className="text-lg">{nombre}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilaPaciente;

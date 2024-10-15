import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

type FilaPacienteProps = {
  id: string;
  nombre: string;
};

const FilaPaciente: React.FC<FilaPacienteProps> = ({ id, nombre }) => {


  return (
    <Link href={{
      pathname: "/(home)/paciente/[id]",
      params: {id: id}
    }} >
      <View className="p-4 border-b">
        <Text className="text-lg">{nombre}</Text>
      </View>
    </Link>
  );
};

export default FilaPaciente;

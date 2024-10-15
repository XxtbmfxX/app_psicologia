import { usePacientes } from '@/context/PacienteContext';
import React from 'react';
import { FlatList, View } from 'react-native';
import FilaPaciente from './FilaPaciente';

const ListaPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <FlatList
      data={pacientes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FilaPaciente id={item.id} nombre={item.nombre} />
      )}
    />
  );
};

export default ListaPacientes;

import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Paciente } from '@/types/types';
import { usePacientes } from '@/context/PacienteContext';

type Props = {}

const ListaArchivados = (props: Props) => {
  const { pacientesArchivados } = usePacientes();

  if (pacientesArchivados.length === 0) {
    return <Text>No hay pacientes archivados (#｀-_ゝ-)</Text>
  }

  return (
    <FlatList
      data={pacientesArchivados}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text id={item.id} >Paciente: {item.nombre} </Text>
      )}
    />
  );
}

export default ListaArchivados
import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Paciente } from '@/types/types';
import { usePacientes } from '@/context/PacienteContext';
import FilaArchivado from './FilaArchivado';

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
      className='bg-gray-200 rounded-lg p-5 w-full'
      renderItem={({ item }) => (
        <FilaArchivado id={item.id} nombre={item.nombre} apellido={item.apellido} rut={item.rut} />
      )}
    />
  );
}

export default ListaArchivados
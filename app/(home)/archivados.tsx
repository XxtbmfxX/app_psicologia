import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListaPacientes from '@/components/mostrar/ListaPacientes'

const archivados = () => {
  return (
    <SafeAreaView className="" >
      <Text className="text-2xl text-center my-5 " >Pacientes Archivados</Text>
      <ListaPacientes/>
    </SafeAreaView>
  )
}

export default archivados
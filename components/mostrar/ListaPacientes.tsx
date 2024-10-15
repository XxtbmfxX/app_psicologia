import { View, Text } from 'react-native'
import React from 'react'
import FilaPaciente from './FilaPaciente'

const ListaPacientes = () => {
  return (
    <View className="bg-purple-500 p-5 " >
      <FilaPaciente/>
      <FilaPaciente/>
      <FilaPaciente/>
      <FilaPaciente/>
      <FilaPaciente/>
    </View>
  )
}

export default ListaPacientes
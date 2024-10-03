import { View, Text } from 'react-native'
import React from 'react'
import FilaCita from './FilaCita'

type Props = {}

const ListaCitas = (props: Props) => {
  return (
    <View className="flex items-center w-full bg-purple-500 rounded-lg" >
      <FilaCita/>
      <FilaCita/>
      <FilaCita/>
      <FilaCita/>
    </View>
  )
}

export default ListaCitas
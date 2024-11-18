import { View, Text } from 'react-native'
import React from 'react'
import FormEncrypt from '@/components/testingStuff/FormEncrypt'
import DecryptData from '@/components/testingStuff/DecryptData'

type Props = {}

const testingEncriptado = (props: Props) => {
  return (
    <View className="flex-1 bg-gray-200">
      {/* Comenta uno de los dos para probar cada componente */}
      <FormEncrypt />
      <Text>Esta parte es para desencriptar los datos uwu</Text>
      <DecryptData />
    </View>
  )
}

export default testingEncriptado
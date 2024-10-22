import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormIngresoPacientes from '@/components/Formulario/FormIngresoPacientes'

type Props = {}

const aniadir = (props: Props) => {
  return (
    <SafeAreaView className='flex-1 justify-center p-5 bg-blue-400 ' >
      <FormIngresoPacientes/>
    </SafeAreaView>
  )
}

export default aniadir
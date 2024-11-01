import { View, Text, FlatList } from 'react-native'
import React from 'react'
import FilaCita from './FilaCita'
import { useCitas } from '@/context/CitasContext'

type Props = {}

const ListaCitas = (props: Props) => {
  const { citas } = useCitas();

  // console.log(citas)

  return (
    <View className="flex items-center w-full bg-purple-500 rounded-lg" >

      {citas ?
        <FlatList
          data={citas}
          renderItem={({ item }) => <FilaCita cita={item} />}
          keyExtractor={item => item.idPaciene}
        />
        :
        <Text>No hay citas broh</Text>

      }
    </View>
  )
}

export default ListaCitas
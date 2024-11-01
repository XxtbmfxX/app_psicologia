import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCitas } from '@/context/CitasContext';

type Props = {}

const id = (props: Props) => {
    const {  citas } = useCitas();
    const { id } = useLocalSearchParams();
    const cita = citas.find((c) => c.idPaciene === id);

    return (
        <SafeAreaView>
            <Text>{cita?.idPaciene}</Text>
        </SafeAreaView>
    )
}

export default id
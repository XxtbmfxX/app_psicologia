// PatientsList.tsx
import React from 'react';
import { FlatList, View } from 'react-native';
import { usePatients } from '../context/PatientsContext';
import PatientRow from './PatientRow';

const PatientsList = () => {
  const { patients } = usePatients();

  return (
    <FlatList
      data={patients}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PatientRow id={item.id} nombre={item.nombre} />
      )}
    />
  );
};

export default PatientsList;

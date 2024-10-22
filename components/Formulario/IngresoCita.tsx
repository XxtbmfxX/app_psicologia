// IngresoCita.tsx
import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type IngresoCitaProps = {
  setValue: (name: string, value: any) => void;
};

export default function IngresoCita({ setValue }: IngresoCitaProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue('Fecha', selectedDate); // Usamos setValue para guardar la fecha
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

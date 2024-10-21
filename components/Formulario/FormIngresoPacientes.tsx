import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  Button,
  View,
  Text,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { usePacientes } from "@/context/PacienteContext";

type FormData = {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  fechaControl: Date;
};

const FormIngresoPacientes = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const { agregarPaciente } = usePacientes();
  const [showPicker, setShowPicker] = useState(false); // Controla la visibilidad del picker
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const onSubmit = async (data: FormData) => {
    await agregarPaciente({ ...data, fechaControl: selectedDate! });
    reset(); // Limpia el formulario
  };

  const onChangeDate = (event: any, date?: Date) => {
    setShowPicker(false); // Cierra el picker tras seleccionar
    if (date) setSelectedDate(date); // Actualiza la fecha seleccionada
  };

  return (
    <View className="p-4">
      <Controller
        name="nombre"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nombre"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="apellido"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Apellido"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="rut"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="RUT"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />
      <Controller
        name="telefono"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            className="border p-2 mb-2"
          />
        )}
      />

      {/* Picker para Fecha y Hora */}
      <Pressable
        onPress={() => setShowPicker(true)}
        className="border p-2 mb-2"
      >
        <Text>
          {selectedDate
            ? selectedDate.toLocaleString()
            : "Selecciona fecha y hora"}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChangeDate}
        />
      )}

      <Button title="Agregar Paciente" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default FormIngresoPacientes;

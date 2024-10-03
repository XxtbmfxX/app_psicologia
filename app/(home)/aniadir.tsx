import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgregarPaciente = () => {
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [area, setArea] = useState("");
  const [telefono, setTelefono] = useState("");

  // Maneja el submit del formulario
  const handleSubmit = () => {
    // Validación simple de los campos
    if (!nombre || !rut || !area || !telefono) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    } else {
      // Imprimir los datos en la consola
      console.log({
        nombre,
        rut,
        area,
        telefono,
      });

      setNombre("");
      setRut("");
      setArea("");
      setTelefono("");

      router.push("/(home)/");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
        <Text className="text-2xl mb-10 text-center" >
            Ingresar Nuevo Paciente
        </Text>
      {/* Campo Nombre */}
      <TextInput
        className="border p-2 rounded mb-4"
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Campo RUT */}
      <TextInput
        className="border p-2 rounded mb-4"
        placeholder="RUT"
        value={rut}
        onChangeText={setRut}
      />

      {/* Campo Área */}
      <TextInput
        className="border p-2 rounded mb-4"
        placeholder="Área"
        value={area}
        onChangeText={setArea}
      />

      {/* Campo Teléfono */}
      <TextInput
        className="border p-2 rounded mb-4"
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      {/* Botón para enviar el formulario */}
      <Button title="Ingresar" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default AgregarPaciente;

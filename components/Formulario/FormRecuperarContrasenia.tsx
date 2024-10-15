import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";

type Props = {};

const FormRecuperarContrasenia = (props: Props) => {
  const [correo, setCorreo] = useState("");

  const handleRecuperarContraseña = () => {
    router.navigate("/");
  };

  return (
    <View>
      <Text>Recuperar contraseña</Text>
      <TextInput
        value={correo}
        onChangeText={setCorreo}
        placeholder="micorreo@gmail.com"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <Button title="Iniciar Sesión" onPress={handleRecuperarContraseña} />
      <Link className="mt-4 text-blue-500" href={"/"}>
        Ingresar
      </Link>
    </View>
  );
};

export default FormRecuperarContrasenia;

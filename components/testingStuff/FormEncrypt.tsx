import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const AppContainer = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

import CryptoJS from "crypto-js";

const SECRET_KEY = "mi_clave_secreta_123"; // ¡No expongas esta clave en tu código fuente!

const BcryptComponent: React.FC = () => {
  const [text, setText] = useState("");
  const [cipherText, setcipherText] = useState("");

  // Función para encriptar
  const encryptData = () => {
    const cpText = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      SECRET_KEY
    ).toString();
    console.log(cpText)
    setcipherText(cipherText)
  };

  // Función para desencriptar
  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(originalData)
  };
  return (
    <AppContainer className="flex-1 justify-center items-center bg-gray-100 p-4">
      <StyledText className="text-2xl font-bold mb-4">
        Hash y Verificación
      </StyledText>

      <StyledTextInput
        className="border border-gray-400 rounded-md w-full p-2 mb-4"
        placeholder="Texto a hashear..."
        value={text}
        onChangeText={setText}
      />

      <StyledButton
        className="bg-blue-500 rounded-md p-3 mb-4"
        onPress={encryptData}
      >
        <StyledText className="text-white text-center">Generar Hash</StyledText>
      </StyledButton>

      {cipherText ? (
        <StyledText className="mb-4 break-words">
          Hash generado: {cipherText}
        </StyledText>
      ) : null}

      <StyledButton
        className="bg-green-500 rounded-md p-3 mb-4"
        onPress={decryptData}
      >
        <StyledText className="text-white text-center">
          Verificar Hash
        </StyledText>
      </StyledButton>
    </AppContainer>
  );
};

export default BcryptComponent;

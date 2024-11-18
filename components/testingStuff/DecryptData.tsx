import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

const secretKey = "mySecretKey";

const DecryptData = () => {
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  const getData = async () => {
    const encryptedData = await AsyncStorage.getItem("datosEncriptados");
    if (!encryptedData) {
      Alert.alert("No data found!");
      return;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedData(originalData);
  };

  return (
    <View className="flex-1 justify-center p-4 bg-gray-100">
      <Text className="text-lg font-bold text-center mb-4">Decrypted Data</Text>

      <Button title="Decrypt Data" onPress={getData} />

      {decryptedData && (
        <View className="mt-4 bg-white p-4 rounded-lg">
          <Text className="text-base">Decrypted Info:</Text>
          <Text className="text-gray-700">{decryptedData}</Text>
        </View>
      )}
    </View>
  );
};

export default DecryptData;

import React from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

type FormData = {
  name: string;
  email: string;
};

const secretKey = "mySecretKey";

const FormEncrypt = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const encryptData = (data: FormData) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const saveData = async (data: FormData) => {
    const encryptedData = encryptData(data);
    console.log(data)
    await AsyncStorage.setItem("datosEncriptados", data.toString());
    console.log("Encrypted Data:", encryptedData);
    Alert.alert("Data saved securely!");
    reset();
  };

  return (
    <View className="flex-1 justify-center p-4 bg-gray-100">
      <Text className="text-lg font-bold text-center mb-4">Secure Form</Text>

      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="mb-4">
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="Name"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text className="text-red-500">{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="mb-4">
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text className="text-red-500">{error.message}</Text>}
          </View>
        )}
      />

      <Button title="Save Securely" onPress={handleSubmit(saveData)} />
    </View>
  );
};

export default FormEncrypt;

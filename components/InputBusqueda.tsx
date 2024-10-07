import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const InputBusqueda = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="flex-row items-center bg-gray-200 rounded-2xl px-4 py-2 w-full">
      <Ionicons
        name="search"
        size={20}
        className={`text-gray-500 ${isFocused ? "text-blue-500" : "text-gray-500"}`}
      />
      <TextInput
        className={`flex-1 ml-2 text-base h-12 ${
          isFocused ? "bg-gray-100" : "bg-transparent"
        }`}
        placeholder="Search..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={() => console.log("ok")}
      />
    </View>
  );
};

export default InputBusqueda;

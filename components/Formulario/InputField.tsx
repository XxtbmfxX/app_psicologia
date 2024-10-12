// components/InputField.tsx
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  control: any;
  placeholder: string;
  secureTextEntry?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, control, placeholder, secureTextEntry, error }) => (
  <View className="w-full mb-4">
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          className="border p-3 rounded-lg"
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
        />
      )}
    />
    {error && <Text className="text-red-500 mt-1">{error}</Text>}
  </View>
);

export default InputField;

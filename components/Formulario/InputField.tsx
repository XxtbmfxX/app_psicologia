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

/**
 * 
* Componente InputField
* ## Descripción:
* Componente reutilizable para un campo de entrada en formularios.
* Permite personalizar la entrada con un placeholder, 
* un valor seguro para contraseñas y manejo de errores.
* 
* @params 
* - name: Nombre del campo que se utilizará en el formulario.
* - control: Controlador de react-hook-form para manejar el valor del campo.
* - placeholder: Texto que se muestra cuando el campo está vacío.
* - secureTextEntry?: (opcional) Si se establece a true, el campo se utilizará para contraseñas (oculta el texto).
* - error?: (opcional) Mensaje de error a mostrar debajo del campo si hay un error de validación.
* @example
* <InputField
*   name="email"
*   control={control}
*   placeholder="Correo electrónico"
*   error={errors.email?.message}
* />
 */

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

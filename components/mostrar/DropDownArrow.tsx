import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface DropdownArrowProps {
  title: string;
  children: React.ReactNode;
}
/**
 * Componente que representa un dropdown con un título y contenido plegable.
 * Muestra una flecha que indica si el dropdown está abierto o cerrado.
 *
 * @param {DropdownArrowProps} props - Propiedades del componente.
 * @param {string} props.title - Título que aparece en el encabezado del dropdown.
 * @param {React.ReactNode} props.children - Contenido que se mostrará al abrir el dropdown.
 * 
 * @returns {JSX.Element} - Un componente que muestra un dropdown animado.
 *
 * @example
 * <DropdownArrow title="Opciones">
 *   <Text>Contenido desplegado</Text>
 * </DropdownArrow>
 */
const DropdownArrow: React.FC<DropdownArrowProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);

    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const arrowRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View className="bg-white border rounded-lg shadow p-4 mb-2">
      {/* Título y flecha */}
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={toggleDropdown}
      >
        <Text className="text-lg font-bold">{title}</Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <Entypo name="arrow-with-circle-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      {/* Contenido desplegable */}
      <Animated.View className={isOpen ? " transition h-auto" : "h-0"}>
        <View className="mt-2">{children}</View>
      </Animated.View>
    </View>
  );
};

export default DropdownArrow;

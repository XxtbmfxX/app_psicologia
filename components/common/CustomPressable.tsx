import React, { useRef } from "react";
import { Pressable, Text, Animated, PressableProps } from "react-native";

// Creamos el componente `AnimatedPressable` usando NativeWind
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface BotonProps extends PressableProps {
  onPress: () => void;
  title: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
}

const CustomPressable: React.FC<BotonProps> = ({
  onPress,
  title,
  bgColor = "bg-blue-500",
  textColor = "text-white",
  fontSize = "text-lg",
  ...rest
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animación de escala al presionar
  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{ transform: [{ scale: scaleAnim }] }]}
      className={`px-6 py-3 rounded-lg shadow-md active:opacity-80 ${bgColor} my-5`}
      {...rest} // Props adicionales para controlarlo desde otros componentes
    >
      <Text className={`text-center font-semibold ${textColor} ${fontSize}`}>
        {title}
      </Text>
    </AnimatedPressable>
  );
};

export default CustomPressable;

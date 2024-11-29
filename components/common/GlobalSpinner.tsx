import { useSpeechToText } from "@/context/SpeechToTextContext";
import { ActivityIndicator } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const GlobalSpinner = () => {
    const { cargando } = useSpeechToText();
    return (
      cargando && (
        <View className="absolute inset-0 bg-gray-800 bg-opacity-50 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )
    );
  };
  
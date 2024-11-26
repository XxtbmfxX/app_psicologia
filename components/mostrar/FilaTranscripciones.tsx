import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { useAudioContext } from "@/context/AudioContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useSpeechToText } from "@/context/SpeechToTextContext";
import { router } from "expo-router";
import DropDownArrow from "./DropDownArrow";
import { Transcripcion } from "@/types/types";

type Props = {
  transcripcion: Transcripcion;
};

const FilaTranscripciones = ({ transcripcion }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  //   Hay que hacer un firltro para mostrar las transcripciones de cada transcripcion

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <DropDownArrow title={transcripcion.titulo}>
        <Text className="my2">{transcripcion.contenido}</Text>
      </DropDownArrow>
    </View>
  );
};

export default FilaTranscripciones;

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSpeechToText } from "@/context/SpeechToTextContext";
import DropDownArrow from "./DropDownArrow";
import { Transcripcion } from "@/types/types";

type Props = {
  transcripcion: Transcripcion;
};

const FilaTranscripciones = ({ transcripcion }: Props) => {
  const { eliminarTranscripcion } = useSpeechToText();

  const handleEliminar = () => {
    eliminarTranscripcion(transcripcion.id);
  };

  const getColorByStatus = (status: string) => {
    switch (status) {
      case "queued":
        return "text-yellow-500";
      case "processing":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <DropDownArrow title={transcripcion.resource_url  }>
        <Text className={`my-2 ${getColorByStatus(transcripcion.status)}`}>
          Estado: {transcripcion.status} 
        </Text>
        {transcripcion.text && (
          <Text className="my-2 text-gray-800">
            Texto: {transcripcion.status}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleEliminar}
          className="mt-3 px-3 py-2 bg-red-500 rounded-md"
        >
          <Text className="text-white text-center">Eliminar</Text>
        </TouchableOpacity>
      </DropDownArrow>
    </View>
  );
};

export default FilaTranscripciones;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useSpeechToText } from "@/context/SpeechToTextContext";
import DropDownArrow from "./DropDownArrow";
import { Transcripcion } from "@/types/types";
import CustomPressable from "../common/CustomPressable";

type Props = {
  transcripcion: Transcripcion;
};

const FilaTranscripciones = ({ transcripcion }: Props) => {
  const { eliminarTranscripcion, obtenerTranscripcionAPI } = useSpeechToText();

  const [texto, setTexto] = useState<string | null>(null);
  const [cargandoTexto, setCargandoTexto] = useState(false);

  const handleEliminar = async () => {
    try {
      Alert.alert("Eliminar transcripción", "¿Estás seguro?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => await eliminarTranscripcion(transcripcion.id),
        },
      ]);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
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

  const handleGetTranscripcion = async () => {
    setCargandoTexto(true);
    const textoObtenido = await obtenerTranscripcionAPI(transcripcion.id);
    setTexto(textoObtenido);
    setCargandoTexto(false);
  };

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <DropDownArrow title={transcripcion.created || ""}>
        <Text className={`my-2 ${getColorByStatus(transcripcion.status)}`}>
          Estado: {transcripcion.status}
        </Text>
        <CustomPressable
          title="Traer Transcripción"
          onPress={handleGetTranscripcion}
        />
        {texto ? (
          <Text className="my-2 text-gray-800">{texto}</Text>
        ) : (
          <TouchableOpacity
            onPress={handleGetTranscripcion}
            disabled={cargandoTexto}
            className={`mt-3 px-3 py-2 ${
              cargandoTexto ? "bg-gray-400" : "bg-blue-500"
            } rounded-md`}
          >
            <Text className="text-white text-center">
              {cargandoTexto ? "Cargando..." : "Obtener Transcripción"}
            </Text>
          </TouchableOpacity>
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

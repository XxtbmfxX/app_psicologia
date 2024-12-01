import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useSpeechToText } from "@/context/SpeechToTextContext";
import DropDownArrow from "./DropDownArrow";
import { Transcripcion } from "@/types/types";

type Props = {
  transcripcion: Transcripcion;
};

/**
* # FilaTranscripciones
* ## Descripción:
* Este componente muestra la información de una transcripción de audio. Permite visualizar el estado de la transcripción y obtener el texto si está disponible. También incluye la opción de eliminar la transcripción.
* 
* ## Propiedades:
* - transcripcion: Objeto de tipo Transcripcion que contiene los datos de la transcripción.
* 
* ## Lógica:
* 
* Se usa el hook useSpeechToText para interactuar con la API de transcripción (obtener y eliminar transcripciones).
* Muestra el estado de la transcripción (por ejemplo, "queued", "processing", "completed").
* El texto de la transcripción se obtiene al presionar un botón que activa la función obtenerTranscripcionAPI.
* 
* ## Funciones:
* 
* handleEliminar: Elimina la transcripción después de mostrar una alerta de confirmación.
* handleGetTranscripcion: Obtiene el texto de la transcripción desde la API.
* getColorByStatus: Retorna un color según el estado de la transcripción.

 */

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

  const date = new Date(transcripcion.created || ""); // Convierte el string ISO en un objeto Date

  const day = date.getDate().toString().padStart(2, "0"); // Día (con cero inicial)
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes (ajustando porque getMonth() devuelve de 0 a 11)
  const year = date.getFullYear(); // Año completo
  const hours = date.getHours().toString().padStart(2, "0"); // Hora (con cero inicial)
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Minutos (con cero inicial)
  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <DropDownArrow title={formattedDate || ""}>
        <Text className={`my-2 ${getColorByStatus(transcripcion.status)}`}>
          Estado: {transcripcion.status}
        </Text>

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

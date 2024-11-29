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

type Props = {
  audio: { uri: string; name: string };
};

const FilaAudio = ({ audio }: Props) => {
  const { subirAudio, cargando, error } = useSpeechToText();

  const { deleteAudio } = useAudioContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el indicador

  // Reproducir audio
  const playAudio = async () => {
    try {
      setIsLoading(true); // Iniciar el indicador
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audio.uri,
        });
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);

        // Escuchar cuando termina
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            resetAudio();
          }
        });
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error al reproducir audio:", error);
    } finally {
      setIsLoading(false); // Detener el indicador
    }
  };

  // Pausar audio
  const pauseAudio = async () => {
    try {
      setIsLoading(true); // Iniciar el indicador
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error al pausar audio:", error);
    } finally {
      setIsLoading(false); // Detener el indicador
    }
  };

  // Reiniciar desde el inicio
  const resetAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error al reiniciar audio:", error);
    }
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    Alert.alert(
      "Eliminar Audio",
      `¿Deseas eliminar el audio "${audio.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => deleteAudio(audio.uri) },
      ]
    );
  };

  const handleTranscribe = async () => {
    try {
      Alert.alert(
        "Transcripción",
        `¿Desea transcribir el audio "${audio.name}"?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: cargando ? "Procesando..." : "Transcribir",
            onPress: async () => {
              try {
                await subirAudio(audio.uri);
                router.push("/(home)/paciente/transcripciones")
              } catch (e) {
                Alert.alert("Error", error || "Algo salió mal.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error al transcribir:", error);
      Alert.alert(
        "Error",
        "Hubo un problema al intentar transcribir el archivo."
      );
    }
  };

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <Text className="my2">{audio.name}</Text>

      <View className="flex-row justify-between items-center mt-3">
        {/* Botón de reproducir/pausar con indicador */}
        {isLoading ? (
          <ActivityIndicator size="large" color="green" />
        ) : isPlaying ? (
          <TouchableOpacity onPress={pauseAudio}>
            <MaterialIcons
              name="pause-circle-outline"
              size={40}
              color="green"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playAudio}>
            <MaterialIcons name="play-circle-outline" size={40} color="green" />
          </TouchableOpacity>
        )}

        {/* Botón de reiniciar */}
        <TouchableOpacity onPress={resetAudio}>
          <MaterialIcons name="replay" size={40} color="blue" />
        </TouchableOpacity>

        {/* Botón de eliminar */}
        <TouchableOpacity onPress={confirmDelete}>
          <MaterialIcons name="delete" size={40} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTranscribe}>
          <MaterialIcons name="translate" size={40} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilaAudio;

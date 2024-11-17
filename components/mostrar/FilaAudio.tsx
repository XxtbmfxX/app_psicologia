import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { Audio } from "expo-av";
import { useAudioContext } from "@/context/AudioContext";

type Props = {
  audio: { uri: string; name: string };
};

const FilaAudio = ({ audio }: Props) => {
  const { deleteAudio } = useAudioContext();

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audio.uri });
      await sound.playAsync();
    } catch (error) {
      console.error("Error al reproducir audio:", error);
    }
  };

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

  return (
    <View className="my-5 p-4 rounded-lg border-2">
      <Text className="my2">{audio.name}</Text>
      <Button title="Reproducir" onPress={playAudio} />
      <Button title="Eliminar" color="red" onPress={confirmDelete} />
    </View>
  );
};

export default FilaAudio;

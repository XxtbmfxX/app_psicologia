import React, { useState } from "react";
import { Button, View } from "react-native";
import { Audio } from "expo-av";
import { useAudioContext } from "@/context/AudioContext";

const GrabarAudio = ({ nombrePaciente = "pedro" }: { nombrePaciente?: string }) => {
  const { addAudio } = useAudioContext();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error("Error al iniciar grabación:", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const date = new Date().toLocaleDateString("es-CL").replace(/\//g, "_");
      const name = `${nombrePaciente}_${date}`;

      if (uri) await addAudio(name, uri);
      setRecording(null);
    } catch (error) {
      console.error("Error al detener grabación:", error);
    }
  };

  return (
    <View className="p-5">
      <Button
        title={recording ? "Detener Grabación" : "Iniciar Grabación"}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

export default GrabarAudio;

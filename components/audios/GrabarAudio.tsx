import React, { useState } from "react";
import { Button, View } from "react-native";
import { Audio } from "expo-av";
import { useAudioContext } from "@/context/AudioContext";
/**
 * Componente para grabar audio con Expo Audio.
 *
 * Función principal:
 * - Permite iniciar y detener grabaciones de audio.
 * - Guarda las grabaciones usando un contexto de audio (`AudioContext`).
 * - Asigna un nombre a las grabaciones basado en el nombre del paciente y la fecha actual.
 *
 * Dependencias externas:
 * - `Audio` de `expo-av`: Manejo de grabaciones de audio (https://docs.expo.dev/versions/latest/sdk/audio/).
 * - `useAudioContext`: Contexto para gestionar y almacenar audios en la aplicación (ver documentación del contexto).
 *
 * Props:
 * - `nombrePaciente` (opcional): Nombre del paciente asociado con la grabación. Por defecto, `"pedro"`.
 *
 * @component
 */

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

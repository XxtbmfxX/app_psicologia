import React, { useState, useEffect } from "react";
import { View, Button, Alert, FlatList, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const grabarAudio = (props: Props) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [localFilePath, setLocalFilePath] = useState<string | null>(null);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const createDirectory = async (folderName: string) => {
    try {
      const directoryUri = FileSystem.documentDirectory + folderName;

      const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        console.log(`Carpeta creada en: ${directoryUri}`);
      } else {
        console.log(`La carpeta ya existe en: ${directoryUri}`);
      }

      return directoryUri;
    } catch (error) {
      console.error("Error al crear el directorio:", error);
    }
  };

  const saveRecordingToDirectory = async (uri: string) => {
    try {
      const folderName = "AppPSAudio";
      const directoryUri = await createDirectory(folderName);

      const fileName = `audio_${Date.now()}.m4a`;
      const localPath = directoryUri + "/" + fileName;

      await FileSystem.copyAsync({
        from: uri,
        to: localPath,
      });

      console.log("Audio guardado localmente en:", localPath);
      setLocalFilePath(localPath);

      setAudioFiles((prevFiles) => [...prevFiles, localPath]);

      await AsyncStorage.setItem("audioFiles", JSON.stringify([...audioFiles, localPath]));
    } catch (error) {
      console.error("Error al guardar el archivo de audio:", error);
    }
  };

  const loadAudioFiles = async () => {
    try {
      const savedFiles = await AsyncStorage.getItem("audioFiles");
      if (savedFiles) {
        setAudioFiles(JSON.parse(savedFiles));
      }
    } catch (error) {
      console.error("Error al cargar los archivos de audio:", error);
    }
  };

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Solicitando Permisos..");
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Inicio de Grabación..");

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      console.log("Grabación Iniciada");
    } catch (err) {
      console.error("Error al Iniciar Grabación", err);
    }
  }

  async function stopRecording() {
    console.log("Grabación Detenida...");

    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      console.log("Grabación Detenida y Almacenada a", uri);

      if (uri) {
        saveRecordingToDirectory(uri);
      }
      setRecording(undefined);
    }
  }

  async function playAudio(localFilePath: string) {
    const { sound } = await Audio.Sound.createAsync({ uri: localFilePath });
    await sound.playAsync();
  }

  // Función de eliminación con confirmación
  const deleteAudio = async (filePath: string) => {
    // Mostrar el cuadro de confirmación
    Alert.alert(
      "Eliminar Audio",
      "¿Estás seguro de que quieres eliminar este audio?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Eliminación cancelada"),
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              await FileSystem.deleteAsync(filePath);
              console.log("Audio Eliminado De:", filePath);

              const updatedFiles = audioFiles.filter((file) => file !== filePath);
              setAudioFiles(updatedFiles);

              await AsyncStorage.setItem("audioFiles", JSON.stringify(updatedFiles));
            } catch (error) {
              console.error("Error al eliminar el archivo de audio:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        title={`Play Audio ${item.split('/').pop()}`}
        onPress={() => {
          playAudio(item).catch((err) => {
            Alert.alert("Error", "No se puede reproducir audio: " + err.message);
          });
        }}
      />
      <TouchableOpacity onPress={() => deleteAudio(item)}>
        <View style={{ backgroundColor: 'red', padding: 10, marginLeft: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Eliminar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    loadAudioFiles();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={recording ? "Detener Grabación" : "Iniciar Grabación"}
        onPress={recording ? stopRecording : startRecording}
      />

      {audioFiles.length > 0 && (
        <FlatList
          data={audioFiles}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default grabarAudio;

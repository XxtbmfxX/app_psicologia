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

  // Función para crear una carpeta en el almacenamiento local
  const createDirectory = async (folderName: string) => {
    try {
      const directoryUri = FileSystem.documentDirectory + folderName;

      // Verificar si el directorio ya existe
      const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
      if (!directoryInfo.exists) {
        // Si no existe, crear el directorio
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

  // Función para guardar el archivo grabado en la carpeta
  const saveRecordingToDirectory = async (uri: string) => {
    try {
      // Crear el directorio si no existe
      const folderName = "AppPSAudio"; // Carpeta personalizada
      const directoryUri = await createDirectory(folderName);

      // Definir el nombre del archivo (puedes agregar una marca de tiempo o algo único)
      const fileName = `audio_${Date.now()}.m4a`;
      const localPath = directoryUri + "/" + fileName;

      // Copiar el archivo grabado al nuevo directorio
      await FileSystem.copyAsync({
        from: uri,
        to: localPath,
      });

      console.log("Audio guardado localmente en:", localPath);
      setLocalFilePath(localPath);

      // Agregar el nuevo archivo a la lista de archivos
      setAudioFiles((prevFiles) => [...prevFiles, localPath]);

      // Guardar la lista de archivos en AsyncStorage
      await AsyncStorage.setItem("audioFiles", JSON.stringify([...audioFiles, localPath]));
    } catch (error) {
      console.error("Error al guardar el archivo de audio:", error);
    }
  };

  // Cargar archivos grabados desde AsyncStorage al iniciar la app
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

  // Función para comenzar la grabación
  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // Función para detener la grabación y guardar el archivo de audio localmente
  async function stopRecording() {
    console.log("Stopping recording...");

    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);

      // Guardar el archivo en el directorio local
      if (uri) {
        saveRecordingToDirectory(uri);
      }
      setRecording(undefined); // Limpiar el estado de la grabación
    }
  }

  // Función para reproducir el archivo de audio guardado
  async function playAudio(localFilePath: string) {
    const { sound } = await Audio.Sound.createAsync({ uri: localFilePath });
    await sound.playAsync();
  }

  // Función para eliminar un archivo
  const deleteAudio = async (filePath: string) => {
    try {
      // Eliminar archivo del sistema de archivos
      await FileSystem.deleteAsync(filePath);
      console.log("Audio eliminado de:", filePath);

      // Eliminar el archivo de la lista de archivos
      const updatedFiles = audioFiles.filter((file) => file !== filePath);
      setAudioFiles(updatedFiles);

      // Guardar la lista actualizada en AsyncStorage
      await AsyncStorage.setItem("audioFiles", JSON.stringify(updatedFiles));
    } catch (error) {
      console.error("Error al eliminar el archivo de audio:", error);
    }
  };

  // Renderizar cada archivo de audio en la lista
  const renderItem = ({ item }: { item: string }) => (
    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        title={`Play Audio ${item.split('/').pop()}`}
        onPress={() => {
          playAudio(item).catch((err) => {
            Alert.alert("Error", "Unable to play audio: " + err.message);
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

  // Cargar archivos cuando se monta el componente
  useEffect(() => {
    loadAudioFiles();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />

      {audioFiles.length > 0 && (
        <FlatList
          data={audioFiles}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index} // Asegura que cada item sea único
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default grabarAudio;

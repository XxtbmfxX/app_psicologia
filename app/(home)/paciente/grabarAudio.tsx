import React, { useState } from "react";
import { View, Button, Alert, FlatList } from "react-native";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";  // Adjust path as necessary

type Props = {};

const grabarAudio = (props: Props) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  const [localFilePath, setLocalFilePath] = useState<string | null>(null);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  // Start recording
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

  // Stop recording and save the audio file locally
  async function stopRecording() {
    console.log("Stopping recording...");

    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);

      // Save the file locally
      if (uri) {
        try {
          // Define the local path where you want to store the file
          const fileName = `audio_${Date.now()}.m4a`;
          const localPath = FileSystem.documentDirectory + fileName;

          // Copy the recorded file to the new location
          await FileSystem.copyAsync({
            from: uri,
            to: localPath,
          });

          console.log("Audio saved locally at", localPath);
          setLocalFilePath(localPath);

          // Add the new audio file to the list of audio files
          setAudioFiles((prevFiles) => [...prevFiles, localPath]);

          // Now upload the file to Firebase Storage
          uploadAudioToFirebase(localPath);

          // Reset recording state
          setRecording(undefined);
        } catch (error) {
          console.error("Failed to save audio file locally", error);
        }
      }
    }
  }

  // Upload the audio file to Firebase Storage
  async function uploadAudioToFirebase(localFilePath: string) {
    try {
      // Create a reference to the file location in Firebase Storage
      const audioRef = ref(storage, `audios/${Date.now()}.m4a`);

      // Fetch the file as a blob from the local file system
      const response = await fetch(localFilePath);
      const blob = await response.blob();  // Create blob from the response

      // Upload the file to Firebase Storage
      await uploadBytes(audioRef, blob);
      console.log("Audio uploaded to Firebase Storage");

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(audioRef);
      console.log("Download URL:", downloadURL);

      // Optionally, you can store the download URL in Firestore or use it elsewhere in the app
    } catch (error) {
      console.error("Failed to upload audio to Firebase", error);
    }
  }

  // Play the saved audio file
  async function playAudio(localFilePath: string) {
    const { sound } = await Audio.Sound.createAsync(
      { uri: localFilePath }
    );
    await sound.playAsync();
  }

  // Render each audio file in the list
  const renderItem = ({ item }: { item: string }) => (
    <View style={{ padding: 10 }}>
      <Button
        title={`Play Audio ${item.split('/').pop()}`}
        onPress={() => {
          playAudio(item).catch((err) => {
            Alert.alert("Error", "Unable to play audio: " + err.message);
          });
        }}
      />
    </View>
  );

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
          keyExtractor={(item, index) => item + index} // Ensure each item is unique
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default grabarAudio;
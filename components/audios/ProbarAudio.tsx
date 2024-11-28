import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";



const API_KEY = process.env.EXPO_PUBLIC_API_KEY || "";


const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: API_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

const SpeechRecognitionApp: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcript, setTranscript] = useState("");
  const [transcriptData, setTranscriptData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Microphone access is needed to record audio."
        );
        return;
      }
      const newRecording = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording.recording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert("Error", "Failed to start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
        setIsRecording(false);
      }
    } catch {
      Alert.alert("Error", "Failed to stop recording.");
    }
  };

  useEffect(() => {
    if (audioUri) {
      const uploadAudio = async () => {
        try {
          const audioData = {
            uri: audioUri,
            type: "audio/mpeg",
            name: "audio.mp3",
          };
          const formData = new FormData();
          formData.append("file", audioData as any);
          const response = await assembly.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setUploadURL(response.data.upload_url);
        } catch {}
      };
      uploadAudio();
    }
  }, [audioUri]);

  const submitTranscriptionHandler = async () => {
    if (!uploadURL) {
      Alert.alert("No Audio", "Please record and upload audio first.");
      return;
    }
    try {
      const response = await assembly.post("/transcript", {
        audio_url: uploadURL,
      });
      setTranscriptID(response.data.id);
      checkStatusHandler(response.data.id);
    } catch {}
  };

  const checkStatusHandler = async (id: string) => {
    setIsLoading(true);
    const interval = setInterval(async () => {
      try {
        const response = await assembly.get(`/transcript/${id}`);
        setTranscriptData(response.data);
        if (response.data.status === "completed") {
          setTranscript(response.data.text);
          setIsLoading(false);
          clearInterval(interval);
        }
      } catch {}
    }, 1000);
  };

  return (
    <View className="justify-center items-center bg-gray-100">
      <Text className="text-lg font-bold mb-4">Speech Recognition App 🎤</Text>
      <View className="flex-row space-x-4">
        <Button
          title="Start Recording"
          onPress={startRecording}
          disabled={isRecording}
        />
        <Button
          title="Stop Recording"
          onPress={stopRecording}
          disabled={!isRecording}
        />
        <Button
          title="Submit Transcription"
          onPress={submitTranscriptionHandler}
        />
      </View>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" className="mt-4" />
      )}
      {transcript ? (
        <Text className="text-center mt-4 text-gray-800">
          Transcript: {transcript}
        </Text>
      ) : (
        transcriptData?.status && (
          <Text className="text-center mt-4 text-gray-600">
            Status: {transcriptData.status}
          </Text>
        )
      )}
    </View>
  );
};

export default SpeechRecognitionApp;

import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const grabaciones = (props: Props) => {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/audio/rahhh.mp3")
    );
    setSound(sound);
    
    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function stopSound() {
    
    sound.stopAsync()

    console.log("Sound Stoped");
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView className="flex justify-center">
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
    </SafeAreaView>
  );
};

export default grabaciones;

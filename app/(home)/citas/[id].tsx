import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DatosCita from "@/components/mostrar/DatosCita";

const id = () => {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <DatosCita />
    </SafeAreaView>
  );
};

export default id;

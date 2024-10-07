import { SafeAreaView, View } from "react-native";
import React, { Component } from "react";
import FormInicioSesion from "@/components/Formulario/FormInicioSesion";

export class index extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 justify-center bg-white">
        <FormInicioSesion />
      </SafeAreaView>
    );
  }
}

export default index;

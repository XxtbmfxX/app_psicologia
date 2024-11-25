import { StatusBar, View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ListaPacientes from "@/components/mostrar/ListaPacientes";
import InputBusqueda from "@/components/InputBusqueda";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center p-2 bg-blue-400">
      <StatusBar animated={true} backgroundColor="#60a5fa" />

      <View className="flex flex-row justify-around align-middle w-full my-2">
        <Link href={"/(home)/paciente/transcripciones"}>
          <Text className="text-lg ">Ir a las transcripciones</Text>
        </Link>
        <Link href={"/profile"}>
          <FontAwesome5 name="user-circle" size={44} color="black" />
        </Link>
      </View>
      <Text className="text-2xl text-center my-5 ">Lista de Pacientes</Text>

      <View className="w-full">
        <InputBusqueda />
      </View>
      <ListaPacientes />
    </SafeAreaView>
  );
}

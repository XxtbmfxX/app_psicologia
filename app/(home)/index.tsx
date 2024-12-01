import { StatusBar, View, Text } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ListaPacientes from "@/components/mostrar/ListaPacientes";
import InputBusqueda from "@/components/InputBusqueda";
import AntDesign from "@expo/vector-icons/AntDesign";
/**
 * Componente que presenta la pantalla principal de la aplicación
 * @returns React.JSX.Element
 */
export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center p-2 bg-blue-400">
      <StatusBar animated={true} backgroundColor="#60a5fa" />

      <View className="flex flex-row justify-between items-center w-full my-2 px-3 ">
        <Link href={"/(home)/paciente/transcripciones"}>
          <AntDesign name="filetext1" size={34} color="black" />
        </Link>
        <Link href={"/profile"}>
          <FontAwesome5 name="user-circle" size={44} color="black" />
        </Link>
      </View>
      <Text className="text-2xl text-center my-2 mb-5 ">Lista de Pacientes</Text>

      <View className="w-full mb-5">
        <InputBusqueda />
      </View>
      <ListaPacientes />
    </SafeAreaView>
  );
}

import { View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ListaPacientes from "@/components/mostrar/ListaPacientes";
import InputBusqueda from "@/components/InputBusqueda";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-blue-400">
      <View className=" self-end mb-10">
        <Link href={"/profile"}>
          <FontAwesome5 name="user-circle" size={44} color="black" />
        </Link>
      </View>
      <View className="p-2">
        <InputBusqueda />
        <ListaPacientes />
      </View>
    </SafeAreaView>
  );
}

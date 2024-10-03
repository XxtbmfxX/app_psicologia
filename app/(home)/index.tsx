import { Text, View } from "react-native";
import { useSession } from "@/context/AuthContext";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import ListaPacientes from "@/components/mostrar/ListaPacientes";
import InputBusqueda from "@/components/InputBusqueda";

export default function Index() {
  // const { signOut } = useSession();
  return (
    <SafeAreaView className="h-full bg-blue-400 ">
      <View className=" self-end mb-10  bg-red-50   ">
        <Link href={"/profile"}>
          {" "}
          <FontAwesome5 name="user-circle" size={44} color="black" />
        </Link>
      </View>
      <InputBusqueda />
      <ListaPacientes />
    </SafeAreaView>
  );
}

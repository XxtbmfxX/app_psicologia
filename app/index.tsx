// import { useSession } from "@/context/AuthContext";
import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  // const { signIn } = useSession();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar barStyle={"dark-content"} />
      <Text className={"text-xl my-10 focus-within:text-blue-500 "}>Bienvenidos 🧐</Text>
      <Link className="text-xl hover:text-blue-500 " href={"/(auth)"}>
        Iniciar sesión{" "}
      </Link>
    </View>
  );
}

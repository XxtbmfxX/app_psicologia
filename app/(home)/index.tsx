import { Text, View } from "react-native";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View className=" flex align-middle justify-center h-full bg-blue-400 ">
      <Text
        className="text-white font-bold text-xl "
        onPress={() => {
          console.log("oliwis")
          router.push("/(auth)")
        }
        }
      >
        Sign Out
      </Text>
    </View>
  );
}

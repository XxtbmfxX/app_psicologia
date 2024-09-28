import { Text } from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";

import { useSession } from "@/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeLayout() {
  const { session, isLoading } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sing-in" />;
  }

  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="citas"
          options={{
            title: "Citas",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="archivados"
          options={{
            title: "Archivados",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="archive" color={color} />
            ),
          }}
        />
      </Tabs>
  );
}

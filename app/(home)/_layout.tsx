import { Text } from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#125488", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pacientes",
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
            <FontAwesome size={28} name="book" color={color} />
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
      <Tabs.Screen
        name="aniadir"
        options={{
          title: "Añadir",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-add-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="paciente/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="paciente/grabaciones"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="paciente/grabarAudio"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="paciente/modificarPaciente"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="paciente/transcipciones"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

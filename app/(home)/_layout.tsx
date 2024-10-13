import { Text } from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
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

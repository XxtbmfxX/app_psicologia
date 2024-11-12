import { Text } from "react-native";
import { Redirect, router, Stack, Tabs } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import { useEffect, useState } from "react";

export default function HomeLayout() {
  const { user, loading } = useSession();
  
  useEffect(() => {
    // Solo redirige cuando `loading` es falso y el usuario no está autenticado
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/" />; // También se puede usar un <Redirect /> si lo prefieres
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
        name="citas/index"
        options={{
          title: "Citas",
          tabBarIcon: ({ color }) => (
            <Fontisto name="date" size={24} color={color} />
          ),
        }}
      />

      {/* IGNORAR CITAS */}
      <Tabs.Screen
        name="citas/aniadirCita"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="citas/modificarCita/[idCita]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="citas/[id]"
        options={{
          href: null,
        }}
      />

      {/* IGNORAR PERFIL */}

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
      {/* IGNORAR PACIENTES */}
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

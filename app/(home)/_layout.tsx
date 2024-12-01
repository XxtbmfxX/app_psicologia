import { Text } from "react-native";
import { Redirect, router, Stack, Tabs } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useEffect, useState } from "react";
import { AudioProvider } from "@/context/AudioContext";
import { PacientesProvider } from "@/context/PacienteContext";
import { CitasProvider } from "@/context/CitasContext";
import { SpeechToTextProvider } from "@/context/SpeechToTextContext";


/**
 * Componente que contiene los providers necesarios para el funcionamiento de la aplicación
 * además de estructurar las rutas usando Tabs
 * @returns React.JSX.Element
 */
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

  const listaDeIgnorados = [
    "citas/aniadirCita",
    "citas/modificarCita/[idCita]",
    "citas/[id]",
    "profile",
    "paciente/[id]",
    "paciente/modificarPaciente/[idPaciente]",
    "paciente/grabaciones/[nombrePaciente]",
    "paciente/transcripciones/index",
    "paciente/transcripciones/[nombrePaciente]",
  ];

  return (
    <AudioProvider>
      <PacientesProvider>
        <CitasProvider>
          <SpeechToTextProvider>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: "#125488",
                headerShown: false,
              }}
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

              {listaDeIgnorados.map((ruta) => (
                <Tabs.Screen
                  name={ruta}
                  options={{
                    href: null,
                  }}
                  key={ruta}
                />
              ))}
            </Tabs>
          </SpeechToTextProvider>
        </CitasProvider>
      </PacientesProvider>
    </AudioProvider>
  );
}

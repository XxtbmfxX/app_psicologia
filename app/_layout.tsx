import { SessionProvider } from "@/context/AuthContext";
import { CitasProvider } from "@/context/CitasContext";
import { PacientesProvider } from "@/context/PacienteContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

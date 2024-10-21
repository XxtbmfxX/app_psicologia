import { SessionProvider } from "@/context/AuthContext";
import { PacientesProvider } from "@/context/PacienteContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <PacientesProvider>
        <Slot />
      </PacientesProvider>
    </SessionProvider>
  );
}

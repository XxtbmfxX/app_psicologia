import { SessionProvider } from "@/context/AuthContext";
import { CitasProvider } from "@/context/CitasContext";
import { PacientesProvider } from "@/context/PacienteContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <PacientesProvider>
        <CitasProvider>
          <Slot />
        </CitasProvider>
      </PacientesProvider>
    </SessionProvider>
  );
}

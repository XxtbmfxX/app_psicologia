import { SessionProvider, useSession } from "@/context/AuthContext";
import { PacientesProvider } from "@/context/PacienteContext";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace("/"); // Redirigir al inicio de sesión si no hay sesión activa
    }
  }, [isLoading, session]);

  return (
    <SessionProvider>
      <PacientesProvider>
        <Slot />
      </PacientesProvider>
    </SessionProvider>
  );
}

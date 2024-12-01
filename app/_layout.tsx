import { SessionProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";

/**
 * Componente que maneja las rutas de la aplicación
 * Contiene el SessionProvider para poder acceder al context
 * @see SessionProvider
 * @returns React.JSX.Element
 */
export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { auth } from "@/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "expo-router";
import { AuthContextProps } from "@/types/types";

const AuthContext = createContext<AuthContextProps | null>(null);

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      // Navegación al home después de iniciar sesión
      router.push("/(home)");
    } catch (err: any) {
      setError(`¡Oh no! No pudimos iniciar sesión (╯︵╰,) Verifica tus datos e intenta de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      // Navegación a la pantalla de login después de cerrar sesión
      router.push("/(auth)");
    } catch (err) {
      console.error("Error cerrando sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Si el usuario está autenticado, redirige a '/home'
        router.push("/(home)");
      } else {
        // Si no hay usuario autenticado, redirige a '/'
        router.push("/(auth)");
      }
    });
    return unsubscribe; // Asegúrate de limpiar el listener cuando el componente se desmonte
  }, []); // No necesitas el router como dependencia aquí
  

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/firebase"; // Usa la nueva configuración de auth
import { createContext, useContext, useEffect, PropsWithChildren } from "react";
import { useStorageState } from "@/useStorageState";

const AuthContext = createContext({
  signIn: async (email: string, password: string) => {},
  signOut: () => {},
  session: null as User | null,
  isLoading: false,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<User | null>(
    "session"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setSession(user);
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
    }
  };

  const signOut = () => {
    firebaseSignOut(auth);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

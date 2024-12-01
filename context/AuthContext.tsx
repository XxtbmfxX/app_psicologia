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
/**
 * Contexto de autenticación para manejar la sesión del usuario.
 * Proporciona los datos del usuario, funciones para iniciar/cerrar sesión,
 * y estados adicionales como errores y carga.
 */

const AuthContext = createContext<AuthContextProps | null>(null);
/**
 * Hook personalizado para acceder al contexto de autenticación.
 *
 * Este hook debe utilizarse dentro de un componente que esté envuelto
 * por el `SessionProvider`.
 *
 * @throws {Error} Si el hook se utiliza fuera de un `SessionProvider`.
 * @returns {AuthContextProps} El contexto de autenticación.
 */

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return context;
}
/**
 * Proveedor del contexto de autenticación.
 *
 * Este componente se encarga de manejar el estado del usuario,
 * las funciones para iniciar/cerrar sesión, y la navegación asociada.
 *
 * @param {PropsWithChildren} children - Componentes hijos que tendrán acceso al contexto.
 */

export function SessionProvider({ children }: PropsWithChildren) {
  /**
   * @state {User | null} user - Representa el usuario autenticado actual, o null si no hay sesión activa.
   * @state {string | null} error - Contiene el mensaje de error si ocurre un problema durante el inicio/cierre de sesión.
   * @state {boolean} loading - Indica si se está procesando una operación (inicio o cierre de sesión).
   */

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  /**
   * Inicia sesión con las credenciales del usuario.
   *
   * @async
   * @function login
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<void>}
   * @throws {Error} Lanza un error si las credenciales son incorrectas o hay problemas con el inicio de sesión.
   */

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      // Navegación al home después de iniciar sesión
      router.push("/(home)");
    } catch (err: any) {
      setError(
        `¡Oh no! No pudimos iniciar sesión (╯︵╰,) Verifica tus datos e intenta de nuevo.`
      );
    } finally {
      setLoading(false);
    }
  };
  /**
   * Cierra la sesión actual del usuario.
   *
   * @async
   * @function logout
   * @returns {Promise<void>}
   * @throws {Error} Lanza un error si no se puede cerrar sesión correctamente.
   */

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
  /**
   * Listener de cambios en el estado de autenticación.
   *
   * Escucha el estado del usuario en tiempo real y redirige a las rutas
   * correspondientes dependiendo de si hay un usuario autenticado o no.
   *
   * - Redirige a "/(home)" si el usuario está autenticado.
   * - Redirige a "/(auth)" si no hay usuario autenticado.
   *
   * @function useEffect
   */

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
  }, []);

  return (
    /**
     * Proveedor del contexto que expone los valores y funciones de autenticación.
     *
     * @value {AuthContextProps} - Incluye:
     * - `user`: Usuario autenticado.
     * - `login`: Función para iniciar sesión.
     * - `logout`: Función para cerrar sesión.
     * - `error`: Mensaje de error en caso de fallo.
     * - `loading`: Estado de carga.
     */

    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

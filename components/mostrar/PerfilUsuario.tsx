import { useSession } from "@/context/AuthContext";
import { Text, SafeAreaView, ActivityIndicator } from "react-native";
import CustomPressable from "../common/CustomPressable";
import { Redirect } from "expo-router";
/**
 * Componente que muestra la información del usuario y permite cerrar sesión.
 *
 * Este componente depende de `AuthContext` para obtener el estado de sesión (usuario y carga).
 * Muestra un mensaje de bienvenida con el correo electrónico del usuario y un botón para cerrar sesión.
 * Mientras se carga la sesión, se muestra un indicador de carga.
 *
 * @returns React.JSX.Element El perfil del usuario con la opción de cerrar sesión.
 */
export default function PerfilUsuario() {
  const { logout, user, loading } = useSession();

  const handleLogout = async () => {
    await logout();
    return <Redirect href="/" />;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>¡Bienvenido, {user?.email}!</Text>

      {loading ? (
        <ActivityIndicator color="#2e90d1" />
      ) : (
        <CustomPressable title="Cerrar Sesión" onPress={handleLogout} />
      )}
    </SafeAreaView>
  );
}

import { useSession } from "@/context/AuthContext";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import CustomPressable from "../common/CustomPressable";
import { Redirect, router } from "expo-router";

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

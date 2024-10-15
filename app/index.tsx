import { useState } from "react";
import { Button, TextInput, View, Text, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/context/AuthContext";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      router.replace("/(home)"); // Redirigir al Home después del login exitoso
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo iniciar sesión. Revisa tus credenciales."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleSignIn} />
      <Text
        style={styles.link}
        onPress={() => router.push("/recuperarContrasenia")}
      >
        ¿Olvidaste tu contraseña?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
  link: { marginTop: 8, color: "blue", textAlign: "center" },
});

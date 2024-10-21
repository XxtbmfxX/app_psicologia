import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";

const Index: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  const handlesignIn = async () => {
    try {
      await signIn(email, password);
      router.replace('/(home)')
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Iniciar sesión" onPress={handlesignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5 },
});

export default Index;

import { SessionProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </SessionProvider>
  );
}

import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '@/context/AuthContext'; 

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
      <Stack.Screen name='ingresar' />
    </SessionProvider>
  );
}

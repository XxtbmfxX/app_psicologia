import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  return (
      <Stack screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="recuperarContrasenia"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
  );
};

export default AuthLayout;

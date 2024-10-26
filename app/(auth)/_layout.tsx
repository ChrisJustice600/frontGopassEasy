import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ title: "Se connecter" }} />
      <Stack.Screen name="signup" options={{ title: "S'inscrire" }} />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function Navigation() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="delivery" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}

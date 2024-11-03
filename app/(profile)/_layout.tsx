import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="edit" options={{ headerShown: false }} />
    </Stack>
  );
}

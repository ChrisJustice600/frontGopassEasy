import { Stack } from "expo-router";

export default function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
    </Stack>
  );
}

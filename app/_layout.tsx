import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/(auth)/login");
    } else if (isLoggedIn && segments[0] === "(auth)") {
      router.replace("/(tabs)/home");
    }
  }, [isLoggedIn, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

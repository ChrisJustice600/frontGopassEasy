import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user && segments[0] !== "(auth)") {
      // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
      router.replace("/(auth)/login");
    } else if (user && segments[0] === "(auth)") {
      // Redirige vers la page d'accueil si l'utilisateur est déjà authentifié
      router.replace("/(tabs)/home");
    }
  }, [user, segments, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
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

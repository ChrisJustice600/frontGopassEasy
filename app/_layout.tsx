import { TicketsProvider } from "@/context/TicketsContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";

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
      // Redirige vers la page d'accueil en fonction du rôle de l'utilisateur
      if (user.role === "ADMIN") {
        router.replace("/(admin)/(tabs)/scan");
      } else if (user.role === "USER") {
        router.replace("/(user)/(tabs)/home");
      } else {
        console.warn("Rôle utilisateur non reconnu :", user.role);
        // Vous pouvez rediriger vers une page par défaut ou afficher un message d'erreur
      }
    }
  }, [user, segments, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <TicketsProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </TicketsProvider>
  );
}

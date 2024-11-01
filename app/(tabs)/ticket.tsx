import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function TicketListScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Text className="mb-4 text-2xl font-bold">
        Profil de {user?.username}
      </Text>
      <Text className="mb-2 text-xl">Email: {user?.email}</Text>
      <TouchableOpacity
        className="px-4 py-2 mt-8 bg-red-500 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="font-bold text-white">Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

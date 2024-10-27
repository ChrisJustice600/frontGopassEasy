import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Text className="mb-4 text-2xl font-bold">
        Bienvenue, {user?.username}!
      </Text>
      <Text className="mb-8 text-xl">Ceci est votre écran d'accueil.</Text>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const handleEditProfile = () => {
    router.push("/(user)/(profile)/edit");
  };

  return (
    <View className="items-center justify-center flex-1 px-6 bg-gray-100">
      {/* Avatar utilisateur */}
      <View className="w-32 h-32 mb-6 overflow-hidden border-4 border-blue-500 rounded-full">
        <Image
          source={{
            uri: "https://via.placeholder.com/150",
          }}
          className="w-full h-full rounded-full"
        />
      </View>

      {/* Informations utilisateur */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-gray-900">
          Profil de {user?.username}
        </Text>
        <Text className="mt-1 text-lg text-gray-600">
          Email : {user?.email}
        </Text>
      </View>

      {/* Bouton Modifier les informations */}
      <TouchableOpacity
        className="flex-row items-center px-5 py-3 mb-4 bg-blue-600 rounded-lg shadow-lg"
        onPress={handleEditProfile}
      >
        <Ionicons name="pencil" size={20} color="white" />
        <Text className="ml-2 text-lg font-semibold text-white">
          Modifier les informations
        </Text>
      </TouchableOpacity>

      {/* Bouton Se déconnecter */}
      <TouchableOpacity
        className="flex-row items-center px-5 py-3 bg-red-500 rounded-lg shadow-lg"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="ml-2 text-lg font-semibold text-white">
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}

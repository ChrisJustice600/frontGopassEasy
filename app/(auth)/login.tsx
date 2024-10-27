import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://gopasseasy.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        await login(user);
        router.replace("/(tabs)/home");
      } else {
        console.error("Échec de la connexion");
        // Vous pouvez ajouter ici une alerte ou un message d'erreur pour l'utilisateur
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Vous pouvez ajouter ici une alerte ou un message d'erreur pour l'utilisateur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="justify-center flex-1 p-8 bg-white"
    >
      <Text className="mb-8 text-3xl font-bold text-center text-blue-500">
        Connexion
      </Text>

      <View className="flex-row items-center px-4 py-3 mb-4 bg-gray-100 rounded-lg">
        <Ionicons name="mail-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="flex-row items-center px-4 py-3 mb-6 bg-gray-100 rounded-lg">
        <Ionicons name="lock-closed-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#3b5998"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="py-4 mb-4 bg-blue-500 rounded-lg"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-lg font-bold text-center text-white">
            Se connecter
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/(auth)/signup" asChild>
        <TouchableOpacity>
          <Text className="text-center text-blue-500">
            Pas de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </Link>
    </KeyboardAvoidingView>
  );
}

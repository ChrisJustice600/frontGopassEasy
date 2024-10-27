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

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://gopasseasy.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (response.ok) {
        // Vérifiez que data contient les informations utilisateur nécessaires
        // const user = {
        //   id: data.id,
        //   username: data.username,
        //   email: data.email
        // };

        // Ne pas connecter l'utilisateur après l'inscription
        // await login(user);
        router.replace("/(auth)/login");
      } else {
        console.error(
          "Échec de l'inscription:",
          data.message || "Erreur inconnue"
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
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
        Inscription
      </Text>

      <View className="flex-row items-center px-4 py-3 mb-4 bg-gray-100 rounded-lg">
        <Ionicons name="person-outline" size={24} color="#3b5998" />
        <TextInput
          className="flex-1 ml-2 text-gray-700"
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
      </View>

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
        onPress={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-lg font-bold text-center text-white">
            S'inscrire
          </Text>
        )}
      </TouchableOpacity>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity>
          <Text className="text-center text-blue-500">
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </Link>
    </KeyboardAvoidingView>
  );
}
